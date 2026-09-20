import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = "/home/chenjunqian/Develop/movtrak/movtrak-promotion"
ASSETS_DIR = "/home/chenjunqian/Develop/movtrak/movtrak-web/public"

FONT_BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FONT_MEDIUM = "/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc"
FONT_REGULAR = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

WIDTH = 1080
HEIGHT = 1440

def get_font(path, size):
    return ImageFont.truetype(path, size)

def create_base_canvas():
    """Create a high quality gradient canvas with deep forest green brand colors."""
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)
    
    top_r, top_g, top_b = 15, 38, 22       # #0F2616
    mid_r, mid_g, mid_b = 22, 58, 32       # #163A20
    bot_r, bot_g, bot_b = 30, 82, 45       # #1E522D
    
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        if ratio < 0.5:
            local_ratio = ratio * 2
            r = int(top_r + (mid_r - top_r) * local_ratio)
            g = int(top_g + (mid_g - top_g) * local_ratio)
            b = int(top_b + (mid_b - top_b) * local_ratio)
        else:
            local_ratio = (ratio - 0.5) * 2
            r = int(mid_r + (bot_r - mid_r) * local_ratio)
            g = int(mid_g + (bot_g - mid_g) * local_ratio)
            b = int(mid_b + (bot_b - mid_b) * local_ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))
    
    # Subtle vignette / lighting glow at top center
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(150, -100), (930, 450)], fill=(70, 160, 95, 38))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
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
    
    pad = 60
    sw = target_w + pad * 2
    sh = target_h + pad * 2
    shadow_layer = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    
    radius = int(165 * (target_w / 1032))
    shadow_draw.rounded_rectangle(
        [(pad, pad + 15), (pad + target_w, pad + target_h + 15)],
        radius=radius,
        fill=(0, 0, 0, 130)
    )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(25))
    
    shadow_layer.alpha_composite(resized_phone, (pad, pad))
    return shadow_layer, pad

def draw_pill_badge(draw, text, x, y, bg_color, text_color, font, pad_x=22, pad_y=10):
    """Draw a modern rounded pill badge."""
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    w = tw + pad_x * 2
    h = th + pad_y * 2
    
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h // 2, fill=bg_color)
    text_y = y + pad_y - bbox[1]
    draw.text((x + pad_x, text_y), text, font=font, fill=text_color)
    return x + w, y + h

def draw_glass_card(draw, x, y, w, h, bg_color=(255, 255, 255, 22), border_color=(255, 255, 255, 45), radius=20):
    """Draw frosted glass style card with border."""
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=radius, fill=bg_color, outline=border_color, width=2)

