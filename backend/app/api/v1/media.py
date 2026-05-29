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
    url: str = ""
    thumbnail_url: str = ""
    content: str = ""
    published_at: Optional[str] = None

class MediaResponse(BaseModel):
    id: str
    title: str
    url: str
    thumbnail_url: str
    content: str
    published_at: Optional[str] = None
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
        "thumbnail_url": data.thumbnail_url,
        "content": data.content,
        "published_at": data.published_at or datetime.now().isoformat()
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
        # published_at 기준으로 먼저 정렬하고, 같으면 created_at 기준으로 정렬
        result = supabase.table("media_reports").select("*").order("published_at", desc=True).order("created_at", desc=True).execute()
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

@router.put("/{media_id}")
async def update_media(media_id: str, data: MediaCreate):
    """미디어 보도 기사를 수정합니다."""
    supabase = get_supabase_admin()
    
    update_data = {
        "title": data.title,
        "url": data.url,
        "thumbnail_url": data.thumbnail_url,
        "content": data.content,
        "published_at": data.published_at
    }
    
    try:
        result = supabase.table("media_reports").update(update_data).eq("id", media_id).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))
