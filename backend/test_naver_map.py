import httpx
import re
import json
import asyncio

async def resolve_url(url: str) -> str:
    async with httpx.AsyncClient(follow_redirects=True, timeout=10.0) as client:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = await client.get(url, headers=headers)
        return str(response.url)

async def test_crawl():
    test_url = "https://m.place.naver.com/place/1008743806/home"
    print(f"Resolving URL: {test_url}")
    try:
        real_url = await resolve_url(test_url)
        print(f"Redirected URL: {real_url}")
        
        # Extract place ID
        # Formats: /place/(\d+) or /site/(\d+) or siteId=(\d+) or site=(\d+)
        place_id_match = re.search(r'/place/(\d+)', real_url)
        if not place_id_match:
            place_id_match = re.search(r'siteId=(\d+)', real_url)
        if not place_id_match:
            place_id_match = re.search(r'/site/(\d+)', real_url)
            
        if not place_id_match:
            print("Failed to extract Place ID from URL.")
            return
            
        place_id = place_id_match.group(1)
        print(f"Extracted Place ID: {place_id}")
        
        # Fetch from Naver Map Summary API
        summary_url = f"https://map.naver.com/v5/api/sites/summary/{place_id}?_format=json"
        print(f"Fetching summary from: {summary_url}")
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://map.naver.com/"
            }
            res = await client.get(summary_url, headers=headers)
            print(f"Response status: {res.status_code}")
            if res.status_code == 200:
                data = res.json()
                print("Successfully fetched summary data:")
                print(json.dumps(data, indent=2, ensure_ascii=False))
            else:
                print(f"Failed to fetch summary: {res.text}")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    asyncio.run(test_crawl())
