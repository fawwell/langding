import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\app\mental\mental_style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        clean_line = line.strip()
        if 'visual-card-wrapper' in clean_line or 'floating-card' in clean_line or 'card-left' in clean_line or 'card-right' in clean_line:
            print(f"{i}: {clean_line}")
