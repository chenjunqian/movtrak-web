"""Generate NEW Xiaohongshu (3:4, 1080x1440) cards for Movtrak's 7-day free trial.

Reuses the existing phone mockups in movtrak-web/public (app-human-*.png) and the
visual language of the earlier rednote set. Writes only into this new folder;
nothing outside it is modified.

New cards produced here (the earlier rednote-7-day-free-try set stays untouched):
  card_6_ondevice_ai.png  - 端侧 AI / 完全离线 / 隐私 (old set never covered this)
  card_7_feedback.png     - 听劝反馈看板, re-cut from the newer 16:9 X feedback card
"""

import glob
import os

from PIL import Image, ImageDraw, ImageFont, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../.."))
OUTPUT_DIR = SCRIPT_DIR

WIDTH, HEIGHT = 1080, 1440

# Phone silhouette inside the 1260x2736 app mockups (measured, includes side buttons)
PHONE_BOX = (100, 566, 1142, 2681)
PHONE_RATIO = (PHONE_BOX[2] - PHONE_BOX[0]) / (PHONE_BOX[3] - PHONE_BOX[1])

# Palette (matches the earlier rednote set)
AMBER = (255, 209, 102, 255)
AMBER_TEXT = (20, 48, 25, 255)
MINT = (149, 213, 178, 255)
MINT_SOFT = (183, 228, 199, 240)
INK = (255, 255, 255, 255)
BODY = (220, 235, 225, 230)
GREEN_BAR = (149, 213, 178, 255)


def find_font(size, weight="semibold"):
    """Resolve a high quality Chinese font; PingFang SC preferred, then fallbacks."""
    for path in glob.glob("/System/Library/AssetsV2/**/PingFang.ttc", recursive=True):
        idx = {"regular": 3, "medium": 7, "semibold": 11}.get(weight, 11)
        try:
            return ImageFont.truetype(path, size, index=idx)
        except Exception:
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass

    for path in ("/System/Library/Fonts/Hiragino Sans GB.ttc",
                 "/System/Library/Fonts/STHeiti Medium.ttc"):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass

    for path in ("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
                 "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass

    return ImageFont.load_default()


def create_base_canvas():
    """Deep forest green gradient with a soft top-center glow (matches old set)."""
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)

    top, mid, bot = (15, 38, 22), (22, 58, 32), (30, 82, 45)
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        if ratio < 0.5:
            t, (a, b) = ratio * 2, (top, mid)
        else:
            t, (a, b) = (ratio - 0.5) * 2, (mid, bot)
        draw.line([(0, y), (WIDTH, y)],
                  fill=tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3)) + (255,))

    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([(150, -100), (930, 450)], fill=(70, 160, 95, 38))
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(80)))
    return canvas


def extract_phone(image_name):
    """Cut the iPhone mockup out of an app screenshot and round its corners."""
    im = Image.open(os.path.join(ASSETS_DIR, image_name)).convert("RGBA")
    phone = im.crop(PHONE_BOX)
    w, h = phone.size

    scale = 2
    mask = Image.new("L", (w * scale, h * scale), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [(0, 0), (w * scale, h * scale)], radius=int(160 * scale), fill=255
    )
    phone.putalpha(mask.resize((w, h), Image.Resampling.LANCZOS))
    return phone


def phone_with_shadow(phone, target_w):
    """Resize to target width (keeping phone aspect) and add a soft drop shadow."""
    target_h = int(round(target_w / PHONE_RATIO))
    resized = phone.resize((target_w, target_h), Image.Resampling.LANCZOS)

    pad = 60
    layer = Image.new("RGBA", (target_w + pad * 2, target_h + pad * 2), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    radius = max(10, int(160 * (target_w / (PHONE_BOX[2] - PHONE_BOX[0]))))
    draw.rounded_rectangle(
        [(pad, pad + 14), (pad + target_w, pad + target_h + 14)],
        radius=radius, fill=(0, 0, 0, 130),
    )
    layer = layer.filter(ImageFilter.GaussianBlur(25))
    layer.alpha_composite(resized, (pad, pad))
    return layer, pad


def text_w(text, font):
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0]


