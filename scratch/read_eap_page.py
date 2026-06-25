import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\components\pages\EAPPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        clean_line = line.strip()
        if 'fetch' in clean_line or 'axios' in clean_line or 'handleSubmit' in clean_line or 'onSubmit' in clean_line or 'api' in clean_line:
            print(f"{i}: {clean_line}")
