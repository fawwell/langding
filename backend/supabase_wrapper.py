# Smart Conditional Wrapper for Supabase SDK
import os
import sys

# Check if we should use the real Supabase SDK (e.g. in production / Railway)
# We use real Supabase if SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL is set and not a placeholder
supabase_url = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
is_real_supabase = supabase_url and "placeholder" not in supabase_url

if is_real_supabase:
    try:
        from supabase import create_client, Client
    except ImportError as e:
        print(f"Failed to import real supabase package: {str(e)}")
        is_real_supabase = False

if not is_real_supabase:
    # --- Mock Supabase SDK for local development ---
    import uuid
    from datetime import datetime
    import json

    class MockResponse:
        def __init__(self, data):
            self.data = data

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

            # 1. INSERT 처리
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

            # 2. UPDATE 처리
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

            # 3. DELETE 처리
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

            # 4. SELECT (조회) 처리
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

    class Client:
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

    _global_client = Client()

    def create_client(url, key):
        return _global_client
