from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

from supabase import create_client, Client
from postgrest.exceptions import APIError

from app.core.config import settings

router = APIRouter(prefix="/media", tags=["media"])

class MediaCreate(BaseModel):
    title: str
    url: str
    thumbnail_url: str = ""

class MediaResponse(BaseModel):
    id: str
    title: str
    url: str
    thumbnail_url: str
    created_at: str

def get_supabase_admin() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


@router.post("/")
async def create_media(data: MediaCreate):
    """미디어 보도 기사를 등록합니다."""
    supabase = get_supabase_admin()
    
    insert_data = {
        "title": data.title,
        "url": data.url,
        "thumbnail_url": data.thumbnail_url
    }
    
    try:
        result = supabase.table("media_reports").insert(insert_data).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def list_media():
    """미디어 보도 기사 목록을 최신순으로 조회합니다."""
    supabase = get_supabase_admin()
    
    try:
        result = supabase.table("media_reports").select("*").order("created_at", desc=True).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{media_id}")
async def delete_media(media_id: str):
    """미디어 보도 기사를 삭제합니다."""
    supabase = get_supabase_admin()
    
    try:
        result = supabase.table("media_reports").delete().eq("id", media_id).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))