def generate_card_1():
    print("Generating Card 1: 爆款封面...")
    canvas = create_base_canvas()
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(FONT_BOLD, 26)
    f_title = get_font(FONT_BOLD, 52)
    f_sub = get_font(FONT_MEDIUM, 28)
    
    # Top badges
    draw_pill_badge(draw, "● 独立开发 · 在线听劝", 70, 70, (255, 209, 102, 255), (20, 48, 25, 255), f_badge)
    draw_pill_badge(draw, "[ 攀岩 / 健身自动跟拍 ]", 410, 70, (255, 255, 255, 30), (230, 245, 235, 255), f_badge)
    
    # Main Title
    draw.text((70, 140), "一个人运动老拍出画框？", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 215), "我做了个自动跟拍小工具", font=f_title, fill=(149, 213, 178, 255))
    
    # Subtitle
    draw.text((70, 295), "iPhone 自动居中平滑运镜 · 丢掉笨重云台", font=f_sub, fill=(216, 243, 220, 220))
    
    canvas.alpha_composite(overlay)
    
    # Phone mockup (adjusted height and position so it doesn't overlap bottom pill)
    phone = extract_phone("app-human-body-track-1.png")
    pw, ph = 460, 940
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    phone_x = (WIDTH - pw) // 2
    phone_y = 345
    canvas.alpha_composite(phone_layer, (phone_x - pad, phone_y - pad))
    
    # Floating Sticker on Phone (Upper Right)
    sticker_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(sticker_overlay)
    f_sticker = get_font(FONT_BOLD, 26)
    f_sticker_sub = get_font(FONT_MEDIUM, 20)
    
    sx, sy, sw, sh = 630, 400, 380, 105
    s_draw.rounded_rectangle([(sx + 4, sy + 6), (sx + sw + 4, sy + sh + 6)], radius=18, fill=(0, 0, 0, 100))
    s_draw.rounded_rectangle([(sx, sy), (sx + sw, sy + sh)], radius=18, fill=(255, 209, 102, 255))
    s_draw.text((sx + 24, sy + 18), "★ 7天免费试用已上线", font=f_sticker, fill=(20, 48, 25, 255))
    s_draw.text((sx + 24, sy + 60), "不花一分钱 · 全功能无套路直接测", font=f_sticker_sub, fill=(50, 75, 55, 255))
    
    # Bottom Floating Card
    bx, by, bw, bh = 70, 1310, 940, 95
    s_draw.rounded_rectangle([(bx + 3, by + 5), (bx + bw + 3, by + bh + 5)], radius=48, fill=(0, 0, 0, 120))
    s_draw.rounded_rectangle([(bx, by), (bx + bw, by + bh)], radius=48, fill=(255, 255, 255, 245))
    f_bot = get_font(FONT_BOLD, 28)
    s_draw.text((bx + 55, by + 30), "「 诚邀各位运动搭子试用，求狠提建议与挑刺！ 」", font=f_bot, fill=(20, 48, 25, 255))
    
    canvas.alpha_composite(sticker_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_1_cover.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Card 1 saved to:", out_path)

def generate_card_2():
    print("Generating Card 2: 为什么做它？...")
    canvas = create_base_canvas()
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(FONT_BOLD, 26)
    f_title = get_font(FONT_BOLD, 48)
    f_sub = get_font(FONT_MEDIUM, 28)
    
    draw_pill_badge(draw, "● 真实痛点 · 记录日常", 70, 70, (255, 209, 102, 255), (20, 48, 25, 255), f_badge)
    draw.text((70, 140), "为什么要做这个小工具？", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 215), "没有摄影师，一个人运动真的太难拍了…", font=f_sub, fill=(149, 213, 178, 255))
    
    canvas.alpha_composite(overlay)
    
    # Left Phone Mockup
    phone = extract_phone("app-human-body-track-2.png")
    pw, ph = 390, 795
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    canvas.alpha_composite(phone_layer, (70 - pad, 300 - pad))
    
    # Right Side 3 Pain Points Cards
    card_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    f_card_title = get_font(FONT_BOLD, 28)
    f_card_desc = get_font(FONT_REGULAR, 22)
    
    rx, rw = 490, 520
    pain_points = [
        ("× 手机架在地上", "稍微爬高或横移，人直接走出画框。动作磕完了才发现录了半天寂寞…", (255, 107, 107, 255)),
        ("× 买个手持云台", "死沉死沉占背包，好不容易背到岩馆，经常发现忘了充电…", (255, 159, 67, 255)),
        ("× 找路人帮忙拍", "一次两次还行，一个动作磕几十次，真的不好意思一直麻烦别人…", (254, 202, 87, 255))
    ]
    
    for i, (title, desc, tag_color) in enumerate(pain_points):
        cy = 300 + i * 265
        ch = 240
        draw_glass_card(c_draw, rx, cy, rw, ch, bg_color=(255, 255, 255, 18), border_color=(255, 255, 255, 40), radius=18)
        
        c_draw.rounded_rectangle([(rx + 16, cy + 24), (rx + 22, cy + 62)], radius=3, fill=tag_color)
        c_draw.text((rx + 36, cy + 28), title, font=f_card_title, fill=(255, 255, 255, 255))
        
        if len(desc) > 17:
            line1 = desc[:17]
            line2 = desc[17:]
            c_draw.text((rx + 24, cy + 85), line1, font=f_card_desc, fill=(220, 235, 225, 230))
            c_draw.text((rx + 24, cy + 122), line2, font=f_card_desc, fill=(220, 235, 225, 230))
        else:
            c_draw.text((rx + 24, cy + 90), desc, font=f_card_desc, fill=(220, 235, 225, 230))
            
    # Bottom Takeaway Card
    bx, by, bw, bh = 70, 1140, 940, 230
    draw_glass_card(c_draw, bx, by, bw, bh, bg_color=(20, 48, 25, 180), border_color=(149, 213, 178, 120), radius=22)
    
    f_bot_title = get_font(FONT_BOLD, 30)
    f_bot_desc = get_font(FONT_MEDIUM, 24)
    
    c_draw.text((bx + 35, by + 35), "◆ 独立开发初衷：", font=f_bot_title, fill=(255, 209, 102, 255))
    c_draw.text((bx + 35, by + 90), "“既然 iPhone 芯片算力这么强，为什么不让手机自己做运镜？”", font=f_bot_desc, fill=(255, 255, 255, 255))
    c_draw.text((bx + 35, by + 140), "无需外接任何云台，AI 实时找人、平滑居中，一个人也能拍出大片！", font=f_bot_desc, fill=(183, 228, 199, 240))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_2_origin.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Card 2 saved to:", out_path)

