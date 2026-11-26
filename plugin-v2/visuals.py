"""Render the right-side visuals of the portfolio detail pages (874x418 CSS px, 2x PNG).

usage: python3 visuals.py OUT_DIR
Set CHROME to the browser binary (macOS: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome).
Every number here comes from portfolio-refactoring-stories.md.
"""
import os, pathlib, shutil, subprocess, sys

W, H = 874, 418
CSS = """
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/400.css');
*{box-sizing:border-box;margin:0;padding:0}
body{width:874px;height:418px;overflow:hidden;background:#fff;font-family:Pretendard,sans-serif;color:#0F172A;
 -webkit-font-smoothing:antialiased}
.wrap{position:absolute;inset:0;border:1px solid #E2E8F0;border-radius:12px;padding:22px 26px;background:#FAFCFF}
.t{font-size:13px;font-weight:600;color:#475569;letter-spacing:-.1px}
.s{font-size:11.5px;color:#64748B}
.or{color:#2563EB}.nv{color:#0F172A}.b{font-weight:700}
.mono{font-family:'JetBrains Mono',Menlo,monospace}
.card{background:#fff;border:1px solid #E2E8F0;border-radius:10px}
.tag{display:inline-block;font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px}
.tag.o{background:#EFF6FF;color:#1D4ED8}.tag.g{background:#F1F5F9;color:#475569}
"""


def page(body, center=False):
    flex = ' style="display:flex;flex-direction:column;justify-content:center"' if center else ""
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div class="wrap"{flex}>{body}</div></body></html>'


def bars(values, labels, maxv, hi, h=210, w=46, gap=26, fmt=str):
    out = []
    for i, (v, l) in enumerate(zip(values, labels)):
        bh = round(h * v / maxv)
        c = "#2563EB" if i in hi else "#CBD5E1"
        out.append(f'<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:{w}px;margin-right:{gap}px">'
                   f'<div style="font-size:13px;font-weight:700;margin-bottom:6px;color:{"#2563EB" if i in hi else "#334155"}">{fmt(v)}</div>'
                   f'<div style="width:{w}px;height:{bh}px;background:{c};border-radius:6px 6px 2px 2px"></div>'
                   f'<div class="s" style="margin-top:8px;white-space:nowrap">{l}</div></div>')
    return f'<div style="display:flex;align-items:flex-end;height:{h + 60}px">{"".join(out)}</div>'


def web_tests():
    chart = bars([188, 277, 338, 388, 456, 602], ["06.04", "2단계", "3단계", "4단계", "main", "PR"], 602, {5})
    gate = "".join(
        f'<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
        f'<div class="mono s" style="width:62px">{d}</div>'
        f'<div style="height:10px;width:{round(2.2 * (p - 50))}px;background:{c};border-radius:5px"></div>'
        f'<div class="b" style="font-size:14px;color:{c2}">{p}%</div></div>'
        for d, p, c, c2 in [("03.05", 70, "#CBD5E1", "#334155"), ("06.23", 83, "#93C5FD", "#1D4ED8"), ("07.11", 86, "#2563EB", "#2563EB")])
    return page(f'''
<div style="display:flex;gap:34px;height:100%">
 <div style="flex:1.35">
  <div class="t">테스트 수</div><div class="s" style="margin:4px 0 10px">README 단계표 · 2026-11-26 측정</div>
  {chart}
 </div>
 <div style="flex:1;display:flex;flex-direction:column">
  <div class="t">CI Line 통과 기준</div><div class="s" style="margin:4px 0 22px">build.gradle.kts의 JaCoCo minimum</div>
  {gate}
  <div class="card" style="margin-top:auto;padding:14px 16px">
   <div class="s">같은 측정 범위의 라인 커버리지</div>
   <div style="font-size:22px;font-weight:700;margin-top:6px">92.00% <span class="s" style="font-size:16px">→</span> <span class="or">97.13%</span></div>
   <div class="s" style="margin-top:6px">456 → 602개 · 제외 목록 축소 뒤 4,919줄 기준</div>
  </div>
 </div>
</div>''')


