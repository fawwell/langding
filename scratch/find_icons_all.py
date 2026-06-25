import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

frontend_dir = r'c:\Users\onekt\Desktop\langding-main\frontend'

found_any = False
for root, dirs, files in os.walk(frontend_dir):
    # node_modules 나 .next 는 제외
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith('.tsx'):
            full_path = os.path.join(root, file)
            with open(full_path, 'r', encoding='utf-8') as f:
                for i, line in enumerate(f, 1):
                    if '<i ' in line or 'className="fa' in line or 'className=\'fa' in line or 'fa-' in line:
                        rel_path = os.path.relpath(full_path, frontend_dir)
                        print(f"{rel_path}:{i}: {line.strip()}")
                        found_any = True

if not found_any:
    print("No FontAwesome icons found outside of app/mental/page.tsx")