NO_LINE_START = "，。、；：？！）》”’…·"


def _is_latin(ch):
    return ch.isascii() and (ch.isalnum() or ch in ".+-_/'")


def wrap(text, font, max_w):
    """Greedy wrap for CJK/Latin.

    CJK may break anywhere; a space is only a break opportunity when it joins two
    Latin words (e.g. "端侧 AI 实时"), which keeps those words intact without
    letting an early CJK space fragment the line.
    """
    protect = set()
    for i, ch in enumerate(text):
        if ch == " " and 0 < i < len(text) - 1:
            if _is_latin(text[i - 1]) and _is_latin(text[i + 1]):
                protect.add(i)

    lines, cur = [], ""
    for i, ch in enumerate(text):
        if ch == "\n":
            lines.append(cur.rstrip())
            cur = ""
            continue

        over = cur and text_w(cur + ch, font) > max_w

        if over and ch not in NO_LINE_START:
            cut = len(cur)
            # i is the index of ch; cur spans text[i-len(cur) : i]
            start = i - len(cur)
            for p in protect:
                if start < p <= i:
                    # Break at the protected space when the remainder can still
                    # fit more content; otherwise burn the extra character so
                    # the next line starts full instead of splitting again.
                    tail_w = text_w(text[p:i].lstrip() + ch, font)
                    if tail_w <= max_w:
                        cut = p - start
                    break
            head, tail = cur[:cut].rstrip(), cur[cut:].lstrip()
            lines.append(head)
            cur = tail + ch
        else:
            # Includes the case where only punctuation overflowed: keep it attached
            cur += ch

    if cur:
        lines.append(cur.rstrip())
    return lines


def draw_pill_badge(draw, text, x, y, font, bg=AMBER, fg=AMBER_TEXT, pad_x=22, pad_y=10):
    bbox = font.getbbox(text)
    w = (bbox[2] - bbox[0]) + pad_x * 2
    h = (bbox[3] - bbox[1]) + pad_y * 2
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h // 2, fill=bg)
    draw.text((x + pad_x, y + pad_y - bbox[1]), text, font=font, fill=fg)
    return w, h


def draw_glass_card(draw, x, y, w, h, bg=(255, 255, 255, 20),
                    border=(255, 255, 255, 42), radius=20):
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=radius,
                           fill=bg, outline=border, width=2)