def ci():
    scale = 4.4  # px per second
    def seg(label, sec, color, txt="#0F172A", outside=False):
        inner = "" if outside else f"{label} · {sec}s"
        bar = (f'<div style="width:{round(sec * scale)}px;height:38px;background:{color};border-radius:6px;display:flex;align-items:center;'
               f'padding:0 10px;font-size:12px;font-weight:600;color:{txt};white-space:nowrap;margin-right:3px">{inner}</div>')
        return bar + (f'<span style="font-size:12px;font-weight:600;margin-left:8px;white-space:nowrap">{label} · {sec}s</span>' if outside else "")
    axis = "".join(f'<div class="s mono" style="position:absolute;left:{round(t * scale)}px;transform:translateX(-50%)">{t}s</div>' for t in range(0, 151, 30))
    ticks = "".join(f'<div style="position:absolute;left:{round(t * scale)}px;top:0;bottom:0;border-left:1px dashed #E2E8F0"></div>' for t in range(0, 151, 30))
    return page(f'''
<div class="t">CI 검증 시간 · 5회 중앙값</div><div class="s" style="margin:4px 0 18px">GitHub Actions run 28313842657 · 같은 검증 범위</div>
<div style="display:flex">
 <div style="width:110px;padding-top:6px">
  <div class="b" style="height:38px;line-height:38px">Before</div>
  <div style="height:30px"></div>
  <div class="b or" style="height:38px;line-height:38px">After</div>
  <div style="height:44px;"></div>
 </div>
 <div style="position:relative;flex:1">
  {ticks}
  <div style="position:relative;padding-top:6px">
   <div style="display:flex;align-items:center">{seg("test", 121, "#CBD5E1")}{seg("perf", 22, "#E2E8F0")}<span class="b" style="margin-left:10px">140s</span></div>
   <div class="s" style="height:30px;line-height:30px">job 하나에서 테스트 → JaCoCo → k6 설치 → 스크립트 검사를 차례로</div>
   <div style="display:flex;align-items:center">{seg("backend-test", 109, "#2563EB", "#fff")}<span class="b or" style="margin-left:10px">109s</span></div>
   <div style="display:flex;align-items:center;margin-top:6px">{seg("performance-assets", 20, "#93C5FD", outside=True)}</div>
  </div>
  <div style="position:relative;height:22px;margin-top:18px">{axis}</div>
 </div>
</div>
<div style="display:flex;gap:10px;margin-top:20px">
 <span class="tag g">after = 두 job 중 긴 쪽(critical path)</span><span class="tag g">Build JAR 52→63s는 제외</span><span class="tag o">-22.1%</span>
</div>''')


def gateway():
    rows = [("PermitAll", "12 / 30", ["204", "204", "204", "204", "204"]),
            ("USER 이상", "11 / 28", ["401", "403", "204", "204", "204"]),
            ("ORGANIZER 이상", "9 / 37", ["401", "403", "403", "204", "204"]),
            ("ADMIN", "5 / 10", ["401", "403", "403", "403", "204"])]
    def cell(v):
        c = {"204": ("#EFF6FF", "#1D4ED8"), "401": ("#F1F5F9", "#475569"), "403": ("#F1F5F9", "#475569")}[v]
        return f'<td><span class="mono" style="display:inline-block;width:52px;text-align:center;padding:5px 0;border-radius:6px;background:{c[0]};color:{c[1]};font-size:12.5px;font-weight:600">{v}</span></td>'
    body = "".join(f'<tr><td class="b" style="font-size:13px">{n}</td><td class="s mono">{rp}</td>{"".join(cell(v) for v in vs)}</tr>' for n, rp, vs in rows)
    chips = "".join(f'<div class="card" style="padding:10px 12px;margin-bottom:8px;display:flex;justify-content:space-between"><span style="font-size:13px">{n}</span><span class="b mono">{v}</span></div>'
                    for n, v in [("Auth", 56), ("Post", 44), ("Report", 21), ("Online Judge", 20)])
    return page(f'''
<style>table{{border-collapse:separate;border-spacing:0 9px;width:100%}} td{{padding:0 6px}} th{{font-size:11.5px;color:#64748B;font-weight:500;text-align:left;padding:0 6px}}</style>
<div style="display:flex;gap:30px">
 <div style="width:200px">
  <div class="t">route 141개</div><div class="s" style="margin:4px 0 14px">서비스별 개수를 테스트에 고정</div>
  {chips}
  <div class="s" style="margin-top:6px">method 명시 118 · 미명시 23</div>
 </div>
 <div style="flex:1">
  <div class="t">접근 경로 105개 · 주체별 기대 응답</div><div class="s" style="margin:4px 0 6px">실제 WebFilterChainProxy 판정과 비교 · 역할 없는 scope 토큰 포함 5주체</div>
  <table><tr><th>정책</th><th>rule / path</th><th>익명</th><th>scope만</th><th>USER</th><th>ORGANIZER</th><th>ADMIN</th></tr>{body}</table>
  <div class="s" style="margin-top:6px">path 합계 30 + 28 + 37 + 10 = 105 · ordered rule 38개</div>
 </div>
</div>''', center=True)


