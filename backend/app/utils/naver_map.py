import re
import httpx
from fastapi import HTTPException
from typing import Dict, Any

async def extract_naver_map_info(url: str) -> Dict[str, Any]:
    """네이버 지도 공유 링크에서 플레이스 정보를 크롤링해 반환합니다."""
    try:
        # 1. URL 리다이렉트 추적하여 실제 URL 찾기
        async with httpx.AsyncClient(follow_redirects=True, timeout=10.0) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
            response = await client.get(url, headers=headers)
            real_url = str(response.url)
            
            # 2. 플레이스 ID 추출
            place_id_match = re.search(r'/place/(\d+)', real_url)
            if not place_id_match:
                place_id_match = re.search(r'siteId=(\d+)', real_url)
            if not place_id_match:
                place_id_match = re.search(r'/site/(\d+)', real_url)
                
            if not place_id_match:
                raise HTTPException(status_code=400, detail="네이버 지도 링크에서 플레이스 ID를 찾을 수 없습니다. 올바른 공유 링크인지 확인해주세요.")
                
            place_id = place_id_match.group(1)
            
            # 3. 네이버 지도 플레이스 요약 API 호출
            summary_url = f"https://map.naver.com/p/api/place/summary/{place_id}?_format=json"
            headers["Referer"] = "https://map.naver.com/"
            
            res = await client.get(summary_url, headers=headers)
            if res.status_code != 200:
                raise HTTPException(status_code=400, detail=f"네이버 지도 정보를 가져오는 중 오류가 발생했습니다. (상태 코드: {res.status_code})")
                
            data = res.json()
            place_detail = data.get("data", {}).get("placeDetail", {})
            if not place_detail:
                raise HTTPException(status_code=400, detail="네이버 지도 정보 응답에서 상세 정보(placeDetail)를 찾을 수 없습니다.")
                
            name = place_detail.get("name", "")
            address_info = place_detail.get("address", {})
            address = address_info.get("roadAddress") or address_info.get("address") or ""
            resolved_map_url = f"https://place.naver.com/place/{place_id}"
            
            return {
                "name": name,
                "address": address,
                "map_url": resolved_map_url
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"네이버 지도 정보를 파싱하는 데 실패했습니다: {str(e)}")
