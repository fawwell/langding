import os
from supabase import create_client

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "https://enteglcxrtbglcnifdeg.supabase.co")
key = os.environ.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_7V0NKNdoGsMlwpR7vuM2BQ_yfH9HpLi")

supabase = create_client(url, key)
response = supabase.table("media_reports").select("*").execute()
print(response.data)
