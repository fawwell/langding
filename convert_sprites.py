from PIL import Image
import os

input_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\ai_mascot_2x2.png"
output_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\ai_mascot_strip.png"

img = Image.open(input_path).convert("RGBA")
w, h = img.size
frame_w = w // 2
frame_h = h // 2

# Create new 4-frame strip (4 * frame_w, frame_h)
# We will scale it down to 256x256 per frame to save space
target_frame_size = 256
strip = Image.new("RGBA", (target_frame_size * 4, target_frame_size), (0, 0, 0, 0))

frames = [
    img.crop((0, 0, frame_w, frame_h)),
    img.crop((frame_w, 0, w, frame_h)),
    img.crop((0, frame_h, frame_w, h)),
    img.crop((frame_w, frame_h, w, h))
]

for i, frame in enumerate(frames):
    # Resize frame
    frame = frame.resize((target_frame_size, target_frame_size), Image.Resampling.LANCZOS)
    strip.paste(frame, (i * target_frame_size, 0))

strip.save(output_path, optimize=True)
print(f"Generated horizontal sprite strip: {output_path}")
