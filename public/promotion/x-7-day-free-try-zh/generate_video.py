import os
import sys
import math
import glob
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../.."))
OUTPUT_DIR = SCRIPT_DIR
OUTPUT_VIDEO_VERTICAL = os.path.join(OUTPUT_DIR, "movtrak_hook_7s_vertical.mp4")
OUTPUT_VIDEO_MAIN = os.path.join(OUTPUT_DIR, "movtrak_hook_7s.mp4")

# Punctuation wrapping rule
PUNCT_NO_START = "，。？！、：；）》”’"

def find_chinese_font(is_bold=False, size=24):
    """Resolve high quality Chinese fonts across macOS and Linux."""
    # 1. macOS PingFang SC
    pingfang_files = glob.glob("/System/Library/AssetsV2/**/PingFang.ttc", recursive=True)
    if pingfang_files and os.path.exists(pingfang_files[0]):
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

def ease_in_out(t):
    return t * t * (3.0 - 2.0 * t)

def ease_out_cubic(t):
    return 1.0 - math.pow(1.0 - t, 3.0)

def ease_in_cubic(t):
    return t * t * t

def create_base_canvas(width=1080, height=1920):
    """Deep obsidian green gradient with soft radial glow for 9:16 vertical."""
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)
    
    top_r, top_g, top_b = 10, 24, 15
    mid_r, mid_g, mid_b = 14, 34, 22
    bot_r, bot_g, bot_b = 18, 48, 30
    
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
    glow_draw.ellipse([(int(width * 0.4), -100), (width + 200, int(height * 0.55))], fill=(89, 228, 110, 28))
    glow_draw.ellipse([(-100, int(height * 0.5)), (int(width * 0.5), height + 100)], fill=(30, 80, 45, 40))
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

def extract_screen(image_name):
    """Extract raw camera screen view inside the phone mockup."""
    path = os.path.join(ASSETS_DIR, image_name)
    im = Image.open(path)
    x0, y0, x1, y1 = 152, 582, 1108, 2640
    return im.crop((x0, y0, x1, y1)).convert("RGBA")

def create_phone_with_shadow(phone, target_w, target_h):
    resized = phone.resize((target_w, target_h), Image.Resampling.LANCZOS)
    pad = 50
    sw = target_w + pad * 2
    sh = target_h + pad * 2
    shadow = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    radius = int(165 * (target_w / 1032))
    sdraw.rounded_rectangle(
        [(pad, pad + 18), (pad + target_w, pad + target_h + 18)],
        radius=radius,
        fill=(0, 0, 0, 170)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(26))
    shadow.alpha_composite(resized, (pad, pad))
    return shadow, pad

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

def draw_check(draw, x, y, size=18, color=(89, 228, 110, 255), width=3):
    draw.line([(x, y + int(size * 0.52)), (x + int(size * 0.38), y + int(size * 0.88))], fill=color, width=width)
    draw.line([(x + int(size * 0.35), y + int(size * 0.88)), (x + size, y + int(size * 0.16))], fill=color, width=width)

def draw_cross(draw, x, y, size=16, color=(255, 107, 107, 255), width=3):
    draw.line([(x, y), (x + size, y + size)], fill=color, width=width)
    draw.line([(x, y + size), (x + size, y)], fill=color, width=width)

def draw_hud_badge(draw, text, x, y, font, is_active=True):
    accent = (89, 228, 110, 255) if is_active else (255, 107, 107, 255)
    bg = (10, 24, 16, 210)
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad_l = 30
    pad_r = 18
    pad_y = 9
    w = tw + pad_l + pad_r
    h = th + pad_y * 2
    
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h // 2, fill=bg, outline=(89, 228, 110, 120), width=1)
    dot_x = x + 15
    dot_y = y + h // 2
    draw.ellipse([(dot_x - 5, dot_y - 5), (dot_x + 5, dot_y + 5)], fill=accent)
    text_y = y + pad_y - bbox[1]
    draw.text((x + pad_l, text_y), text, font=font, fill=(255, 255, 255, 255))
    return x + w, y + h

