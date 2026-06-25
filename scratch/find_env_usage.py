import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

frontend_dir = r'c:\Users\onekt\Desktop\langding-main\frontend'

for root, dirs, files in os.walk(frontend_dir):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            full_path = os.path.join(root, file)
            with open(full_path, 'r', encoding='utf-8') as f:
                for i, line in enumerate(f, 1):
                    if 'NEXT_PUBLIC_' in line or 'process.env.' in line:
                        rel_path = os.path.relpath(full_path, frontend_dir)
                        print(f"{rel_path}:{i}: {line.strip()}")
