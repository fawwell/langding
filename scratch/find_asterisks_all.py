import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

frontend_dir = r'c:\Users\onekt\Desktop\langding-main\frontend'

for root, dirs, files in os.walk(frontend_dir):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith('.tsx'):
            full_path = os.path.join(root, file)
            with open(full_path, 'r', encoding='utf-8') as f:
                for i, line in enumerate(f, 1):
                    clean_line = line.strip()
                    # 주석 패스
                    if clean_line.startswith('//') or clean_line.startswith('/*') or clean_line.endswith('*/'):
                        continue
                    # 텍스트에 애스터리스크 기호가 포함된 경우
                    # 연산자(*) 나 필수표시(*)가 아닌 한글 주변의 * 나 ** 검색
                    if '**' in clean_line or ( '*' in clean_line and any(char in clean_line for char in '가각간갇갈갉갊감갑값갓갔강갖갗같갚갛' or '한글') ):
                        # 필수 입력란 기호는 제외
                        if 'className="required"' in clean_line or 'className=\'required\'' in clean_line:
                            continue
                        rel_path = os.path.relpath(full_path, frontend_dir)
                        print(f"{rel_path}:{i}: {clean_line}")
