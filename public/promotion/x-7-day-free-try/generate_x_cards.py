import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../.."))
OUTPUT_DIR = SCRIPT_DIR

def find_font(candidates):
    for path in candidates:
        if os.path.exists(path):
            return path
    return None

FONT_BOLD_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNS.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]

FONT_REGULAR_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNS.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
]

BOLD_PATH = find_font(FONT_BOLD_CANDIDATES)
REGULAR_PATH = find_font(FONT_REGULAR_CANDIDATES)

def get_font(is_bold, size):
    path = BOLD_PATH if is_bold else REGULAR_PATH
    if path:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

def create_base_canvas(width, height):
    """Create a high quality dark gradient canvas with Movtrak deep forest green tones."""
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)
    
    top_r, top_g, top_b = 10, 24, 15        # Deep dark obsidian green
    mid_r, mid_g, mid_b = 15, 36, 23
    bot_r, bot_g, bot_b = 20, 52, 32
    
    for y in range(height):
        ratio = y / height
        if ratio < 0.5:
            local = ratio * 2
            r = int(top_r + (mid_r - top_r) * local)
            g = int(top_g + (mid_g - top_g) * local)
            b = int(top_b + (mid_b - top_b) * local)
        else:
            local = (ratio - 0.5) * 2
            r = int(mid_r + (bot_r - mid_r) * local)
            g = int(mid_g + (bot_g - mid_g) * local)
            b = int(mid_b + (bot_b - mid_b) * local)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    
    # Ambient soft glow (Movtrak neon emerald #59E46E tinted)
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(int(width * 0.55), -150), (width + 200, int(height * 0.85))], fill=(89, 228, 110, 32))
    glow_draw.ellipse([( -100, int(height * 0.4)), (int(width * 0.4), height + 100)], fill=(30, 80, 45, 45))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(glow)
    
    return canvas

def extract_phone(image_name):
    """Crop phone mockup cleanly from public image and apply anti-aliased rounded mask."""
    path = os.path.join(ASSETS_DIR, image_name)
    im = Image.open(path)
    
    # Precise iPhone frame bounding box
    x0, y0, x1, y1 = 114, 558, 1146, 2662
    w, h = x1 - x0, y1 - y0
    phone = im.crop((x0, y0, x1, y1)).convert("RGBA")
    
    # 2x supersampling mask for antialiasing
    scale = 2
    mask = Image.new("L", (w * scale, h * scale), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (w * scale, h * scale)], radius=int(165 * scale), fill=255)
    mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    
    phone.putalpha(mask)
    return phone

def create_phone_with_shadow(phone, target_w, target_h):
    """Resize phone and generate a realistic soft drop shadow."""
    resized_phone = phone.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pad = 50
    sw = target_w + pad * 2
    sh = target_h + pad * 2
    shadow_layer = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    
    radius = int(165 * (target_w / 1032))
    shadow_draw.rounded_rectangle(
        [(pad, pad + 15), (pad + target_w, pad + target_h + 15)],
        radius=radius,
        fill=(0, 0, 0, 160)
    )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(25))
    shadow_layer.alpha_composite(resized_phone, (pad, pad))
    return shadow_layer, pad

def draw_check(draw, x, y, size=16, color=(89, 228, 110, 255), width=3):
    """Draw a sharp vector checkmark."""
    draw.line([(x, y + int(size * 0.52)), (x + int(size * 0.38), y + int(size * 0.88))], fill=color, width=width)
    draw.line([(x + int(size * 0.35), y + int(size * 0.88)), (x + size, y + int(size * 0.16))], fill=color, width=width)

def draw_cross(draw, x, y, size=14, color=(255, 107, 107, 255), width=3):
    """Draw a crisp vector cross."""
    draw.line([(x, y), (x + size, y + size)], fill=color, width=width)
    draw.line([(x, y + size), (x + size, y)], fill=color, width=width)

def draw_dot(draw, x, y, r=4, color=(89, 228, 110, 255)):
    draw.ellipse([(x - r, y - r), (x + r, y + r)], fill=color)

def draw_pill(draw, text, x, y, bg_color, text_color, font, pad_x=18, pad_y=8):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    w = tw + pad_x * 2
    h = th + pad_y * 2
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h // 2, fill=bg_color)
    text_y = y + pad_y - bbox[1]
    draw.text((x + pad_x, text_y), text, font=font, fill=text_color)
    return x + w, y + h

