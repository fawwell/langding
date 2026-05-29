# Smart Conditional Wrapper for Supabase SDK
import sys
import os

# Check if we should use the real Supabase SDK (e.g. in production / Railway)
# We use real Supabase if SUPABASE_URL is set and not a placeholder
supabase_url = os.environ.get("SUPABASE_URL", "")
is_real_supabase = supabase_url and "placeholder" not in supabase_url

if is_real_supabase:
    # Programmatically bypass this file to import the real supabase package from pip
    current_dir = os.path.abspath(os.path.dirname(__file__))
    original_path = list(sys.path)
    
    # Temporarily remove current directory and empty/relative paths from sys.path
    sys.path = [p for p in sys.path if p not in ('', '.', current_dir)]
    
    try:
        import importlib
        real_supabase = importlib.import_module("supabase")
        create_client = real_supabase.create_client
        Client = real_supabase.Client
    except ImportError as e:
        print(f"Failed to import real supabase package: {str(e)}")
        is_real_supabase = False
    finally:
        # Restore original path
        sys.path = original_path

if not is_real_supabase:
    # --- Mock Supabase SDK for local development ---
    import uuid
    from datetime import datetime

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
            self.data_store = {
                "centers": [],
                "coaches": [],
                "media_reports": [],
                "client_reviews": []
            }
            self.data_store["centers"] = [
                {
                    "id": "center-ydp",
                    "name": "피지컬케어 영등포 센터",
                    "tagline": "영등포 정밀 체형분석 센터",
                    "philosophy": "최첨단 장비를 활용한 정밀 분석",
                    "image_url": "/images/physical-care/001.jpg",
                    "experts": ["김은주 교육이사", "박서준 수석 코치"],
                    "map_url": "",
                    "reserve_url": "",
                    "address": "서울특별시 영등포구 도신로 232",
                    "created_at": "2026-05-01T00:00:00Z"
                },
                {
                    "id": "center-yyd",
                    "name": "피지컬케어 여의도 센터",
                    "tagline": "여의도 오피스 케어 지점",
                    "philosophy": "직장인 맞춤형 솔루션",
                    "image_url": "",
                    "experts": ["이민우 체형교정 전문가", "최윤아 책임 테라피스트"],
                    "map_url": "",
                    "reserve_url": "",
                    "address": "서울특별시 영등포구 국제금융로 10",
                    "created_at": "2026-05-02T00:00:00Z"
                },
                {
                    "id": "center-gn",
                    "name": "피지컬케어 강남 센터",
                    "tagline": "강남 프리미엄 프라이빗 센터",
                    "philosophy": "1:1 VIP 케어",
                    "image_url": "",
                    "experts": ["정재희 재활의학 전문의", "한지환 시니어 코치"],
                    "map_url": "",
                    "reserve_url": "",
                    "address": "서울특별시 강남구 강남대로 364",
                    "created_at": "2026-05-03T00:00:00Z"
                },
                {
                    "id": "center-sc",
                    "name": "피지컬케어 서초 센터",
                    "tagline": "서초 전문 스포츠 재활 센터",
                    "philosophy": "스포츠 과학 기반 케어",
                    "image_url": "",
                    "experts": ["송민혁 스포츠 사이언스 석사", "백지원 메디컬 트레이너"],
                    "map_url": "",
                    "reserve_url": "",
                    "address": "서울특별시 서초구 서초대로 314",
                    "created_at": "2026-05-04T00:00:00Z"
                }
            ]

        def table(self, name):
            return MockQuery(name, self)

    _global_client = Client()

    def create_client(url, key):
        return _global_client
