import os
import glob
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../.."))
OUTPUT_DIR = SCRIPT_DIR

def find_chinese_font(is_bold=False, size=24):
    """Resolve high quality Chinese fonts across macOS and Linux."""
    # 1. macOS PingFang SC
    pingfang_files = glob.glob("/System/Library/AssetsV2/**/PingFang.ttc", recursive=True)
    if pingfang_files and os.path.exists(pingfang_files[0]):
        # Index 11: PingFang SC Semibold; Index 7: PingFang SC Medium
        idx = 11 if is_bold else 7
        try:
            return ImageFont.truetype(pingfang_files[0], size, index=idx)
        except Exception:
            pass

    # 2. macOS Hiragino Sans GB
    hira_path = "/System/Library/Fonts/Hiragino Sans GB.ttc"
    if os.path.exists(hira_path):
        try:
            return ImageFont.truetype(hira_path, size)
        except Exception:
            pass

    # 3. macOS STHeiti
    heiti_path = "/System/Library/Fonts/STHeiti Medium.ttc" if is_bold else "/System/Library/Fonts/STHeiti Light.ttc"
    if os.path.exists(heiti_path):
        try:
            return ImageFont.truetype(heiti_path, size)
        except Exception:
            pass

    # 4. Linux Noto Sans CJK / WenQuanYi
    linux_candidates = [
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc" if is_bold else "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc",
    ]
    for path in linux_candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass

    return ImageFont.load_default()

def get_font(is_bold, size):
    return find_chinese_font(is_bold, size)

PUNCT_NO_START = "，。？！、：；）》”’"

def wrap_text(text, font, max_width):
    """Character-level text wrapping with Chinese punctuation handling (avoiding leading punctuation)."""
    lines = []
    current_line = ""
    for char in text:
        test_line = current_line + char
        bbox = font.getbbox(test_line)
        w = bbox[2] - bbox[0]
        if w > max_width and current_line:
            if char in PUNCT_NO_START and len(current_line) > 1:
                lines.append(current_line[:-1])
                current_line = current_line[-1] + char
            else:
                lines.append(current_line)
                current_line = char
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)
    return lines

def create_base_canvas(width, height):
    """Create a high quality dark gradient canvas with Movtrak deep forest green tones."""
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)
    
    top_r, top_g, top_b = 10, 24, 15
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
            b = int(bot_b + (bot_b - mid_b) * local)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(int(width * 0.55), -150), (width + 200, int(height * 0.85))], fill=(89, 228, 110, 32))
    glow_draw.ellipse([(-100, int(height * 0.4)), (int(width * 0.4), height + 100)], fill=(30, 80, 45, 45))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(glow)
    
    return canvas

