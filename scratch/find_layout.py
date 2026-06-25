import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\app\mental\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        clean_line = line.strip()
        if '마음의 날씨' in clean_line or '4,200' in clean_line or '94.8%' in clean_line or '심리상담 매칭' in clean_line:
            print(f"{i}: {clean_line}")