def generate_card_3():
    print("Generating Card 3: 目前能做到的事...")
    canvas = create_base_canvas()
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(FONT_BOLD, 26)
    f_title = get_font(FONT_BOLD, 48)
    f_sub = get_font(FONT_MEDIUM, 28)
    
    draw_pill_badge(draw, "● 目前进展 · 真实能力与局限", 70, 70, (255, 209, 102, 255), (20, 48, 25, 255), f_badge)
    draw.text((70, 140), "目前它能做到的事（诚恳求测）", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 215), "纯靠 iPhone 本地算力实时追踪 · 零云台硬件", font=f_sub, fill=(149, 213, 178, 255))
    
    canvas.alpha_composite(overlay)
    
    # Right Phone Mockup (Showing Pose skeleton detection)
    phone = extract_phone("app-human-pose-detect-1.png")
    pw, ph = 390, 795
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    canvas.alpha_composite(phone_layer, (620 - pad, 300 - pad))
    
    # Left Side Feature Cards
    card_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    f_card_title = get_font(FONT_BOLD, 28)
    f_card_desc = get_font(FONT_REGULAR, 22)
    
    lx, lw = 70, 520
    features = [
        ("✓ AI 人体姿态实时识别", "毫秒级检测人体关节与重心，即使在大范围攀爬、倒立中也能紧锁。", (149, 213, 178, 255)),
        ("✓ 电影级平滑居中构图", "自研平滑虚拟运镜算法，消除机械剧烈拉扯，让出片更像真人运镜。", (255, 209, 102, 255)),
        ("✓ 100% 纯本地运行", "所有视觉模型与视频都在手机端本地处理，绝不上传云端，隐私无忧。", (116, 185, 255, 255))
    ]
    
    for i, (title, desc, color) in enumerate(features):
        cy = 300 + i * 265
        ch = 240
        draw_glass_card(c_draw, lx, cy, lw, ch, bg_color=(255, 255, 255, 18), border_color=(255, 255, 255, 40), radius=18)
        
        c_draw.rounded_rectangle([(lx + 16, cy + 24), (lx + 22, cy + 62)], radius=3, fill=color)
        c_draw.text((lx + 36, cy + 28), title, font=f_card_title, fill=(255, 255, 255, 255))
        
        if len(desc) > 17:
            line1 = desc[:17]
            line2 = desc[17:]
            c_draw.text((lx + 24, cy + 85), line1, font=f_card_desc, fill=(220, 235, 225, 230))
            c_draw.text((lx + 24, cy + 122), line2, font=f_card_desc, fill=(220, 235, 225, 230))
        else:
            c_draw.text((lx + 24, cy + 90), desc, font=f_card_desc, fill=(220, 235, 225, 230))
            
    # Bottom Note
    bx, by, bw, bh = 70, 1140, 940, 230
    draw_glass_card(c_draw, bx, by, bw, bh, bg_color=(20, 48, 25, 180), border_color=(255, 209, 102, 120), radius=22)
    
    f_bot_title = get_font(FONT_BOLD, 30)
    f_bot_desc = get_font(FONT_MEDIUM, 24)
    
    c_draw.text((bx + 35, by + 35), "▲ 极客坦白 & 诚恳求测：", font=f_bot_title, fill=(255, 209, 102, 255))
    c_draw.text((bx + 35, by + 90), "由于个人测试机型与场景有限，算法在剧烈逆光、多人群演等极端情况下", font=f_bot_desc, fill=(255, 255, 255, 255))
    c_draw.text((bx + 35, by + 140), "可能仍有跟丢情况，非常需要大家在不同运动项目中进行“压力测试”！", font=f_bot_desc, fill=(183, 228, 199, 240))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_3_features.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Card 3 saved to:", out_path)