def generate_card_1_landscape():
    """16:9 X/Twitter Landscape Feature Card (1200x675)"""
    print("Generating Card 1: 16:9 Landscape...")
    width, height = 1200, 675
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 15)
    f_hero = get_font(True, 46)
    f_sub = get_font(False, 22)
    f_feature = get_font(False, 18)
    f_cta = get_font(True, 19)
    
    # Top Badges
    b1_end_x, _ = draw_pill(draw, "MOVTRAK FOR IOS", 60, 55, (89, 228, 110, 255), (15, 35, 20, 255), f_badge)
    draw_pill(draw, "7-DAY FREE TRIAL NOW LIVE", b1_end_x + 12, 55, (255, 255, 255, 25), (220, 245, 225, 255), f_badge)
    
    # Hero Title (Left Side)
    draw.text((60, 125), "Your iPhone is now your", font=f_hero, fill=(255, 255, 255, 255))
    draw.text((60, 180), "personal cameraman.", font=f_hero, fill=(89, 228, 110, 255))
    
    # Subtitle
    draw.text((60, 255), "Auto-framing & smooth motion tracking for solo climbers,", font=f_sub, fill=(210, 225, 215, 240))
    draw.text((60, 288), "gym lifters, and athletes. Zero external hardware.", font=f_sub, fill=(210, 225, 215, 240))
    
    # Feature Bullet Points with custom vector checkmarks
    features = [
        "100% on-device AI tracking (No cloud latency)",
        "Place it on the floor & move — never walk out of frame",
        "No bulky gimbals, dead batteries, or asking strangers",
        "7-day full access trial · One-time lifetime unlock"
    ]
    
    fy = 360
    for feat in features:
        draw_check(draw, 62, fy + 4, size=15, color=(89, 228, 110, 255), width=2)
        draw.text((90, fy), feat, font=f_feature, fill=(185, 215, 195, 230))
        fy += 36
    
    # Bottom Download Pill
    draw_pill(draw, "Search 'Movtrak' on App Store", 60, 545, (255, 255, 255, 245), (15, 30, 20, 255), f_cta, pad_x=24, pad_y=12)
    
    canvas.alpha_composite(overlay)
    
    # Phone mockup on right side
    phone = extract_phone("app-human-body-track-1.png")
    pw = 280
    ph = int(pw * (2104 / 1032))  # ~571px
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    
    px = 840
    py = 55
    canvas.alpha_composite(phone_layer, (px - pad, py - pad))
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_1_landscape.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

def generate_card_2_square():
    """1:1 Square Card for Mobile Feeds & Multi-image Tweets (1080x1080)"""
    print("Generating Card 2: 1:1 Square...")
    width, height = 1080, 1080
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 17)
    f_title = get_font(True, 46)
    f_sub = get_font(False, 23)
    f_card_t = get_font(True, 21)
    f_card_d = get_font(False, 17)
    f_bot = get_font(True, 22)
    
    # Top Badges
    b1_end, _ = draw_pill(draw, "INDIE DEV UPDATE", 70, 65, (255, 209, 102, 255), (20, 45, 25, 255), f_badge)
    draw_pill(draw, "7-DAY FREE TRIAL", b1_end + 12, 65, (255, 255, 255, 30), (220, 245, 225, 255), f_badge)
    
    # Title
    draw.text((70, 130), "Tired of filming solo &", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 188), "walking out of frame?", font=f_title, fill=(89, 228, 110, 255))
    draw.text((70, 255), "I built an on-device AI cameraman for iPhone.", font=f_sub, fill=(200, 225, 210, 230))
    
    canvas.alpha_composite(overlay)
    
    # Phone mockup in center-right (scaled slightly to fit cleanly within canvas)
    phone = extract_phone("app-human-body-track-1.png")
    pw = 320
    ph = int(pw * (2104 / 1032)) # ~652px
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    px = 680
    py = 275
    canvas.alpha_composite(phone_layer, (px - pad, py - pad))
    
    # Comparison cards on the left
    card_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    pain_items = [
        ("The Old Way", "Phone propped on the floor. You climb 2 moves and walk off-screen. Gimbal is dead or in the bag.", False),
        ("The Movtrak Way", "Phone stays still. On-device AI tracks your body smoothly and centers you automatically.", True),
        ("7-Day Free Trial", "Full features unlocked. No subscription trap. Download it and test it in your gym.", True)
    ]
    
    cy = 325
    for title, desc, is_positive in pain_items:
        # Glass card
        c_draw.rounded_rectangle([(70, cy), (620, cy + 155)], radius=18, fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=1)
        
        accent_color = (89, 228, 110, 255) if is_positive else (255, 107, 107, 255)
        c_draw.rounded_rectangle([(70, cy), (76, cy + 155)], radius=3, fill=accent_color)
        
        # Icon
        if is_positive:
            draw_check(c_draw, 95, cy + 22, size=16, color=accent_color, width=2)
        else:
            draw_cross(c_draw, 96, cy + 22, size=15, color=accent_color, width=2)
            
        c_draw.text((125, cy + 18), title, font=f_card_t, fill=(255, 255, 255, 255))
        
        # Word wrap description
        words = desc.split()
        lines = []
        cur_line = []
        for w in words:
            cur_line.append(w)
            bbox = f_card_d.getbbox(" ".join(cur_line))
            if bbox[2] - bbox[0] > 470:
                cur_line.pop()
                lines.append(" ".join(cur_line))
                cur_line = [w]
        if cur_line:
            lines.append(" ".join(cur_line))
        
        line_y = cy + 58
        for l in lines:
            c_draw.text((95, line_y), l, font=f_card_d, fill=(195, 215, 205, 220))
            line_y += 26
            
        cy += 180
    
    # Bottom banner (positioned cleanly below the cards, right-padded so it doesn't overlap phone awkwardly)
    c_draw.rounded_rectangle([(70, 940), (980, 1020)], radius=40, fill=(255, 255, 255, 245))
    c_draw.text((115, 965), "App Store: Movtrak  ·  Try free for 7 days & roast it in the replies!", font=f_bot, fill=(15, 35, 20, 255))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_2_square.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

