from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import json

from supabase import create_client, Client
from postgrest.exceptions import APIError

from app.core.config import settings

router = APIRouter(prefix="/centers", tags=["centers"])

class CenterCreate(BaseModel):
    name: str
    tagline: str = ""
    philosophy: str = ""
    image_url: str = ""
    experts: List[str] = []
    map_url: str = ""
    reserve_url: str = ""

def get_supabase_admin() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.post("/")
async def create_center(data: CenterCreate):
    """신규 센터를 등록합니다."""
    supabase = get_supabase_admin()
    
    insert_data = {
        "name": data.name,
        "tagline": data.tagline,
        "philosophy": data.philosophy,
        "image_url": data.image_url,
        "experts": data.experts,
        "map_url": data.map_url,
        "reserve_url": data.reserve_url
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
        result = supabase.table("centers").select("*").order("created_at", desc=False).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{center_id}")
async def update_center(center_id: str, data: CenterCreate):
    """센터 정보를 수정합니다."""
    supabase = get_supabase_admin()
    
    update_data = {
        "name": data.name,
        "tagline": data.tagline,
        "philosophy": data.philosophy,
        "image_url": data.image_url,
        "experts": data.experts,
        "map_url": data.map_url,
        "reserve_url": data.reserve_url
    }
    
    try:
        result = supabase.table("centers").update(update_data).eq("id", center_id).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        print(f"Error updating center: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/{center_id}")
async def delete_center(center_id: str):
    """센터를 삭제합니다."""
    supabase = get_supabase_admin()
    
    try:
        result = supabase.table("centers").delete().eq("id", center_id).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