def retry():
    def row(fail_on, picked, note, accent):
        boxes = ""
        for i in range(1, 6):
            failed = i == 2
            sel = i in picked
            bg = "#EFF6FF" if sel else "#fff"
            bd = "#2563EB" if sel else ("#94A3B8" if failed else "#E2E8F0")
            boxes += (f'<div style="width:62px;height:62px;border:2px {"dashed" if failed and not sel else "solid"} {bd};border-radius:10px;background:{bg};'
                      f'display:flex;flex-direction:column;align-items:center;justify-content:center;margin-right:10px">'
                      f'<div class="b mono" style="font-size:16px">{i}</div><div class="s" style="font-size:10.5px">{"실패" if failed else "성공"}</div></div>')
        return boxes
    return page(f'''
<div class="t">1~5번 중 2번만 실패한 작업을 재시도할 때</div>
<div class="s" style="margin:4px 0 16px">status=COMPLETED · processed=5 · success=4 · fail=1 · checkpoint=5</div>
<div style="display:flex;align-items:center;margin-bottom:8px">
 <div style="width:70px" class="b">Before</div>{row(True, set(), "", False)}
 <div style="margin-left:8px"><div class="s">checkpoint 다음 범위만 선택</div><div class="b" style="font-size:15px;margin-top:4px">대상 0건 → 2번 누락</div></div>
</div>
<div style="display:flex;align-items:center;margin:14px 0 18px">
 <div style="width:70px" class="b or">After</div>{row(True, {2}, "", True)}
 <div style="margin-left:8px"><div class="s">실패 원장의 ID만 선택</div><div class="b or" style="font-size:15px;margin-top:4px">2번만 다시 수집</div></div>
</div>
<div class="card mono" style="padding:12px 16px;font-size:12px;line-height:1.75;color:#334155">
 <span class="s mono">SADD</span> problem:job:failures:{{jobId}} 2 &nbsp;<span class="s">← 상태 비교·SADD·TTL을 Lua 한 번에</span><br>
 <span class="s mono">SET</span>&nbsp; problem:job:targets:{{jobId}} [대상 목록] &nbsp;<span class="s">← 작업 상태에 SHA-256 보관</span>
</div>''', center=True)


def nplus1():
    groups = [(1, 2, 2), (5, 6, 2), (10, 11, 2)]
    unit = 17
    g = ""
    for ps, b, a in groups:
        g += (f'<div style="display:flex;flex-direction:column;align-items:center;margin-right:46px">'
              f'<div style="display:flex;align-items:flex-end;gap:10px;height:210px">'
              f'<div style="display:flex;flex-direction:column;align-items:center"><div class="b" style="font-size:13px;color:#334155;margin-bottom:5px">{b}</div><div style="width:46px;height:{b * unit}px;background:#CBD5E1;border-radius:6px 6px 2px 2px"></div></div>'
              f'<div style="display:flex;flex-direction:column;align-items:center"><div class="b or" style="font-size:13px;margin-bottom:5px">{a}</div><div style="width:46px;height:{a * unit}px;background:#2563EB;border-radius:6px 6px 2px 2px"></div></div>'
              f'</div><div class="s" style="margin-top:8px">페이지 {ps}명</div></div>')
    return page(f'''
<div style="display:flex;gap:30px">
 <div>
  <div class="t">MongoDB read command 수</div><div class="s" style="margin:4px 0 14px">driver CommandListener로 find·aggregate를 모두 집계</div>
  <div style="display:flex;align-items:flex-end">{g}</div>
  <div style="display:flex;gap:16px;margin-top:12px" class="s"><span><span style="display:inline-block;width:10px;height:10px;background:#CBD5E1;border-radius:2px"></span> Before (find 1 + 회원 수)</span><span><span style="display:inline-block;width:10px;height:10px;background:#2563EB;border-radius:2px"></span> After (find 1 + aggregate 1)</span></div>
 </div>
 <div class="card" style="flex:1;padding:16px 18px;align-self:flex-start;margin-top:40px">
  <div class="s" style="margin-bottom:8px">회원 ID를 모아 한 번에 집계</div>
  <div class="mono" style="font-size:11.5px;line-height:1.8;color:#334155">match(studentId <span class="or">in</span> ids)<br>group(studentId).count()<br>project(retrospectiveCount)</div>
  <div class="s" style="margin-top:12px;line-height:1.6">조건: 회원 12명 · 회원별 회고 1건 · mongo 7.0.16<br>읽기 명령 수 기준이며 지연 개선율이 아닙니다.</div>
 </div>
</div>''')


