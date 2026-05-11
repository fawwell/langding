import re

with open('//wsl.localhost/Ubuntu/home/onekt/projects/sportcoach/frontend/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.readlines()

emoji_pattern = re.compile(r'[^\x00-\x7f\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]')

for i, line in enumerate(content):
    matches = emoji_pattern.findall(line)
    if matches:
        # Filter out common symbols like →, ©, etc.
        filtered = [m for m in matches if m not in ['→', '©', '🏛️', '📍', '🎓', '🧘', '×', '™']]
        if matches:
             print(f"Line {i+1}: {''.join(matches)} -> {line.strip()}")
