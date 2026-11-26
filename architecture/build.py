"""Assemble architecture.svg / architecture.png from a spec module.

usage: python3 build.py specs/didim.py OUT_DIR [--preview]
  - logos are read from OUT_DIR/assets/logos/<key>.svg|png and embedded as data URIs
  - --preview draws a dashed placeholder for missing logos; without it a missing logo is an error
"""
import base64, html, importlib.util, pathlib, sys

FONT_CSS = ("@import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');"
            "@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');")
HAND = "Gaegu, 'Nanum Pen Script', cursive"
SANS = "Pretendard, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
INK = "#1f2328"
BLUE = "#1f6feb"
STYLES = {
    "sync": dict(dash=None, label="동기 요청·데이터 접근"),
    "async": dict(dash="10 7", label="비동기 메시지"),
    "deploy": dict(dash=None, label="빌드·배포 단계"),
    "presign": dict(dash="3 6", label="Presigned URL로 직접 접근"),
}


def esc(s):
    return html.escape(str(s), quote=True)


def load_spec(path):
    spec = importlib.util.spec_from_file_location("spec", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def logo_uri(out, key, preview):
    for ext, mime in ((".svg", "image/svg+xml"), (".png", "image/png")):
        p = out / "assets" / "logos" / f"{key}{ext}"
        if p.exists():
            return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()
    if preview:
        return None
    raise SystemExit(f"missing logo: assets/logos/{key}.svg|png")


def text(x, y, s, size, *, font=SANS, weight=400, fill=INK, anchor="start"):
    lines = s.split("\n")
    out = []
    for i, line in enumerate(lines):
        out.append(f'<text x="{x}" y="{y + i * size * 1.3:.1f}" font-family="{esc(font)}" font-size="{size}" '
                   f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{esc(line)}</text>')
    return "\n".join(out)


def users_icon(x, y):
    # generic people glyph (concept, not a product logo)
    return (f'<g fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round">'
            f'<circle cx="{x+22}" cy="{y+16}" r="11"/><path d="M{x+2} {y+58} q20 -36 40 0"/>'
            f'<circle cx="{x+50}" cy="{y+10}" r="10"/><path d="M{x+34} {y+30} q16 -10 34 22"/></g>')


def build(spec_path, out_dir, preview):
    s = load_spec(spec_path)
    out = pathlib.Path(out_dir)
    W, H = getattr(s, "SIZE", (1920, 1080))
    rough, crisp = [], []

    for g in s.GROUPS:
        dash = ' stroke-dasharray="12 8"' if g.get("dashed") else ""
        fill = g.get("fill", "none")
        rough.append(f'<rect x="{g["x"]}" y="{g["y"]}" width="{g["w"]}" height="{g["h"]}" rx="22" fill="{fill}" '
                     f'stroke="{g.get("color", INK)}" stroke-width="{g.get("sw", 2.4)}"{dash}/>')
        lx = g["x"] + 22
        if g.get("logo"):
            uri = logo_uri(out, g["logo"], preview)
            crisp.append(img(uri, g["x"] + 18, g["y"] + 14, 44, 44, g["logo"]))
            lx = g["x"] + 74
        crisp.append(text(lx, g["y"] + 46, g["label"], g.get("size", 28), font=HAND, weight=700, fill=g.get("color", INK)))

    for e in s.EDGES:
        st = STYLES[e.get("style", "sync")]
        pts = " ".join(f"{x},{y}" for x, y in e["pts"])
        dash = f' stroke-dasharray="{st["dash"]}"' if st["dash"] else ""
        sw = 3 if e.get("style") == "deploy" else 2.2
        color = e.get("color", BLUE if e.get("style") == "deploy" else INK)
        rough.append(f'<polyline points="{pts}" fill="none" stroke="{color}" stroke-width="{sw}"'
                     f'{dash} stroke-linejoin="round"' + ('' if e.get("arrow") is False else f' marker-end="url(#arrow-{"b" if color == BLUE else "k"})"') + '/>')
        if e.get("label"):
            lx, ly = e.get("at", e["pts"][0])
            crisp.append(f'<rect x="{lx-4}" y="{ly-21}" width="{len(e["label"])*11+10}" height="28" fill="#fff" opacity=".92"/>'
                         if e.get("bg") else "")
            crisp.append(text(lx, ly, e["label"], e.get("size", 19), weight=500, fill=color))

    for n in s.NODES:
        x, y, w, h = n["x"], n["y"], n["w"], n["h"]
        if not n.get("bare"):
            rough.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
        tx = x + 20
        if n.get("logo"):
            ls = n.get("logo_size", 48)
            uri = logo_uri(out, n["logo"], preview)
            crisp.append(img(uri, x + 16, y + (h - ls) / 2 if not n.get("logo_top") else y + 14, ls, ls, n["logo"]))
            tx = x + 16 + ls + 14
        if n.get("icon") == "users":
            crisp.append(users_icon(x + w / 2 - 34, y + 6))
            crisp.append(text(x + w / 2, y + h - 8, n["title"], 24, weight=600, anchor="middle"))
            continue
        lines = 1 + (1 if n.get("sub") else 0)
        ty = y + h / 2 - (lines - 1) * 13 + 8
        crisp.append(text(tx, ty, n["title"], n.get("size", 25), weight=700))
        if n.get("sub"):
            crisp.append(text(tx, ty + 30, n["sub"], 18, weight=400, fill="#57606a"))
        if n.get("repo"):
            crisp.append(text(x + w / 2, y + h + 26, n["repo"], 17, weight=600, fill=BLUE, anchor="middle"))

    crisp.append(text(56, 84, s.TITLE, 50, font=HAND, weight=700))
    crisp.append(text(58, 140, "Overview", 30, font=HAND, weight=700, fill=BLUE))
    crisp.append(text(58, 178, "\n".join(s.OVERVIEW), 19, weight=400))
    crisp.append(text(W - 40, H - 22, s.BASIS, 14, weight=400, fill="#6e7781", anchor="end"))

    # legend: only styles that appear in this drawing
    used = []
    for e in s.EDGES:
        if e.get("style", "sync") not in used:
            used.append(e.get("style", "sync"))
    lx, ly = s.LEGEND_AT
    items = [(STYLES[k]["dash"], STYLES[k]["label"], 3 if k == "deploy" else 2.2, BLUE if k == "deploy" else INK) for k in used]
    if any(g.get("dashed") for g in s.GROUPS):
        items.append(("box", "논리 그룹·실행 경계", 2, INK))
    lh = 30 * len(items) + 50
    rough.append(f'<rect x="{lx}" y="{ly}" width="300" height="{lh}" rx="12" fill="#fff" stroke="#8c959f" stroke-width="1.6"/>')
    crisp.append(text(lx + 18, ly + 32, "Legend", 22, font=HAND, weight=700))
    for i, (dash, label, sw, col) in enumerate(items):
        yy = ly + 62 + i * 30
        if dash == "box":
            crisp.append(f'<rect x="{lx+18}" y="{yy-12}" width="52" height="18" rx="5" fill="none" stroke="{INK}" stroke-width="1.8" stroke-dasharray="8 5"/>')
        else:
            d = f' stroke-dasharray="{dash}"' if dash else ""
            crisp.append(f'<line x1="{lx+18}" y1="{yy-3}" x2="{lx+64}" y2="{yy-3}" stroke="{col}" stroke-width="{sw}"{d} marker-end="url(#arrow-{'b' if col == BLUE else 'k'})"/>')
        crisp.append(text(lx + 84, yy + 3, label, 16))

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<style>{FONT_CSS}</style>
<defs>
  <filter id="rough" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4"/>
  </filter>
  <marker id="arrow-k" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>
  </marker>
  <marker id="arrow-b" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="{BLUE}" stroke-width="1.8" stroke-linecap="round"/>
  </marker>
</defs>
<rect width="{W}" height="{H}" fill="#ffffff"/>
<g filter="url(#rough)">
{chr(10).join(rough)}
</g>
{chr(10).join(c for c in crisp if c)}
</svg>
'''
    (out / "architecture.svg").write_text(svg, encoding="utf-8")
    render(out, W, H)


def img(uri, x, y, w, h, key):
    if uri is None:
        return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#f6f8fa" stroke="#d1242f" stroke-dasharray="4 3"/>'
                f'<text x="{x+w/2}" y="{y+h/2+4}" font-size="10" text-anchor="middle" fill="#d1242f" font-family="sans-serif">{esc(key)}</text>')
    return f'<image href="{uri}" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet"/>'


def render(out, W, H):
    """Render with headless Chrome. Set CHROME to the browser binary (macOS: Google Chrome.app/Contents/MacOS/Google Chrome)."""
    import os, shutil, subprocess
    chrome = os.environ.get("CHROME") or shutil.which("google-chrome") or shutil.which("chromium") or "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"
    page = out / "_render.html"
    page.write_text('<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#fff">'
                    + (out / "architecture.svg").read_text(encoding="utf-8") + "</body></html>", encoding="utf-8")
    subprocess.run([chrome, "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
                    f"--window-size={W},{H}", "--force-device-scale-factor=2", "--virtual-time-budget=4000",
                    f"--screenshot={(out / 'architecture.png').resolve()}", page.resolve().as_uri()],
                   check=True, capture_output=True)
    page.unlink()


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2], "--preview" in sys.argv)