def generate_card_4():
    print("Generating Card 4: 7天免费试用...")
    canvas = create_base_canvas()
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(FONT_BOLD, 26)
    f_title = get_font(FONT_BOLD, 48)
    f_sub = get_font(FONT_MEDIUM, 28)
    
    draw_pill_badge(draw, "● 刚刚更新 · 7天免费试用", 70, 70, (255, 209, 102, 255), (20, 48, 25, 255), f_badge)
    draw.text((70, 140), "已上线 7 天全功能免费试用", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 215), "不花一分钱，先体验 7 天，好用再留！", font=f_sub, fill=(255, 209, 102, 255))
    
    canvas.alpha_composite(overlay)
    
    # Left Phone Mockup (Video Editing UI)
    phone = extract_phone("app-video-editting.png")
    pw, ph = 390, 795
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    canvas.alpha_composite(phone_layer, (70 - pad, 300 - pad))
    
    # Right Side Trial Details
    card_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    f_card_title = get_font(FONT_BOLD, 28)
    f_card_desc = get_font(FONT_REGULAR, 22)
    
    rx, rw = 490, 520
    trial_points = [
        ("★ 为什么开启免费试用？", "与其自夸好用，不如把工具交给大家。真心希望能有更多真实反馈！", (255, 209, 102, 255)),
        ("★ 零套路全功能开放", "试用期没有任何功能阉割，4K超清录制、平滑追踪全部可以使用。", (149, 213, 178, 255)),
        ("★ 录完即剪 · 直出相册", "内置极简时间轴裁剪，录完直接截取高光时刻，无缝存入系统相册。", (116, 185, 255, 255))
    ]
    
    for i, (title, desc, color) in enumerate(trial_points):
        cy = 300 + i * 265
        ch = 240
        draw_glass_card(c_draw, rx, cy, rw, ch, bg_color=(255, 255, 255, 18), border_color=(255, 255, 255, 40), radius=18)
        
        c_draw.rounded_rectangle([(rx + 16, cy + 24), (rx + 22, cy + 62)], radius=3, fill=color)
        c_draw.text((rx + 36, cy + 28), title, font=f_card_title, fill=(255, 255, 255, 255))
        
        if len(desc) > 17:
            line1 = desc[:17]
            line2 = desc[17:]
            c_draw.text((rx + 24, cy + 85), line1, font=f_card_desc, fill=(220, 235, 225, 230))
            c_draw.text((rx + 24, cy + 122), line2, font=f_card_desc, fill=(220, 235, 225, 230))
        else:
            c_draw.text((rx + 24, cy + 90), desc, font=f_card_desc, fill=(220, 235, 225, 230))
            
    # Bottom Action Card
    bx, by, bw, bh = 70, 1140, 940, 230
    draw_glass_card(c_draw, bx, by, bw, bh, bg_color=(255, 255, 255, 245), border_color=(255, 209, 102, 255), radius=22)
    
    f_bot_title = get_font(FONT_BOLD, 32)
    f_bot_desc = get_font(FONT_MEDIUM, 24)
    
    c_draw.text((bx + 35, by + 35), "【获取方式】App Store 搜索「Movtrak」", font=f_bot_title, fill=(20, 48, 25, 255))
    c_draw.text((bx + 35, by + 95), "进入即可自动开启 7 天免费试用，好用您留下，", font=f_bot_desc, fill=(60, 80, 65, 255))
    c_draw.text((bx + 35, by + 145), "不好用请随时在评论区或私信狠狠吐槽，一定虚心吸取与排期优化！", font=f_bot_desc, fill=(60, 80, 65, 255))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_4_trial.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Card 4 saved to:", out_path)

