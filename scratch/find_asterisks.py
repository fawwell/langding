import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\app\mental\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        clean_line = line.strip()
        # 주석 제거 (// 이나 /*)
        if clean_line.startswith('//') or clean_line.startswith('/*') or clean_line.endswith('*/'):
            continue
        # 단순히 import 문이나 코드 내 곱셈이 아닌 텍스트에 쓰인 *을 찾기 위해
        # 한글이나 영어 텍스트 주변에 *가 있거나 단독 *가 태그 사이에 있는 경우 매칭
        # 혹은 단순히 *가 포함된 줄 전체를 출력하고 눈으로 확인
        if '*' in clean_line:
            print(f"{i}: {clean_line}")
