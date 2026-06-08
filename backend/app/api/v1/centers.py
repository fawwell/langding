from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import json
import re
import httpx

from supabase_wrapper import create_client, Client, APIError

from app.core.config import settings
from app.core.deps import verify_admin_token

router = APIRouter(prefix="/centers", tags=["centers"])

class CrawlRequest(BaseModel):
    url: str

class CenterCreate(BaseModel):
    name: str
    tagline: str = ""
    philosophy: str = ""
    image_url: str = ""
    experts: List[str] = []
    map_url: str = ""
    reserve_url: str = ""
    address: str = ""
    sort_order: int = 0

def get_supabase_admin() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


@router.post("/")
async def create_center(data: CenterCreate, token: str = Depends(verify_admin_token)):
    """신규 센터를 등록합니다."""
    supabase = get_supabase_admin()
    
    insert_data = {
        "name": data.name,
        "tagline": data.tagline,
        "philosophy": data.philosophy,
        "image_url": data.image_url,
        "experts": data.experts,
        "map_url": data.map_url,
        "reserve_url": data.reserve_url,
        "address": data.address,
        "sort_order": data.sort_order
      }
    
    try:
        result = supabase.table("centers").insert(insert_data).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        print(f"Error creating center: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/")
async def list_centers():
    """모든 센터 목록을 조회합니다."""
    supabase = get_supabase_admin()
    
    try:
        # sort_order 오름차순(낮은 번호가 먼저)으로 정렬하고, 같으면 created_at 오름차순 정렬
        result = supabase.table("centers").select("*").order("sort_order", desc=False).order("created_at", desc=False).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{center_id}")
async def update_center(center_id: str, data: CenterCreate, token: str = Depends(verify_admin_token)):
    """센터 정보를 수정합니다."""
    supabase = get_supabase_admin()
    
    update_data = {
        "name": data.name,
        "tagline": data.tagline,
        "philosophy": data.philosophy,
        "image_url": data.image_url,
        "experts": data.experts,
        "map_url": data.map_url,
        "reserve_url": data.reserve_url,
        "address": data.address,
        "sort_order": data.sort_order
    }
    
    try:
        result = supabase.table("centers").update(update_data).eq("id", center_id).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        print(f"Error updating center: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/{center_id}")
async def delete_center(center_id: str, token: str = Depends(verify_admin_token)):
    """센터를 삭제합니다."""
    supabase = get_supabase_admin()
    
    try:
        result = supabase.table("centers").delete().eq("id", center_id).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/crawl")
async def crawl_center_info(body: CrawlRequest, token: str = Depends(verify_admin_token)):
    """네이버 지도 공유 링크에서 센터명, 주소, 최종 지도 URL을 추출합니다."""
    url = body.url
    try:
        # 1. URL 리다이렉트 추적하여 실제 URL 찾기
        async with httpx.AsyncClient(follow_redirects=True, timeout=10.0) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
            response = await client.get(url, headers=headers)
            real_url = str(response.url)
            
            # 2. 플레이스 ID 추출
            # 패턴: /place/(\d+) or /site/(\d+) or siteId=(\d+) or /entry/place/(\d+)
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
            # 도로명 주소가 있으면 사용하고, 없으면 일반 지번 주소를 사용합니다.
            address = address_info.get("roadAddress") or address_info.get("address") or ""
            
            # 네이버 지도에서 일반적으로 쓰이는 상세 페이지 URL로 지정
            resolved_map_url = f"https://place.naver.com/place/{place_id}"
            
            return {
                "success": True,
                "data": {
                    "name": name,
                    "address": address,
                    "map_url": resolved_map_url
                }
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"네이버 지도 정보를 파싱하는 데 실패했습니다: {str(e)}")
