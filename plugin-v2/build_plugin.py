"""Assemble code.js = lib + resume + resume_v4 + pages_data + pages + IMAGES + runner.

usage: python3 build_plugin.py IMAGES_DIR   (hand-drawn PNGs from p3/sketch/out plus arch-blue.png, didim-intro.png)
"""
import base64, json, pathlib, sys

HERE = pathlib.Path(__file__).parent
NAMES = ["arch", "ev", "batch", "gw", "bot", "tests", "didim-intro", "didim-collect", "didim-admin", "didim-split", "soloplay", "gozzi", "invest"]
RUNNER = """
(async () => {
  try {
    const pages = figma.root.children.map(p=>p.id);
    if (pages.includes('375:4')) {
      // resume_v4 is edited by hand now: never rebuild it if it exists, only add Problem Solving
      const p = figma.root.children.find(x => x.id === '375:4'); await p.loadAsync();
      let msg = '';
      if (!p.children.some(c => c.name === V4.p1)) { const r = await applyResumeV4(); msg = r.done.length + '개 수정 · '; }
      const rep = await applyProblemSolving();
      figma.closePlugin('완료: ' + msg + 'Problem Solving 추가 · ' + rep);
      return;
    }
    if (!pages.includes('144:2')) throw new Error('이 파일은 대상이 아닙니다');
    if (!Object.keys(IMAGES).length) throw new Error('이번 빌드는 이력서용입니다. 포트폴리오는 다음 빌드로 실행해 주세요');
    // portfolio is already built: change only the cover line so hand edits stay
    const pg = figma.root.children.find(x => x.id === '144:2'); await pg.loadAsync();
    if (pg.children.some(c => c.name === COMBINED)) { figma.closePlugin('완료: ' + await applyNumFix()); return; }
    const done = await applyPortfolio();
    figma.closePlugin('완료: ' + done.length + '개 수정');
  } catch (e) {
    figma.closePlugin('실패: ' + (e && e.message ? e.message : String(e)));
  }
})();
"""

def main(img_dir):
    imgs = {n: base64.b64encode((pathlib.Path(img_dir) / f"{n}.png").read_bytes()).decode() for n in NAMES} if img_dir else {}
    parts = [(HERE / f).read_text(encoding="utf-8").rstrip() for f in ["lib.js", "resume.js", "resume_v4.js", "resume_ps.js", "pages_data.js", "pages.js", "numfix.js"]]
    parts.append("const IMAGES = " + json.dumps(imgs) + ";")
    (HERE / "code.js").write_text("\n".join(parts) + "\n" + RUNNER, encoding="utf-8")
    print("code.js", (HERE / "code.js").stat().st_size, "bytes")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