def extract_phone(image_name):
    """Crop phone mockup cleanly from public image and apply anti-aliased rounded mask."""
    path = os.path.join(ASSETS_DIR, image_name)
    im = Image.open(path)
    
    x0, y0, x1, y1 = 114, 558, 1146, 2662
    w, h = x1 - x0, y1 - y0
    phone = im.crop((x0, y0, x1, y1)).convert("RGBA")
    
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
    """16:9 Landscape Feature Card (1200x675) - Chinese Version"""
    print("Generating Card 1: 16:9 Landscape (ZH)...")
    width, height = 1200, 675
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 15)
    f_hero = get_font(True, 44)
    f_sub = get_font(False, 20)
    f_feature = get_font(False, 18)
    f_cta = get_font(True, 19)
    
    # Top Badges
    b1_end_x, _ = draw_pill(draw, "MOVTRAK FOR IOS", 60, 50, (89, 228, 110, 255), (15, 35, 20, 255), f_badge)
    draw_pill(draw, "7天全功能免费试用现已上线", b1_end_x + 12, 50, (255, 255, 255, 25), (220, 245, 225, 255), f_badge)
    
    # Hero Title (Left Side)
    draw.text((60, 116), "你的 iPhone，就是你的", font=f_hero, fill=(255, 255, 255, 255))
    draw.text((60, 172), "专属 AI 运动摄影师。", font=f_hero, fill=(89, 228, 110, 255))
    
    # Subtitle
    draw.text((60, 246), "专为攀岩抱石、力量健身、街头运动爱好者打造。", font=f_sub, fill=(210, 225, 215, 240))
    draw.text((60, 278), "无需任何外接云台硬件，自动居中构图与平滑运镜跟拍。", font=f_sub, fill=(210, 225, 215, 240))
    
    # Feature Bullet Points
    features = [
        "100% 端侧 AI 视觉追踪（无云端延迟、隐私安全、完全离线）",
        "手机往地上一摆即可开练 —— 动作再大也绝不出画",
        "告别笨重云台与没电焦虑，更不用频繁麻烦路人搭子",
        "7天全功能完整体验 · 一次性买断无套路自动续费"
    ]
    
    fy = 345
    for feat in features:
        draw_check(draw, 62, fy + 4, size=15, color=(89, 228, 110, 255), width=2)
        draw.text((90, fy), feat, font=f_feature, fill=(185, 215, 195, 230))
        fy += 38
    
    # Bottom Download Pill
    draw_pill(draw, "App Store 搜索下载 “Movtrak”", 60, 545, (255, 255, 255, 245), (15, 30, 20, 255), f_cta, pad_x=24, pad_y=12)
    
    canvas.alpha_composite(overlay)
    
    # Phone mockup on right side
    phone = extract_phone("app-human-body-track-1.png")
    pw = 280
    ph = int(pw * (2104 / 1032))
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    
    px = 855
    py = 50
    canvas.alpha_composite(phone_layer, (px - pad, py - pad))
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_1_landscape.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

def generate_card_2_square():
    """1:1 Square Card (1080x1080) - Chinese Version"""
    print("Generating Card 2: 1:1 Square (ZH)...")
    width, height = 1080, 1080
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 17)
    f_title = get_font(True, 46)
    f_sub = get_font(False, 22)
    f_card_t = get_font(True, 21)
    f_card_d = get_font(False, 17)
    f_bot = get_font(True, 22)
    
    # Top Badges
    b1_end, _ = draw_pill(draw, "独立开发最新上线", 70, 65, (255, 209, 102, 255), (20, 45, 25, 255), f_badge)
    draw_pill(draw, "7天全功能免费试用", b1_end + 12, 65, (255, 255, 255, 30), (220, 245, 225, 255), f_badge)
    
    # Title
    draw.text((70, 130), "一个人拍运动视频，", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 188), "总是动两步就走出画框？", font=f_title, fill=(89, 228, 110, 255))
    draw.text((70, 255), "我为 iPhone 做了一款端侧 AI 自动跟拍小工具。", font=f_sub, fill=(200, 225, 210, 230))
    
    canvas.alpha_composite(overlay)
    
    # Phone mockup in center-right
    phone = extract_phone("app-human-body-track-1.png")
    pw = 320
    ph = int(pw * (2104 / 1032))
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    px = 680
    py = 275
    canvas.alpha_composite(phone_layer, (px - pad, py - pad))
    
    # Comparison cards on the left
    card_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    pain_items = [
        ("传统拍摄方式", "手机往地上一靠，爬两步就出画。手持云台笨重占包，还经常忘了充电。", False),
        ("Movtrak 拍摄方式", "手机静止摆放，端侧 AI 实时捕捉人体姿态，平滑运镜并自动居中构图。", True),
        ("7天全功能免费试用", "所有核心功能完整开放，无套路订阅陷阱。下载体验，欢迎在岩馆挑刺！", True)
    ]
    
    cy = 325
    for title, desc, is_positive in pain_items:
        c_draw.rounded_rectangle([(70, cy), (630, cy + 155)], radius=18, fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=1)
        
        accent_color = (89, 228, 110, 255) if is_positive else (255, 107, 107, 255)
        c_draw.rounded_rectangle([(70, cy), (76, cy + 155)], radius=3, fill=accent_color)
        
        if is_positive:
            draw_check(c_draw, 95, cy + 22, size=16, color=accent_color, width=2)
        else:
            draw_cross(c_draw, 96, cy + 22, size=15, color=accent_color, width=2)
            
        c_draw.text((125, cy + 18), title, font=f_card_t, fill=(255, 255, 255, 255))
        
        lines = wrap_text(desc, f_card_d, 480)
        line_y = cy + 58
        for l in lines:
            c_draw.text((95, line_y), l, font=f_card_d, fill=(195, 215, 205, 220))
            line_y += 26
            
        cy += 180
    
    # Bottom banner
    c_draw.rounded_rectangle([(70, 940), (980, 1020)], radius=40, fill=(255, 255, 255, 245))
    c_draw.text((115, 965), "App Store 搜索：Movtrak  ·  免费试用 7 天，欢迎在评论区狠批！", font=f_bot, fill=(15, 35, 20, 255))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_2_square.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

