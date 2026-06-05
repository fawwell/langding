from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime
import re
import httpx
import html as html_lib

from supabase_wrapper import create_client, Client, APIError

from app.core.config import settings

router = APIRouter(prefix="/media", tags=["media"])

class CrawlRequest(BaseModel):
    url: str

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


@router.post("/crawl")
async def crawl_article_meta(body: CrawlRequest):
    """기사 URL에서 Open Graph 메타데이터를 추출해 반환합니다."""
    url = body.url
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=10.0) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            
            html_text = response.text
            
            # 1. Title 추출 (og:title -> name=title -> <title> 태그 순)
            title_match = re.search(r'<meta\s+[^>]*property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            if not title_match:
                title_match = re.search(r'<meta\s+[^>]*name=["\']title["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            
            title = title_match.group(1) if title_match else ""
            if not title:
                html_title = re.search(r'<title>([^<]+)</title>', html_text, re.IGNORECASE)
                if html_title:
                    title = html_title.group(1).strip()
            
            # 2. Thumbnail URL 추출 (og:image)
            image_match = re.search(r'<meta\s+[^>]*property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            image = image_match.group(1) if image_match else ""
            
            # 3. Description/Content 추출 (og:description -> name=description)
            desc_match = re.search(r'<meta\s+[^>]*property=["\']og:description["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            if not desc_match:
                desc_match = re.search(r'<meta\s+[^>]*name=["\']description["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            desc = desc_match.group(1) if desc_match else ""
            
            # 4. Published Date 추출 (article:published_time -> pubdate -> publish-date -> og:regdate 등)
            date_match = re.search(r'<meta\s+[^>]*property=["\']article:published_time["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            if not date_match:
                date_match = re.search(r'<meta\s+[^>]*name=["\']pubdate["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            if not date_match:
                date_match = re.search(r'<meta\s+[^>]*name=["\']publish-date["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            if not date_match:
                date_match = re.search(r'<meta\s+[^>]*property=["\']og:regdate["\']\s+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
            
            published_at = datetime.now().isoformat().split('T')[0]  # 기본값: 오늘 날짜
            if date_match:
                raw_date = date_match.group(1)
                # YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD 포맷 추출
                date_extract = re.search(r'(\d{4})[-./](\d{2})[-./](\d{2})', raw_date)
                if date_extract:
                    published_at = f"{date_extract.group(1)}-{date_extract.group(2)}-{date_extract.group(3)}"
            
            # HTML 엔티티 복원 (예: &amp; -> &, &quot; -> " 등)
            title = html_lib.unescape(title)
            desc = html_lib.unescape(desc)
            
            return {
                "success": True,
                "data": {
                    "title": title,
                    "thumbnail_url": image,
                    "content": desc,
                    "published_at": published_at
                }
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"기사 정보를 불러올 수 없습니다: {str(e)}")
