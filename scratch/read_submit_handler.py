import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\onekt\Desktop\langding-main\frontend\app\mental\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_line = -1
for i, line in enumerate(lines, 1):
    if 'const handleApplySubmit' in line:
        start_line = i
        break

if start_line != -1:
    print(f"Found handleApplySubmit starting at line {start_line}")
    for j in range(start_line - 1, min(start_line + 60, len(lines))):
        print(f"{j+1}: {lines[j].rstrip()}")
else:
    print("handleApplySubmit not found")