def split():
    parts = [("TargetCollector", 469), ("RetryPlanner", 462), ("WorkerLeaseCoordinator", 404), ("StateStore", 285), ("RedisScripts", 231),
             ("Targets", 223), ("Launcher", 210), ("Queries", 162), ("ManifestValidator", 159), ("ExecutionRunner", 101),
             ("StatusCalculator", 65), ("AuditLogger", 59), ("RedisKeys", 42), ("JobWorkerContext", 16)]
    rows = "".join(f'<div style="display:flex;align-items:center;height:19px"><div class="mono" style="width:178px;font-size:11px;color:#334155">{n}</div>'
                   f'<div style="height:9px;width:{round(n2 * 0.36)}px;background:#93C5FD;border-radius:4px"></div><div class="mono s" style="margin-left:6px;font-size:10.5px">{n2}</div></div>'
                   for n, n2 in parts)
    return page(f'''
<div style="display:flex;gap:26px;height:100%">
 <div style="width:250px;display:flex;flex-direction:column">
  <div class="t">분리 전</div><div class="s" style="margin:4px 0 12px">ProblemCollectorService.kt</div>
  <div style="flex:1;max-height:250px;border-radius:10px;background:#CBD5E1;display:flex;flex-direction:column;justify-content:center;align-items:center">
   <div class="b" style="font-size:30px">2,754줄</div><div class="s" style="margin-top:6px;color:#475569">상태 저장 · Lua CAS · manifest · lease<br>실행 루프 · 재시도 선택 · 메트릭</div>
  </div>
  <div class="card" style="margin-top:12px;padding:10px 12px;font-size:11.5px;color:#334155;line-height:1.6">먼저 고정한 계약<br><span class="mono s">Lua 6개 SHA1 · 키 접두사 · TTL&nbsp;86400</span></div>
 </div>
 <div style="flex:1">
  <div class="t">분리 후</div><div class="s" style="margin:4px 0 12px">파사드 + 새 파일 14개 (협력 클래스 13 · 컨텍스트 1)</div>
  <div style="display:flex;align-items:center;height:26px;margin-bottom:6px"><div class="mono b" style="width:178px;font-size:12px">ProblemCollectorService</div>
   <div style="height:12px;width:{round(330 * 0.36)}px;background:#2563EB;border-radius:4px"></div><div class="mono b or" style="margin-left:6px;font-size:12px">330</div></div>
  {rows}
  <div class="s" style="margin-top:8px">합계 3,218줄. 줄 수를 줄이려는 작업이 아니라 변경 이유별로 나눈 작업입니다.</div>
 </div>
</div>''')


VISUALS = {"web-tests": web_tests, "web-ci": ci, "gateway-policy": gateway, "didim-retry": retry, "didim-nplus1": nplus1, "didim-split": split}


def render(out):
    chrome = os.environ.get("CHROME") or shutil.which("google-chrome") or shutil.which("chromium") or "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"
    out.mkdir(parents=True, exist_ok=True)
    for name, fn in VISUALS.items():
        src = out / f"_{name}.html"
        src.write_text(fn(), encoding="utf-8")
        subprocess.run([chrome, "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu", f"--window-size={W},{H}",
                        "--force-device-scale-factor=2", "--virtual-time-budget=5000", f"--screenshot={(out / f'{name}.png').resolve()}",
                        src.resolve().as_uri()], check=True, capture_output=True)
        src.unlink()
        print("rendered", name)


if __name__ == "__main__":
    render(pathlib.Path(sys.argv[1]))