def generate_card_5():
    print("Generating Card 5: 听劝看板...")
    canvas = create_base_canvas()
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(FONT_BOLD, 26)
    f_title = get_font(FONT_BOLD, 48)
    f_sub = get_font(FONT_MEDIUM, 28)
    
    draw_pill_badge(draw, "● 独立开发 · 在线听劝", 70, 70, (255, 209, 102, 255), (20, 48, 25, 255), f_badge)
    draw.text((70, 140), "求各位运动搭子狠狠挑刺！", font=f_title, fill=(255, 255, 255, 255))
    draw.text((70, 215), "任何您觉得用着别扭的地方，都是我后续优化的方向", font=f_sub, fill=(149, 213, 178, 255))
    
    canvas.alpha_composite(overlay)
    
    # 4 Questions Stacked Rows
    card_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_overlay)
    
    f_q_title = get_font(FONT_BOLD, 30)
    f_q_desc = get_font(FONT_REGULAR, 23)
    
    questions = [
        ("Q1. 会不会经常跟丢目标？", "在大范围横向移动、部分遮挡或动作过快时，AI 追踪的表现稳定吗？", (255, 209, 102, 255)),
        ("Q2. 运镜平滑度看起来自然吗？", "画面的自动裁切与平滑跟随舒不舒服？会不会产生晃动或眩晕感？", (149, 213, 178, 255)),
        ("Q3. 设备发热与耗电怎么样？", "在岩馆或户外连续录制 10-15 分钟后，发热和掉电是否在可接受范围？", (255, 159, 67, 255)),
        ("Q4. 哪个操作让您觉得“最反人类”？", "哪个按钮或者界面交互用着最别扭？您最希望后续加入什么新功能？", (116, 185, 255, 255))
    ]
    
    qx, qw = 70, 940
    for i, (q_title, q_desc, q_color) in enumerate(questions):
        qy = 295 + i * 200
        qh = 175
        draw_glass_card(c_draw, qx, qy, qw, qh, bg_color=(255, 255, 255, 20), border_color=(255, 255, 255, 45), radius=18)
        
        c_draw.rounded_rectangle([(qx + 20, qy + 24), (qx + 28, qy + 60)], radius=4, fill=q_color)
        c_draw.text((qx + 45, qy + 25), q_title, font=f_q_title, fill=(255, 255, 255, 255))
        c_draw.text((qx + 45, qy + 85), q_desc, font=f_q_desc, fill=(216, 243, 220, 230))
        
    # Bottom Promise & CTA
    bx, by, bw, bh = 70, 1140, 940, 230
    draw_glass_card(c_draw, bx, by, bw, bh, bg_color=(20, 48, 25, 220), border_color=(255, 209, 102, 160), radius=22)
    
    f_bot_title = get_font(FONT_BOLD, 32)
    f_bot_desc = get_font(FONT_MEDIUM, 25)
    
    c_draw.text((bx + 40, by + 35), "◆ 独立开发者郑重承诺：", font=f_bot_title, fill=(255, 209, 102, 255))
    c_draw.text((bx + 40, by + 95), "评论区和私信的每一条反馈，我都会逐一回复并记录进排期表！", font=f_bot_desc, fill=(255, 255, 255, 255))
    c_draw.text((bx + 40, by + 145), "全靠各位运动搭子的真实测试推着它进步，十分感谢大家的真诚建议！", font=f_bot_desc, fill=(183, 228, 199, 240))
    
    canvas.alpha_composite(card_overlay)
    
    out_path = os.path.join(OUTPUT_DIR, "card_5_feedback.png")
    canvas.convert("RGB").save(out_path, quality=95)
    print("Card 5 saved to:", out_path)

if __name__ == "__main__":
    generate_card_1()
    generate_card_2()
    generate_card_3()
    generate_card_4()
    generate_card_5()
    print("All 5 cards regenerated successfully!")
