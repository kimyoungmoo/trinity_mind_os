from PIL import Image, ImageDraw, ImageFont
import random

def create_trinity_logo():
    # Setup
    size = (512, 512)
    bg_color = (10, 10, 20) # Deep Void Blue
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # 1. Background Grid (Cyberpunk style)
    step = 32
    for x in range(0, size[0], step):
        draw.line([(x, 0), (x, size[1])], fill=(20, 30, 50), width=1)
    for y in range(0, size[1], step):
        draw.line([(0, y), (size[0], y)], fill=(20, 30, 50), width=1)
        
    # 2. The Golden Tesseract (Center)
    center = (256, 256)
    cube_size = 120
    gold = (255, 215, 0)
    dark_gold = (184, 134, 11)
    
    # Draw simple cube projection (Wireframe Tesseract)
    # Outer box
    draw.rectangle(
        [center[0]-cube_size, center[1]-cube_size, center[0]+cube_size, center[1]+cube_size], 
        outline=gold, width=4
    )
    # Inner box
    inner_size = cube_size // 2
    draw.rectangle(
        [center[0]-inner_size, center[1]-inner_size, center[0]+inner_size, center[1]+inner_size], 
        outline=gold, width=2
    )
    # Connecting lines (4D feel)
    draw.line([(center[0]-cube_size, center[1]-cube_size), (center[0]-inner_size, center[1]-inner_size)], fill=dark_gold, width=2)
    draw.line([(center[0]+cube_size, center[1]-cube_size), (center[0]+inner_size, center[1]-inner_size)], fill=dark_gold, width=2)
    draw.line([(center[0]-cube_size, center[1]+cube_size), (center[0]-inner_size, center[1]+inner_size)], fill=dark_gold, width=2)
    draw.line([(center[0]+cube_size, center[1]+cube_size), (center[0]+inner_size, center[1]+inner_size)], fill=dark_gold, width=2)

    # 3. Cyan Hexad Particles (Satellites)
    cyan = (79, 220, 202)
    for i in range(6):
        angle = i * (360 / 6)
        # Orbit radius
        r = 180
        import math
        rad = math.radians(angle)
        px = center[0] + r * math.cos(rad)
        py = center[1] + r * math.sin(rad)
        
        # Hexagon roughly drawn as circle/box for pixel feel
        p_size = 10
        draw.rectangle([px-p_size, py-p_size, px+p_size, py+p_size], fill=cyan)
        
        # Connection line to center
        draw.line([(px, py), center], fill=(79, 220, 202, 50), width=1)

    # 4. Text: TRINITY MIND LAB
    # Since we might not have a font, we'll skip complex text or try default
    # but pixel art is better without bad text. Let's keep it symbol-only.
    
    # 5. Dithering / Noise Effect (Fake 16-bit look)
    # Randomly disturb pixels slightly
    pixels = img.load()
    for i in range(size[0]):
        for j in range(size[1]):
            if random.random() > 0.95:
                r, g, b = pixels[i, j]
                noise = random.randint(-20, 20)
                pixels[i, j] = (
                    max(0, min(255, r + noise)),
                    max(0, min(255, g + noise)),
                    max(0, min(255, b + noise))
                )

    # Save
    output_path = "assets/trinity_mind_lab_profile.png"
    img.save(output_path)
    print(f"Generated image at {output_path}")

create_trinity_logo()
