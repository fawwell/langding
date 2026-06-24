import asyncio
import os
import sys

# add current dir to sys.path
sys.path.insert(0, os.path.abspath("."))

from app.core.config import settings
from supabase_wrapper import create_client

def main():
    try:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        result = supabase.table("media_reports").select("*").execute()
        print("Current media reports in Supabase:")
        print(result.data)
    except Exception as e:
        import traceback
        print("ERROR OCCURRED:")
        traceback.print_exc()

if __name__ == "__main__":
    main()
