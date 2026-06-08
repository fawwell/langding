import re
import html as html_lib
from datetime import datetime
from typing import Dict, Any

def parse_article_metadata(html_text: str) -> Dict[str, Any]:
    """기사 HTML 텍스트에서 og:title, og:image, og:description, published_at 등의 메타 데이터를 파싱합니다."""
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
        "title": title,
        "thumbnail_url": image,
        "content": desc,
        "published_at": published_at
    }
