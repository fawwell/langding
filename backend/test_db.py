import asyncio
import os
import sys

# add current dir to sys.path
sys.path.insert(0, os.path.abspath("."))

from app.core.config import settings
from supabase import create_client

def main():
    try:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        
        # Test inserting a dummy proposal
        insert_data = {
            "company": "test_company",
            "manager": "test_manager",
            "phone": "010-0000-0000",
            "email": "test@test.com",
            "scale": "50인 미만",
            "inquiry": "test",
            "title": "test_company - test_manager",
            "modules": ["test module"],
            "parts": {"part1": {"selected": True, "sub_modules": ["test module"]}},
            "status": "pending"
        }
        print("Attempting to insert:", insert_data)
        result = supabase.table("proposals").insert(insert_data).execute()
        print("Success:", result.data)
    except Exception as e:
        import traceback
        print("ERROR OCCURRED:")
        traceback.print_exc()

if __name__ == "__main__":
    main()