def create_end_card_9x16(phone, width=1080, height=1920):
    """Generate high-resolution native 9:16 End Card (Chinese Version)."""
    canvas = create_base_canvas(width, height)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    
    f_badge = get_font(True, 20)
    f_title = get_font(True, 50)
    f_sub = get_font(False, 24)
    f_card_t = get_font(True, 23)
    f_card_d = get_font(False, 19)
    f_cta = get_font(True, 26)
    f_cta_sub = get_font(False, 20)
    
    # Top Badges
    b1_end, _ = draw_pill(odraw, "独立开发最新上线", 70, 100, (255, 209, 102, 255), (20, 45, 25, 255), f_badge)
    draw_pill(odraw, "7天全功能免费试用", b1_end + 14, 100, (255, 255, 255, 30), (220, 245, 225, 255), f_badge)
    
    # Title
    odraw.text((70, 175), "一个人拍运动视频，", font=f_title, fill=(255, 255, 255, 255))
    odraw.text((70, 240), "总是动两下就出画框？", font=f_title, fill=(89, 228, 110, 255))
    odraw.text((70, 315), "为你打造的 iPhone 端侧 AI 跟拍摄影师。", font=f_sub, fill=(200, 225, 210, 230))
    
    pain_items = [
        ("传统拍摄痛点", "手机架在地上，爬两步就出画。手持云台笨重占包，还经常忘了充电。", False),
        ("Movtrak 解决方案", "手机静止摆放，端侧 AI 实时追踪人体姿态，平滑运镜并自动居中构图。", True),
        ("7天全功能免费试用", "所有功能完整解锁，零套路订阅陷阱。下载体验，欢迎在岩馆挑刺吐槽！", True)
    ]
    
    cy = 385
    for title, desc, is_positive in pain_items:
        accent = (89, 228, 110, 255) if is_positive else (255, 107, 107, 255)
        card_h = 160
        odraw.rounded_rectangle([(70, cy), (1010, cy + card_h)], radius=20, fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=1)
        odraw.rounded_rectangle([(70, cy), (78, cy + card_h)], radius=4, fill=accent)
        
        if is_positive:
            draw_check(odraw, 102, cy + 26, size=20, color=accent, width=3)
        else:
            draw_cross(odraw, 102, cy + 26, size=18, color=accent, width=3)
            
        odraw.text((135, cy + 22), title, font=f_card_t, fill=(255, 255, 255, 255))
        
        lines = wrap_text(desc, f_card_d, 840)
        line_y = cy + 68
        for l in lines:
            odraw.text((105, line_y), l, font=f_card_d, fill=(195, 215, 205, 230))
            line_y += 30
        cy += 185
        
    # Phone mockup in center bottom
    pw = 410
    ph = int(pw * (2104 / 1032))
    phone_layer, pad = create_phone_with_shadow(phone, pw, ph)
    px = (width - pw) // 2
    py = 970
    canvas.alpha_composite(phone_layer, (px - pad, py - pad))
    
    # Bottom CTA Pill
    cbar_y = 1730
    odraw.rounded_rectangle([(70, cbar_y), (1010, cbar_y + 110)], radius=55, fill=(255, 255, 255, 250))
    odraw.text((150, cbar_y + 24), "App Store 搜索：Movtrak  ·  7天免费试用", font=f_cta, fill=(15, 35, 20, 255))
    odraw.text((150, cbar_y + 64), "评论区直达链接 —— 欢迎在岩馆/健身房测试吐槽！", font=f_cta_sub, fill=(50, 100, 65, 255))
    
    canvas.alpha_composite(overlay)
    return canvas