def generate_card_3_feedback():
    """16:9 Landscape Card for Feedback / Testing Request (1200x675) - Chinese Version"""
    print("Generating Card 3: Feedback Request (ZH)...")
    width, height = 1200, 675
    canvas = create_base_canvas(width, height)
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 15)
    f_hero = get_font(True, 42)
    f_sub = get_font(False, 20)
    f_item_t = get_font(True, 20)
    f_item_d = get_font(False, 16)
    
    # Top Badges
    draw_pill(draw, "社区公测", 60, 50, (255, 209, 102, 255), (20, 45, 25, 255), f_badge)
    draw_pill(draw, "独立开发公开记录", 185, 50, (255, 255, 255, 25), (220, 245, 225, 255), f_badge)
    
    # Header
    draw.text((60, 115), "诚恳求测，欢迎不留情面地挑刺。", font=f_hero, fill=(255, 255, 255, 255))
    draw.text((60, 175), "已上线 7 天全功能免费试用，方便大家随时压力测试。重点关注这 4 点：", font=f_sub, fill=(180, 220, 195, 230))
    
    # 4 Feedback Grid Cards (2x2)
    cards = [
        ("1. 跟拍灵敏度与响应", "遇到动态大招（Dyno）、快速移位或有遮挡时，AI 能否稳定跟住？会跟丢吗？"),
        ("2. 画面平滑度与运镜", "镜头自动跟随平移是否自然丝滑？观看时会不会产生抖动或眩晕感？"),
        ("3. 发热与电池续航", "在岩馆或健身房连续录制 10~15 分钟，iPhone 发热和掉电情况如何？"),
        ("4. 交互槽点与功能期待", "界面有哪些反人类设计？你最希望在接下来的版本中加入什么新功能？")
    ]
    
    positions = [
        (60, 245),
        (620, 245),
        (60, 425),
        (620, 425)
    ]
    
    for (title, desc), (cx, cy) in zip(cards, positions):
        draw.rounded_rectangle([(cx, cy), (cx + 520, cy + 150)], radius=16, fill=(255, 255, 255, 16), outline=(255, 255, 255, 38), width=1)
        draw.rounded_rectangle([(cx, cy), (cx + 6, cy + 150)], radius=3, fill=(89, 228, 110, 255))
        draw.text((cx + 25, cy + 22), title, font=f_item_t, fill=(255, 255, 255, 255))
        
        lines = wrap_text(desc, f_item_d, 465)
        ly = cy + 62
        for l in lines:
            draw.text((cx + 25, ly), l, font=f_item_d, fill=(185, 210, 195, 220))
            ly += 26
            
    # Footer
    f_footer = get_font(False, 17)
    draw.text((60, 615), "随时欢迎在评论区或私信留言。一人独立开发 —— 你的每一条挑刺都会直接决定下个版本迭代。", font=f_footer, fill=(140, 180, 155, 230))
    
    canvas.alpha_composite(overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_x_3_feedback.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Saved:", out_path)

if __name__ == "__main__":
    generate_card_1_landscape()
    generate_card_2_square()
    generate_card_3_feedback()
    print("All Chinese X promotional cards generated successfully!")
