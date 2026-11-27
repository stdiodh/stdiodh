"""Assemble code.js = lib + resume + resume_v4 + pages_data + pages + IMAGES + runner.

usage: python3 build_plugin.py IMAGES_DIR   (hand-drawn PNGs from p3/sketch/out plus arch-blue.png, didim-intro.png)
"""
import base64, json, pathlib, sys

HERE = pathlib.Path(__file__).parent
NAMES = ["arch", "cover", "ev", "batch", "gw", "bot", "tests", "didim-intro", "didim-collect", "didim-admin", "didim-split", "soloplay"]
RUNNER = """
(async () => {
  try {
    const pages = figma.root.children.map(p=>p.id);
    if (pages.includes('375:4')) {
      const r = await applyResumeV4();
      figma.closePlugin('완료: ' + r.done.length + '개 수정 · ' + r.report.join(' · '));
      return;
    }
    if (!pages.includes('144:2')) throw new Error('이 파일은 대상이 아닙니다');
    if (!Object.keys(IMAGES).length) throw new Error('이번 빌드는 이력서용입니다. 포트폴리오는 다음 빌드로 실행해 주세요');
    const done = await applyPortfolio();
    figma.closePlugin('완료: ' + done.length + '개 수정');
  } catch (e) {
    figma.closePlugin('실패: ' + (e && e.message ? e.message : String(e)));
  }
})();
"""

def main(img_dir):
    imgs = {n: base64.b64encode((pathlib.Path(img_dir) / f"{n}.png").read_bytes()).decode() for n in NAMES} if img_dir else {}
    parts = [(HERE / f).read_text(encoding="utf-8").rstrip() for f in ["lib.js", "resume.js", "resume_v4.js", "pages_data.js", "pages.js"]]
    parts.append("const IMAGES = " + json.dumps(imgs) + ";")
    (HERE / "code.js").write_text("\n".join(parts) + "\n" + RUNNER, encoding="utf-8")
    print("code.js", (HERE / "code.js").stat().st_size, "bytes")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
