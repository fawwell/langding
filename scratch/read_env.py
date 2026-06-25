import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

root_dir = r'c:\Users\onekt\Desktop\langding-main'
frontend_dir = r'c:\Users\onekt\Desktop\langding-main\frontend'

def check_env(directory):
    for file in os.listdir(directory):
        if file.startswith('.env'):
            full_path = os.path.join(directory, file)
            print(f"--- {file} in {os.path.basename(directory)} ---")
            with open(full_path, 'r', encoding='utf-8') as f:
                for line in f:
                    print(line.strip())

check_env(root_dir)
check_env(frontend_dir)