def draw_bottom_pill(canvas, text, font_size=30):
    """White rounded CTA pill anchored near the bottom edge."""
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    font = find_font(font_size, "semibold")

    pad_x, h = 55, 96
    w = text_w(text, font) + pad_x * 2
    x = (WIDTH - w) // 2
    y = HEIGHT - 64 - h

    draw.rounded_rectangle([(x + 3, y + 6), (x + w + 3, y + h + 6)],
                           radius=h // 2, fill=(0, 0, 0, 120))
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h // 2,
                           fill=(255, 255, 255, 245))
    bbox = font.getbbox(text)
    draw.text((x + pad_x, y + (h - (bbox[3] - bbox[1])) // 2 - bbox[1]),
              text, font=font, fill=AMBER_TEXT)
    canvas.alpha_composite(overlay)
    return y


def draw_header(canvas, badge, title_lines, subtitle, title_size=48, sub_size=25):
    """Top badge + title + subtitle block shared by both cards."""
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    f_badge = find_font(26, "semibold")
    f_title = find_font(title_size, "semibold")
    f_sub = find_font(sub_size, "medium")

    px, py = 70, 70
    draw_pill_badge(draw, badge, px, py, f_badge)
    y = py + 62
    for line in title_lines:
        draw.text((px, y), line, font=f_title, fill=INK)
        y += title_size + 24
    y += 10
    for line in subtitle:
        draw.text((px, y), line, font=f_sub, fill=MINT)
        y += sub_size + 17
    canvas.alpha_composite(overlay)
    return y


def generate_card_6():
    """端侧 AI / 完全离线 / 隐私 —— 旧套装完全没有覆盖的新版核心卖点。

    Uses the side-by-side layout proven by the earlier card_2/card_3 so that the
    phone mockup can never overlap the text panels.
    """
    print("Generating card_6_ondevice_ai ...")
    canvas = create_base_canvas()

    header_bottom = draw_header(
        canvas,
        "● 目前进展 · 真实能力与局限",
        ["你的 iPhone，就是你的", "专属 AI 运动摄影师。"],
        ["100% 端侧 AI 视觉追踪 · 不连云端也能跟"],
    )

    # Left: phone mockup showing pose detection
    phone = extract_phone("app-human-pose-detect-1.png")
    pw = 380
    layer, pad = phone_with_shadow(phone, pw)
    phone_y = max(header_bottom + 30, 500)
    canvas.alpha_composite(layer, (70 - pad, phone_y - pad))

    # Right: three feature panels
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    f_card_title = find_font(28, "semibold")
    f_card_desc = find_font(21, "regular")

    panels = [
        ("毫秒级端侧视觉追踪",
         "在手机本地实时捕捉人体关节与重心，没有上传、没有等待，动作再大也锁得住。"),
        ("平滑运镜 · 自动居中",
         "端侧算法逐帧校正构图，消除机械骤停与抖动，出片更像真人摄影师的运镜。"),
        ("完全离线 · 数据不出手机",
         "断网照样跟拍；视频与模型全部留在本机，不采集、不上传，隐私无忧。"),
    ]

    rx, rw = 486, 478
    ry = phone_y
    for title, desc in panels:
        lines = wrap(desc, f_card_desc, rw - 90)
        ch = 62 + 32 * len(lines) + 22
        draw_glass_card(draw, rx, ry, rw, ch)
        draw.rounded_rectangle([(rx + 16, ry + 26), (rx + 22, ry + 62)],
                               radius=3, fill=GREEN_BAR)
        draw.text((rx + 40, ry + 24), title, font=f_card_title, fill=INK)
        ty = ry + 78
        for line in lines:
            draw.text((rx + 40, ty), line, font=f_card_desc, fill=BODY)
            ty += 32
        ry += ch + 22

    canvas.alpha_composite(overlay)
    draw_bottom_pill(canvas, "App Store 搜索 Movtrak · 7天全功能免费试用")

    out = os.path.join(OUTPUT_DIR, "card_6_ondevice_ai.png")
    canvas.convert("RGB").save(out)
    print("  saved:", out)


def generate_card_7():
    """3:4 re-cut of the newer 16:9 X feedback card, keeping the 4 ask points."""
    print("Generating card_7_feedback ...")
    canvas = create_base_canvas()

    header_bottom = draw_header(
        canvas,
        "● 社区公测 · 独立开发公开记录",
        ["诚恳求测，", "欢迎不留情面地挑刺。"],
        ["7天全功能免费试用已上线，方便大家随时压力测试。"],
    )

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    f_item = find_font(29, "semibold")
    f_desc = find_font(22, "regular")

    items = [
        ("1. 跟拍灵敏度与响应", "遇到动态大招、快速位移或有遮挡时，AI 还能稳定跟住吗？"),
        ("2. 画面平滑度与运镜", "镜头自动跟随平移是否自然丝滑？会不会产生抖动或眩晕感？"),
        ("3. 发热与电池续航", "在岩馆或健身房连续录制 10~15 分钟，发热和掉电情况如何？"),
        ("4. 交互槽点与功能期待", "哪里用着最反人类？最希望在接下来的版本里加入什么新功能？"),
    ]

    y = header_bottom + 34
    for title, desc in items:
        lines = wrap(desc, f_desc, 860)
        rh = 60 + 32 * len(lines)
        draw_glass_card(draw, 70, y, 940, rh, radius=18)
        draw.rounded_rectangle([(86, y + 20), (92, y + 52)], radius=3, fill=GREEN_BAR)
        draw.text((110, y + 18), title, font=f_item, fill=INK)
        ty = y + 62
        for line in lines:
            draw.text((110, ty), line, font=f_desc, fill=BODY)
            ty += 32
        y += rh + 18

    panel_h = 138
    draw_glass_card(draw, 70, y, 940, panel_h, bg=(20, 48, 25, 180),
                    border=(149, 213, 178, 120), radius=22)
    draw.text((104, y + 26), "◆ 独立开发者的话", font=find_font(29, "semibold"), fill=AMBER)
    f_note = find_font(23, "medium")
    ty = y + 76
    for line in wrap("一个人的测试机型和场景都太有限。你的每一条挑刺都会直接决定下个版本先改什么。",
                     f_note, 875):
        draw.text((104, ty), line, font=f_note, fill=MINT_SOFT)
        ty += 36

    canvas.alpha_composite(overlay)
    draw_bottom_pill(canvas, "App Store 搜索 Movtrak · 评论区欢迎狠批")

    out = os.path.join(OUTPUT_DIR, "card_7_feedback.png")
    canvas.convert("RGB").save(out)
    print("  saved:", out)


def generate_card_8():
    """3:4 re-cut of the 1:1 X comparison card (传统拍摄 vs Movtrak 拍摄)."""
    print("Generating card_8_compare ...")
    canvas = create_base_canvas()

    header_bottom = draw_header(
        canvas,
        "● 独立开发最新上线 · 7天全功能免费试用",
        ["一个人拍运动视频，", "总是动两步就走出画框？"],
        ["我为 iPhone 做了一款端侧 AI 自动跟拍小工具。"],
    )

    # Left: phone mockup
    phone = extract_phone("app-human-body-track-1.png")
    pw = 400
    layer, pad = phone_with_shadow(phone, pw)
    phone_y = max(header_bottom + 30, 452)
    canvas.alpha_composite(layer, (48 - pad, phone_y - pad))

    # Right: two comparison panels
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    f_pt = find_font(26, "semibold")
    f_pd = find_font(20, "regular")

    rx, rw = 492, 518
    panels = [
        ("传统拍摄方式",
         "手机往地上一靠，爬两步就出画；手持云台笨重占包，还经常忘了充电。",
         (255, 107, 107, 255), "×"),
        ("Movtrak 拍摄方式",
         "手机静止摆放，端侧 AI 实时捕捉人体姿态，平滑运镜且自动居中构图。",
         (89, 228, 110, 255), "✓"),
    ]

    ry = phone_y
    for title, desc, accent, mark in panels:
        lines = wrap(desc.strip(), f_pd, rw - 92)
        ch = 64 + 31 * len(lines) + 20
        draw_glass_card(draw, rx, ry, rw, ch, radius=18)
        draw.rounded_rectangle([(rx + 16, ry + 24), (rx + 22, ry + 58)],
                               radius=3, fill=accent)
        draw.text((rx + 40, ry + 22), f"{mark} {title}", font=f_pt, fill=accent)
        ty = ry + 82
        for line in lines:
            draw.text((rx + 40, ty), line, font=f_pd, fill=BODY)
            ty += 31
        ry += ch + 20

    # Trial highlight panel fills the gap down to the phone's bottom edge
    phone_bottom = phone_y + int(round(pw / PHONE_RATIO))
    ph = max(140, phone_bottom - ry)
    draw_glass_card(draw, rx, ry, rw, ph, bg=(20, 48, 25, 180),
                    border=(149, 213, 178, 120), radius=20)
    f_trial_t = find_font(27, "semibold")
    f_note = find_font(22, "medium")
    trial_title = "★ 7天全功能免费试用"
    if text_w(trial_title, f_trial_t) > rw - 60:
        f_trial_t = find_font(24, "semibold")
    draw.text((rx + 30, ry + 24), trial_title, font=f_trial_t, fill=AMBER)
    ty = ry + 78
    for line in wrap("所有核心功能完整开放，无套路订阅陷阱。试用后一次性买断，不自动续费。",
                     f_note, rw - 60):
        draw.text((rx + 30, ty), line, font=f_note, fill=MINT_SOFT)
        ty += 34

    canvas.alpha_composite(overlay)
    draw_bottom_pill(canvas, "App Store 搜索 Movtrak · 免费试用 7 天")

    out = os.path.join(OUTPUT_DIR, "card_8_compare.png")
    canvas.convert("RGB").save(out)
    print("  saved:", out)


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    generate_card_6()
    generate_card_7()
    generate_card_8()
    print("done.")
