"""제안서 요청 관리."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

from supabase import create_client, Client
from postgrest.exceptions import APIError

from app.core.config import settings

router = APIRouter(prefix="/proposals", tags=["proposals"])


class ProposalPart(BaseModel):
    selected: bool
    sub_modules: list[str] = []


class ProposalCreate(BaseModel):
    company: str
    manager: str
    phone: str
    email: str
    scale: str
    inquiry: str = ""
    parts: dict[str, ProposalPart]


def get_supabase_admin() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


@router.post("/")
async def create_proposal(data: ProposalCreate):
    """제안서 요청을 생성합니다."""
    supabase = get_supabase_admin()

    modules_list = []
    for part_key, part_data in data.parts.items():
        if part_data.selected and part_data.sub_modules:
            for sub in part_data.sub_modules:
                modules_list.append(sub)

    insert_data = {
        "company": data.company,
        "manager": data.manager,
        "phone": data.phone,
        "email": data.email,
        "scale": data.scale,
        "inquiry": data.inquiry,
        "title": f"{data.company} - {data.manager}",
        "modules": modules_list,
        "parts": {k: {"selected": v.selected, "sub_modules": v.sub_modules} for k, v in data.parts.items()},
        "status": "pending"
    }

    try:
        result = supabase.table("proposals").insert(insert_data).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def list_proposals():
    """제안서 목록을 조회합니다. (관리자용)"""
    supabase = get_supabase_admin()
    
    try:
        result = supabase.table("proposals").select("*").order("created_at", desc=True).execute()
        return {"success": True, "data": result.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=str(e))