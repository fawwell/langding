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
from app.utils.naver_map import extract_naver_map_info

router = APIRouter(prefix="/centers", tags=["centers"])

class CrawlRequest(BaseModel):
    url: str

class CenterCreate(BaseModel):
    name: str
    tagline: str = ""
    philosophy: str = ""
    image_url: str = ""
    experts: List[str] = []
    programs: List[str] = []
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
        "programs": data.programs,
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
        "programs": data.programs,
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
        data = await extract_naver_map_info(url)
        return {
            "success": True,
            "data": data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
