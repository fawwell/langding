from rembg import remove
from PIL import Image

input_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\ai_mascot_strip.png"
output_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\ai_mascot_strip_transparent.png"

input_img = Image.open(input_path)
output_img = remove(input_img)
output_img.save(output_path, "PNG")
print("Background removed successfully!")
