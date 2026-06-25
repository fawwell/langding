import os
import sys

# stdout의 인코딩을 utf-8로 설정하여 cp949 인코딩 에러 방지
sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\app\mental\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if '<i ' in line or 'className="fa' in line or 'className=\'fa' in line or 'fa-' in line:
            print(f"{i}: {line.strip()}")
