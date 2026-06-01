# Smart Conditional Wrapper for Supabase SDK using direct HTTP communication
import os
import sys
import uuid
from datetime import datetime
import json
import httpx

class APIError(Exception):
    """Custom API Error to replace postgrest.exceptions.APIError."""
    def __init__(self, message, status_code=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

class MockResponse:
    def __init__(self, data):
        self.data = data

# Determine if we should connect to the actual Supabase DB
supabase_url = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
is_real_supabase = supabase_url and "placeholder" not in supabase_url

class SupabaseHttpQuery:
    def __init__(self, table_name, url, key):
        self.table_name = table_name
        self.url = url.rstrip("/")
        self.key = key
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        self._filters = {}
        self._order_by = None
        self._insert_data = None
        self._update_data = None
        self._delete_triggered = False

    def insert(self, data):
        self._insert_data = data
        return self

    def select(self, *args):
        # Always request all fields for simplicity
        return self

    def order(self, column, desc=False):
        self._order_by = (column, desc)
        return self

    def eq(self, column, value):
        self._filters[column] = value
        return self

    def update(self, data):
        self._update_data = data
        return self

    def delete(self):
        self._delete_triggered = True
        return self

    def execute(self):
        base_endpoint = f"{self.url}/rest/v1/{self.table_name}"
        
        with httpx.Client() as client:
            try:
                # 1. INSERT Processing
                if self._insert_data is not None:
                    response = client.post(
                        base_endpoint,
                        headers=self.headers,
                        json=self._insert_data
                    )
                # 2. UPDATE Processing
                elif self._update_data is not None:
                    params = {}
                    for k, v in self._filters.items():
                        params[k] = f"eq.{v}"
                    response = client.patch(
                        base_endpoint,
                        headers=self.headers,
                        params=params,
                        json=self._update_data
                    )
                # 3. DELETE Processing
                elif self._delete_triggered:
                    params = {}
                    for k, v in self._filters.items():
                        params[k] = f"eq.{v}"
                    response = client.delete(
                        base_endpoint,
                        headers=self.headers,
                        params=params
                    )
                # 4. SELECT Processing
                else:
                    params = {}
                    for k, v in self._filters.items():
                        params[k] = f"eq.{v}"
                    if self._order_by:
                        col, desc = self._order_by
                        params["order"] = f"{col}.{'desc' if desc else 'asc'}"
                    response = client.get(
                        base_endpoint,
                        headers=self.headers,
                        params=params
                    )

                if response.status_code >= 400:
                    raise APIError(response.text, status_code=response.status_code)
                
                try:
                    data = response.json()
                except Exception:
                    data = []
                
                return MockResponse(data)

            except httpx.HTTPError as e:
                raise APIError(f"HTTP Communication Error: {str(e)}")

class RealSupabaseClient:
    def __init__(self, url, key):
        self.url = url
        self.key = key

    def table(self, name):
        return SupabaseHttpQuery(name, self.url, self.key)

class MockSupabaseClient:
    def __init__(self):
        self.file_path = os.path.join(os.path.dirname(__file__), "mock_db.json")
        self.data_store = {
            "centers": [],
            "coaches": [],
            "media_reports": [],
            "client_reviews": []
        }
        self.load_from_file()

    def load_from_file(self):
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, "r", encoding="utf-8") as f:
                    self.data_store = json.load(f)
            except Exception as e:
                print(f"Error loading mock_db.json: {str(e)}")

    def save_to_file(self):
        try:
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(self.data_store, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving to mock_db.json: {str(e)}")

    def table(self, name):
        return MockQuery(name, self)

class MockQuery:
    def __init__(self, table_name, client):
        self.table_name = table_name
        self.client = client
        self._filters = {}
        self._order_by = None
        self._insert_data = None
        self._update_data = None
        self._delete_triggered = False

    def insert(self, data):
        self._insert_data = data
        return self

    def select(self, *args):
        return self

    def order(self, column, desc=False):
        self._order_by = (column, desc)
        return self

    def eq(self, column, value):
        self._filters[column] = value
        return self

    def update(self, data):
        self._update_data = data
        return self

    def delete(self):
        self._delete_triggered = True
        return self

    def execute(self):
        if self.table_name not in self.client.data_store:
            self.client.data_store[self.table_name] = []

        # 1. INSERT Processing
        if self._insert_data is not None:
            new_id = self._insert_data.get("id") or str(uuid.uuid4())
            item = {
                "id": new_id,
                **self._insert_data,
                "created_at": datetime.utcnow().isoformat()
            }
            self.client.data_store[self.table_name].append(item)
            self.client.save_to_file()
            return MockResponse([item])

        # 2. UPDATE Processing
        if self._update_data is not None:
            updated_items = []
            for item in self.client.data_store[self.table_name]:
                match = True
                for k, v in self._filters.items():
                    if item.get(k) != v:
                        match = False
                        break
                if match:
                    item.update(self._update_data)
                    updated_items.append(item)
            if updated_items:
                self.client.save_to_file()
            return MockResponse(updated_items)

        # 3. DELETE Processing
        if self._delete_triggered:
            remained = []
            deleted = []
            for item in self.client.data_store[self.table_name]:
                match = True
                for k, v in self._filters.items():
                    if item.get(k) != v:
                        match = False
                        break
                if match:
                    deleted.append(item)
                else:
                    remained.append(item)
            self.client.data_store[self.table_name] = remained
            if deleted:
                self.client.save_to_file()
            return MockResponse(deleted)

        # 4. SELECT Processing
        data = self.client.data_store.get(self.table_name, [])
        filtered_data = []
        for item in data:
            match = True
            for k, v in self._filters.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                filtered_data.append(item)
        
        if self._order_by:
            col, desc = self._order_by
            filtered_data.sort(key=lambda x: x.get(col) or "", reverse=desc)

        return MockResponse(filtered_data)

# Create Client definitions for backward compatibility typing
Client = object

_global_mock_client = MockSupabaseClient()

def create_client(url, key):
    # Dynamic toggle based on actual environment configurations
    current_url = url or os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
    if current_url and "placeholder" not in current_url:
        return RealSupabaseClient(current_url, key)
    return _global_mock_client
