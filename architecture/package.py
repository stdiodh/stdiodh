"""Assemble one repo's architecture/ folder from shared official logos.

usage: python3 package.py <spec> <doc.md> <logos_dir> <out_dir>
  logos_dir holds the downloaded official files plus SOURCES.json:
    [{"key": "mongodb", "file": "mongodb.svg", "page": "...", "url": "...", "checked": "2026-11-26"}, ...]
  Copies only the logos this spec uses into out_dir/assets/logos/, renders the SVG/PNG,
  writes out_dir/architecture.md with the logo source table (SHA-256 computed here).
"""
import hashlib, json, pathlib, shutil, subprocess, sys

spec_path, doc_path, logos_dir, out_dir = map(pathlib.Path, sys.argv[1:5])
ns = {}
exec(spec_path.read_text(encoding="utf-8"), ns)
keys = []
for item in ns["GROUPS"] + ns["NODES"]:
    k = item.get("logo")
    if k and k not in keys:
        keys.append(k)

sources = {s["key"]: s for s in json.loads((logos_dir / "SOURCES.json").read_text(encoding="utf-8"))}
missing = [k for k in keys if k not in sources]
if missing:
    raise SystemExit(f"no official source recorded for: {missing}")

dest = out_dir / "assets" / "logos"
dest.mkdir(parents=True, exist_ok=True)
rows = ["| 기술·제품 | 사용 파일 | 공식 출처 페이지 | 실제 다운로드 URL·패키지 내 경로 | 확인일 | 원본 SHA-256 |",
        "| --- | --- | --- | --- | --- | --- |"]
for k in keys:
    s = sources[k]
    src = logos_dir / s["file"]
    ext = src.suffix
    shutil.copyfile(src, dest / f"{k}{ext}")
    digest = hashlib.sha256(src.read_bytes()).hexdigest()
    rows.append(f"| {s.get('product', k)} | `assets/logos/{k}{ext}` | {s['page']} | {s['url']} | {s['checked']} | `{digest}` |")

subprocess.run([sys.executable, str(pathlib.Path(__file__).with_name("build.py")), str(spec_path), str(out_dir)], check=True)
doc = doc_path.read_text(encoding="utf-8").replace("<!-- LOGO_TABLE -->", "\n".join(rows))
(out_dir / "architecture.md").write_text(doc, encoding="utf-8")
print("ok", out_dir, keys)