def main():
    print("Preparing assets for Chinese 9:16 mobile vertical video rendering...")
    phone1 = extract_phone("app-human-body-track-1.png")
    screen_track1 = extract_screen("app-human-body-track-1.png")
    screen_pose1 = extract_screen("app-human-pose-detect-1.png")
    
    screen_track2 = extract_screen("app-human-body-track-2.png")
    screen_pose2 = extract_screen("app-human-pose-detect-2.png")
    
    f_badge = get_font(True, 20)
    f_title_big = get_font(True, 50)
    f_sub = get_font(False, 24)
    f_hud = get_font(True, 20)
    f_banner_title = get_font(True, 40)
    f_banner_sub = get_font(False, 23)
    
    width, height = 1080, 1920
    fps = 30
    total_frames = 210  # Exactly 7.0 seconds
    
    end_card_base = create_end_card_9x16(phone1, width, height)
    
    ffmpeg_bin = "/opt/homebrew/bin/ffmpeg"
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"
        
    cmd = [
        ffmpeg_bin,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{width}x{height}",
        "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        OUTPUT_VIDEO_VERTICAL
    ]
    
    print(f"Launching ffmpeg encoding for Chinese 9:16 vertical to: {OUTPUT_VIDEO_VERTICAL}")
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    
    base_bg = create_base_canvas(width, height)
    
    for f in range(total_frames):
        frame_canvas = base_bg.copy()
        
        # -------------------------------------------------------------
        # SCENE 1: The Problem (Frames 0 to 48 -> 0.0s to 1.6s)
        # -------------------------------------------------------------
        if f < 48:
            zoom_t = 0.0
            if f >= 24:
                zoom_t = ease_in_out((f - 24) / 24.0)
            
            text_alpha = int(255 * (1.0 - zoom_t))
            if text_alpha > 0:
                t_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
                t_draw = ImageDraw.Draw(t_overlay)
                
                b1_end, _ = draw_pill(t_draw, "独自运动拍摄痛点", 70, 120, (255, 209, 102, text_alpha), (20, 45, 25, text_alpha), f_badge)
                draw_pill(t_draw, "无人跟拍", b1_end + 14, 120, (255, 255, 255, int(text_alpha * 0.15)), (220, 245, 225, text_alpha), f_badge)
                
                t_draw.text((70, 195), "一个人拍运动视频，", font=f_title_big, fill=(255, 255, 255, text_alpha))
                t_draw.text((70, 260), "总是动两下就出画框？", font=f_title_big, fill=(89, 228, 110, text_alpha))
                
                t_draw.text((70, 345), "手机靠在镁粉包或水壶上，", font=f_sub, fill=(200, 225, 210, int(text_alpha * 0.9)))
                t_draw.text((70, 385), "刚爬两步就彻底走出镜头画框。", font=f_sub, fill=(200, 225, 210, int(text_alpha * 0.9)))
                
                # Problem callout box
                t_draw.rounded_rectangle([(70, 445), (1010, 565)], radius=16, fill=(255, 255, 255, int(text_alpha * 0.08)), outline=(255, 107, 107, int(text_alpha * 0.4)), width=1)
                t_draw.rounded_rectangle([(70, 445), (78, 565)], radius=3, fill=(255, 107, 107, text_alpha))
                draw_cross(t_draw, 102, 471, size=18, color=(255, 107, 107, text_alpha), width=3)
                t_draw.text((135, 467), "手持云台笨重占包，且总是忘记充电", font=get_font(True, 21), fill=(255, 180, 180, text_alpha))
                draw_check(t_draw, 102, 517, size=18, color=(89, 228, 110, text_alpha), width=3)
                t_draw.text((135, 513), "Movtrak 纯靠 iPhone 实现 AI 自动跟拍", font=get_font(True, 21), fill=(89, 228, 110, text_alpha))
                
                frame_canvas.alpha_composite(t_overlay)
            
            start_w = 560
            target_w = 1165
            cur_w = int(start_w + (target_w - start_w) * zoom_t)
            cur_h = int(cur_w * (2104 / 1032))
            
            start_cx, start_cy = 540, 1220
            target_cx, target_cy = 540, 941
            cur_cx = int(start_cx + (target_cx - start_cx) * zoom_t)
            cur_cy = int(start_cy + (target_cy - start_cy) * zoom_t)
            
            phone_layer, pad = create_phone_with_shadow(phone1, cur_w, cur_h)
            px = cur_cx - cur_w // 2
            py = cur_cy - cur_h // 2
            frame_canvas.alpha_composite(phone_layer, (px - pad, py - pad))

        # -------------------------------------------------------------
        # SCENE 2: The Breakthrough & AI Auto-Tracking (Frames 48 to 125 -> 1.6s to 4.17s)
        # -------------------------------------------------------------
        elif f < 125:
            rel_f = f - 48
            sw, sh = screen_track1.size
            
            scaled_w = 1080
            scaled_h = int(scaled_w * (sh / sw))
            
            pan_t = ease_in_out(rel_f / 77.0)
            crop_y = int(220 - pan_t * 140)
            
            if rel_f < 20:
                cur_screen = screen_track1
            elif rel_f < 28:
                blend_t = (rel_f - 20) / 8.0
                cur_screen = Image.blend(screen_track1, screen_pose1, blend_t)
            else:
                cur_screen = screen_pose1
                
            scaled_view = cur_screen.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
            cropped_view = scaled_view.crop((0, crop_y, 1080, crop_y + 1920))
            frame_canvas.alpha_composite(cropped_view)
            
            hud_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
            hdraw = ImageDraw.Draw(hud_layer)
            
            # Top Status Bar
            rec_pulse = int(150 + 105 * math.sin(f * 0.5))
            hdraw.ellipse([(60, 128), (76, 144)], fill=(255, 60, 60, rec_pulse))
            hdraw.text((90, 120), "REC 00:03", font=get_font(True, 26), fill=(255, 255, 255, 240))
            
            if rel_f < 20:
                draw_hud_badge(hdraw, "AI 视觉：正在锁定...", 710, 114, f_hud, is_active=False)
            else:
                draw_hud_badge(hdraw, "AI 视觉：已锁定实时跟拍", 670, 114, f_hud, is_active=True)
                
            # Dynamic tracking reticle over climber center
            if 20 <= rel_f < 70:
                cx, cy = 540, 880
                cr = 50
                hdraw.ellipse([(cx - cr, cy - cr), (cx + cr, cy + cr)], outline=(89, 228, 110, 170), width=2)
                hdraw.line([(cx - cr - 12, cy), (cx - cr + 8, cy)], fill=(89, 228, 110, 190), width=2)
                hdraw.line([(cx + cr - 8, cy), (cx + cr + 12, cy)], fill=(89, 228, 110, 190), width=2)
                hdraw.line([(cx, cy - cr - 12), (cx, cy - cr + 8)], fill=(89, 228, 110, 190), width=2)
                hdraw.line([(cx, cy + cr - 8), (cx, cy + cr + 12)], fill=(89, 228, 110, 190), width=2)
            
            # Bottom Subtitle Banner
            banner_y = 1560
            hdraw.rounded_rectangle([(60, banner_y), (1020, banner_y + 190)], radius=24, fill=(10, 24, 16, 230), outline=(89, 228, 110, 110), width=1)
            hdraw.rounded_rectangle([(60, banner_y), (70, banner_y + 190)], radius=4, fill=(89, 228, 110, 255))
            
            if rel_f < 25:
                hdraw.text((100, banner_y + 30), "无需任何外接云台硬件", font=f_banner_title, fill=(255, 255, 255, 255))
                hdraw.text((100, banner_y + 98), "端侧 AI 视觉算法，毫秒级实时捕捉人体姿态与位移。", font=f_banner_sub, fill=(200, 235, 210, 240))
            else:
                hdraw.text((100, banner_y + 30), "智能平滑运镜 · 自动居中构图", font=f_banner_title, fill=(89, 228, 110, 255))
                hdraw.text((100, banner_y + 98), "零外接设备 · 零云端延迟 · 人在动镜头自动平滑跟。", font=f_banner_sub, fill=(255, 255, 255, 240))
                
            frame_canvas.alpha_composite(hud_layer)

        # -------------------------------------------------------------
        # SCENE 3: Gym Versatility (Frames 125 to 160 -> 4.17s to 5.33s)
        # -------------------------------------------------------------
        elif f < 160:
            rel_f = f - 125
            sw, sh = screen_track2.size
            scaled_w = 1080
            scaled_h = int(scaled_w * (sh / sw))
            
            crop_y = int(220 - rel_f * 3.0)
            
            if rel_f < 15:
                cur_screen = screen_track2
            else:
                cur_screen = screen_pose2
                
            scaled_view = cur_screen.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
            cropped_view = scaled_view.crop((0, crop_y, 1080, crop_y + 1920))
            frame_canvas.alpha_composite(cropped_view)
            
            hud_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
            hdraw = ImageDraw.Draw(hud_layer)
            
            b1_end, _ = draw_pill(hdraw, "适配任意运动场景", 60, 120, (89, 228, 110, 255), (10, 24, 16, 255), f_badge)
            draw_pill(hdraw, "100% 本地离线运行", b1_end + 14, 120, (255, 255, 255, 40), (230, 255, 240, 255), f_badge)
            
            banner_y = 1560
            hdraw.rounded_rectangle([(60, banner_y), (1020, banner_y + 190)], radius=24, fill=(10, 24, 16, 230), outline=(255, 255, 255, 50), width=1)
            hdraw.rounded_rectangle([(60, banner_y), (70, banner_y + 190)], radius=4, fill=(255, 209, 102, 255))
            
            hdraw.text((100, banner_y + 30), "抱石攀岩 · 健身力量 · 街头健身", font=f_banner_title, fill=(255, 255, 255, 255))
            hdraw.text((100, banner_y + 98), "手机往地上一放，即开即练，镜头全程居中跟随。", font=f_banner_sub, fill=(200, 235, 210, 240))
            
            frame_canvas.alpha_composite(hud_layer)

        # -------------------------------------------------------------
        # SCENE 4: 7-Day Free Trial CTA (Frames 160 to 210 -> 5.33s to 7.0s)
        # -------------------------------------------------------------
        else:
            rel_f = f - 160
            frame_canvas.alpha_composite(end_card_base)
            
            overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
            odraw = ImageDraw.Draw(overlay)
            
            pulse = int(140 + 115 * math.sin(rel_f * 0.45))
            odraw.rounded_rectangle([(70, 755), (1010, 915)], radius=20, outline=(89, 228, 110, pulse), width=3)
            
            btn_pulse = int(120 + 100 * math.sin(rel_f * 0.45))
            odraw.rounded_rectangle([(70, 1730), (1010, 1840)], radius=55, outline=(89, 228, 110, btn_pulse), width=3)
            
            frame_canvas.alpha_composite(overlay)
            
        rgb_frame = frame_canvas.convert("RGB")
        proc.stdin.write(rgb_frame.tobytes())
        
        if (f + 1) % 30 == 0 or f == total_frames - 1:
            print(f"Rendered frame {f + 1}/{total_frames} ({((f + 1) / fps):.1f}s)")
            
    proc.stdin.close()
    proc.wait()
    print(f"Chinese 9:16 Video rendering complete! Output: {OUTPUT_VIDEO_VERTICAL}")
    
    import shutil
    shutil.copyfile(OUTPUT_VIDEO_VERTICAL, OUTPUT_VIDEO_MAIN)
    print(f"Copied 9:16 video to: {OUTPUT_VIDEO_MAIN}")
    
    if os.path.exists(OUTPUT_VIDEO_VERTICAL):
        sz = os.path.getsize(OUTPUT_VIDEO_VERTICAL) / (1024 * 1024)
        print(f"File size: {sz:.2f} MB")

if __name__ == "__main__":
    main()
