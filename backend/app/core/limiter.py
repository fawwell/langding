from slowapi import Limiter
from slowapi.util import get_remote_address

# IP 주소 기반 속도 제한기
limiter = Limiter(key_func=get_remote_address)