def generate_card_3_feedback():
    """16:9 Landscape Card for Feedback / Testing Request (1200x675)"""
    print("Generating Card 3: Feedback Request...")
    width, height = 1200, 675
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 15)
    f_hero = get_font(True, 42)
    f_sub = get_font(False, 22)
    f_item_t = get_font(True, 20)
    f_item_d = get_font(False, 16)
    
    # Top Badges
    draw_pill(draw, "COMMUNITY TEST", 60, 50, (255, 209, 102, 255), (20, 45, 25, 255), f_badge)
    draw_pill(draw, "BUILDING IN PUBLIC", 225, 50, (255, 255, 255, 25), (220, 245, 225, 255), f_badge)
    
    # Header
    draw.text((60, 115), "Looking for honest, brutal feedback.", font=f_hero, fill=(255, 255, 255, 255))
    draw.text((60, 175), "I launched a 7-day free trial so anyone can stress-test it. 4 things to test:", font=f_sub, fill=(180, 220, 195, 230))
    
    # 4 Feedback Columns / Grid Cards (2x2)
    cards = [
        ("1. Tracking Responsiveness", "Does it keep up when you dyno, sprint, or move fast? Does it lose you when occluded?"),
        ("2. Camera Smoothness", "Is the auto-pan natural and cinematic, or does it feel jittery / nausea-inducing?"),
        ("3. Battery & Thermal Heat", "How does your iPhone hold up after a 10-15 min continuous recording session?"),
        ("4. UI Quirks & Wishlist", "What part of the app felt unintuitive or clunky? What feature should come next?")
    ]
    
    positions = [
        (60, 245),
        (620, 245),
        (60, 425),
        (620, 425)
    ]
    
    for (title, desc), (cx, cy) in zip(cards, positions):
        # Card container
        draw.rounded_rectangle([(cx, cy), (cx + 520, cy + 150)], radius=16, fill=(255, 255, 255, 16), outline=(255, 255, 255, 38), width=1)
        draw.rounded_rectangle([(cx, cy), (cx + 6, cy + 150)], radius=3, fill=(89, 228, 110, 255))
        draw.text((cx + 25, cy + 22), title, font=f_item_t, fill=(255, 255, 255, 255))
        
        # Word wrap
        words = desc.split()
        lines = []
        cur = []
        for w in words:
            cur.append(w)
            bbox = f_item_d.getbbox(" ".join(cur))
            if bbox[2] - bbox[0] > 465:
                cur.pop()
                lines.append(" ".join(cur))
                cur = [w]
        if cur:
            lines.append(" ".join(cur))
        
        ly = cy + 62
        for l in lines:
            draw.text((cx + 25, ly), l, font=f_item_d, fill=(185, 210, 195, 220))
            ly += 25
            
    # Footer
    f_footer = get_font(False, 18)
    draw.text((60, 615), "Drop a comment or DM me anytime. Built solo — every critique directly shapes the next release.", font=f_footer, fill=(140, 180, 155, 230))
    
    canvas.alpha_composite(overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_3_feedback.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

if __name__ == "__main__":
    generate_card_1_landscape()
    generate_card_2_square()
    generate_card_3_feedback()
    print("All X promotional cards generated successfully!")
