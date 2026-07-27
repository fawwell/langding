import os
import math
from PIL import Image

def create_sprite_sheet():
    input_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\pawmi_mini.png"
    output_path = r"c:\Users\onekt\Desktop\langding-main\frontend\public\images\pawmi\pawmi_floating_sprite.png"
    
    if not os.path.exists(input_path):
        print(f"Error: Could not find {input_path}")
        return

    # Load original image
    original = Image.open(input_path).convert("RGBA")
    
    # Resize original to 200x200 to keep sprite sheet small (for web performance)
    original.thumbnail((200, 200), Image.Resampling.LANCZOS)
    w, h = original.size
    
    # Create padded frame to prevent cropping during rotation
    pad = int(max(w, h) * 0.15)
    frame_w, frame_h = w + pad*2, h + pad*2
    
    # 12 frames for a very smooth cycle
    num_frames = 12
    
    # Create sprite sheet canvas
    sprite_sheet = Image.new("RGBA", (frame_w * num_frames, frame_h), (0, 0, 0, 0))
    
    for i in range(num_frames):
        # Sine wave for smooth animation (0 to 2*PI)
        progress = (i / num_frames) * 2 * math.pi
        
        # Calculate transformations
        angle = math.sin(progress) * 4.0  # -4 to 4 degrees rotation (wobble)
        y_offset = math.cos(progress) * (frame_h * 0.05)  # up and down breathing
        
        # Create blank padded frame
        frame = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
        # Paste original in center
        frame.paste(original, (pad, pad), original)
        
        # Rotate
        frame = frame.rotate(angle, resample=Image.BICUBIC, center=(frame_w/2, frame_h/2))
        
        # Shift Y (translate)
        shifted = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
        shifted.paste(frame, (0, int(y_offset)), frame)
        
        # Paste into sprite sheet
        sprite_sheet.paste(shifted, (i * frame_w, 0), shifted)
    
    # Save output
    sprite_sheet.save(output_path, optimize=True)
    print(f"Success! Generated sprite sheet at: {output_path}")
    print(f"Dimensions: {sprite_sheet.size}, Frames: {num_frames}, Frame Width: {frame_w}")

if __name__ == "__main__":
    create_sprite_sheet()
