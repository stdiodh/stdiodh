"""Process visuals for the portfolio detail pages, v2: problem -> refactoring -> numbers -> stability.

usage: python3 visuals2.py OUT_DIR
Every number comes from repository docs, PR descriptions or the 2026-11-26 measurement files
(see portfolio-refactoring-stories.md and the evidence notes in each function).
"""
import os, pathlib, shutil, subprocess, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from visuals import W, H, page, split  # noqa: E402

BLUE, GRAY, LIGHT = "#2563EB", "#CBD5E1", "#93C5FD"


def kpi(label, before, after, sub=""):
    return (f'<div class="card" style="flex:1;padding:12px 16px"><div class="s">{label}</div>'
            f'<div style="font-size:22px;font-weight:700;margin-top:4px">{before} <span class="s" style="font-size:16px">→</span> <span class="or">{after}</span></div>'
            + (f'<div class="s" style="margin-top:4px">{sub}</div>' if sub else "") + '</div>')


def bugs():
    # PR bodies: Gateway #3 (aa9750e fail 3 → dbfadfa), Tiki-Taka #14 (beba212 → 5d4027c), didim #119 (8093ab5 fail 3 → 96931c8)
    # final2-test-coverage.json / RESULTS.md: JVM 1,618 + Go 244 = 1,862 → JVM 2,169 + Go 244 = 2,413, line 78.01 → 89.95%
    cards = [
        ("A&I Gateway", "로그에 비밀번호 원문", "currentPassword·newPassword 키를 가리지 못함", ("aa9750e", "실패 테스트 3건"), ("dbfadfa", "키 이름에 포함되면 마스킹"), "PR #3"),
        ("고찌봄", "보호자 그룹 403 고착", "주보호자 제거 뒤 is_primary가 남아 설정 변경 불가", ("beba212", "실패 테스트 확인"), ("5d4027c", "먼저 합류한 OWNER에게 이관"), "PR #14"),
        ("디딤로그", "solved.ac 장애 = 로그인 실패", "프로필 동기화 예외가 로그인까지 막음", ("8093ab5", "실패 테스트 3건"), ("96931c8", "동기화만 건너뛰고 로그인 유지"), "PR #119"),
    ]
    html = "".join(
        f'<div class="card" style="flex:1;padding:14px 14px 12px;display:flex;flex-direction:column">'
        f'<span class="tag g" style="align-self:flex-start">{p}</span>'
        f'<div class="b" style="font-size:15px;margin-top:10px">{t}</div><div class="s" style="margin-top:4px;line-height:1.5;min-height:34px">{d}</div>'
        f'<div style="margin-top:auto;padding-top:10px;border-top:1px solid #E2E8F0;font-size:11.5px;line-height:1.9">'
        f'<div style="color:#475569">✕ <span class="mono">{f[0]}</span> {f[1]}</div><div class="or">✓ <span class="mono">{x[0]}</span> {x[1]}</div></div>'
        f'<div class="s mono" style="margin-top:6px">{pr}</div></div>' for p, t, d, f, x, pr in cards)
    return page(f'''
<div style="display:flex;gap:12px;margin-bottom:14px">
 {kpi("라인 커버리지 · 5개 저장소, 같은 측정 방식", "78.01%", "89.95%")}
 {kpi("자동화 테스트 · JVM + Go", "1,862개", "2,413개")}
</div>
<div class="t" style="margin-bottom:8px">실패하는 테스트를 먼저 커밋하고, 다음 커밋에서 고친 버그</div>
<div style="display:flex;gap:12px">{html}</div>''', center=True)


def batch():
    # RESULTS.md (B), 2026-11-26-assignment-list-scale-before-after.md@e2b4c91: 2 min × 3 runs, median
    def pbar(label, b, a, unit="ms", scale=1.6):
        return (f'<div style="margin-bottom:16px"><div class="s" style="margin-bottom:6px">{label}</div>'
                f'<div style="display:flex;align-items:center;margin-bottom:5px"><div style="width:{round(b * scale)}px;height:20px;background:{GRAY};border-radius:4px"></div><span class="b" style="margin-left:8px;font-size:13px;color:#334155">{b} {unit}</span></div>'
                f'<div style="display:flex;align-items:center"><div style="width:{round(a * scale)}px;height:20px;background:{BLUE};border-radius:4px"></div><span class="b or" style="margin-left:8px;font-size:13px">{a} {unit}</span></div></div>')
    def tbar(label, v, dropped, color, ok):
        w = round(v * 6.4)
        return (f'<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between"><span class="b" style="font-size:13px">{label}</span>'
                f'<span class="s">dropped {dropped}</span></div>'
                f'<div style="position:relative;height:24px;margin-top:6px;background:#F1F5F9;border-radius:5px">'
                f'<div style="width:{w}px;height:24px;background:{color};border-radius:5px"></div>'
                f'<div style="position:absolute;left:{round(50 * 6.4)}px;top:-4px;bottom:-4px;border-left:2px dashed #0F172A"></div></div>'
                f'<div class="b {"or" if ok else ""}" style="font-size:13px;margin-top:4px;{"" if ok else "color:#334155"}">{v} req/s</div></div>')
    return page(f'''
<div style="display:flex;gap:30px">
 <div style="flex:1">
  <div class="t">목록 조회 P95 · 변경 전 서버가 버티는 부하</div><div class="s" style="margin:4px 0 14px">9b678b6 → 642cfd3 · 2분×3회 중앙값 · 실패·drop 0</div>
  {pbar("과제 1,000개 · 5 RPS", 187.5, 128.4)}
  {pbar("과제 300개 · 15 RPS", 79.0, 47.8)}
  <div class="s">1,000개 조건은 3회 범위가 겹치지 않음 (183.7~201.7 / 127.8~128.5)</div>
 </div>
 <div style="width:340px">
  <div class="t">목표 50 RPS · 과제 1,000개</div><div class="s" style="margin:4px 0 14px">점선이 목표 부하</div>
  {tbar("Before", 8.6, "4,833 · timeout 1", GRAY, False)}
  {tbar("After", 49.94, "0", BLUE, True)}
  <div class="card" style="padding:10px 12px;font-size:12px;line-height:1.6;color:#334155">변경 전은 목표 부하를 유지하지 못해 판정에서 무효,<br>변경 후는 3회 모두 49.93~49.95 req/s로 유지</div>
 </div>
</div>''')


def web_steps():
    # README 단계표, docs/MEASUREMENT.md, docs/refactoring/2026-07-stable-refactoring.md (d4cd644), final2-test-coverage.json
    pts = [("초기<br>06.04", 188, "78.07"), ("리팩터링<br>기준선", 277, "85.04"), ("명령<br>서비스 분리", 306, "85.67"), ("조회<br>서비스 분리", 372, ""),
           ("삭제<br>순차화", 388, "88.87"), ("계층<br>경계 정리", 456, "92.00"), ("빈 분기<br>보강", 602, "97.13")]
    h, maxv = 190, 602
    cols = "".join(
        f'<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:74px">'
        f'<div class="s mono" style="font-size:10.5px;margin-bottom:2px">{("L " + c + "%") if c else "&nbsp;"}</div>'
        f'<div class="b" style="font-size:13px;margin-bottom:5px;color:{BLUE if i == len(pts) - 1 else "#334155"}">{v}</div>'
        f'<div style="width:40px;height:{round(h * v / maxv)}px;background:{BLUE if i == len(pts) - 1 else GRAY};border-radius:5px 5px 2px 2px"></div>'
        f'<div class="s" style="margin-top:7px;font-size:11px;text-align:center;line-height:1.3;height:30px;white-space:nowrap">{n}</div></div>'
        for i, (n, v, c) in enumerate(pts))
    side = "".join(f'<div class="card" style="padding:10px 12px;margin-bottom:8px"><div class="s">{a}</div><div class="b" style="font-size:16px;margin-top:3px">{b} <span class="s">→</span> <span class="or">{c}</span></div></div>'
                   for a, b, c in [("CourseCommandService", "749줄", "185줄"), ("CourseQueryService", "508줄", "285줄"), ("CI 검증 시간 · 5회 중앙값", "140초", "109초")])
    return page(f'''
<div style="display:flex;gap:22px">
 <div style="flex:1">
  <div class="t">단계마다 전체 테스트와 JaCoCo gate를 통과한 뒤 다음 단계로</div>
  <div class="s" style="margin:4px 0 8px">테스트 수 · L = 라인 커버리지 · 188~306개 시점은 측정 범위를 넓히기 전 값</div>
  <div style="display:flex;align-items:flex-end;height:270px">{cols}</div>
  <div class="s" style="margin-top:10px">CI Line 기준 70% → 83% (06.23) → 86% (07.11)</div>
 </div>
 <div style="width:210px;padding-top:30px">{side}</div>
</div>''')


def gateway_steps():
    # docs/REFACTORING_PLAN.md@63a9240 stage 4, PR #2 (@Test 190 → 274; final 282), PR #3
    steps = [("4A", "route 141개 고정"), ("4B-1", "Auth catalog 시험"), ("4B-2a", "판정 로직 추출"),
             ("4B-2d-a", "전역 catalog 시험"), ("4B-2d-b", "운영 코드로 전환"), ("4B-2d-c", "중복 matcher 13개 제거")]
    flow = "".join(
        f'<div style="flex:1;display:flex;flex-direction:column;align-items:center">'
        f'<div class="mono b" style="font-size:11.5px;padding:5px 0;width:92%;text-align:center;border-radius:6px;'
        f'background:{"#EFF6FF" if i == 4 else "#F1F5F9"};color:{BLUE if i == 4 else "#334155"}">{k}</div>'
        f'<div class="s" style="font-size:11px;margin-top:5px;text-align:center">{t}</div></div>' for i, (k, t) in enumerate(steps))
    rows = [("PermitAll", "30", ["204", "204", "204", "204", "204"]), ("USER 이상", "28", ["401", "403", "204", "204", "204"]),
            ("ORGANIZER 이상", "37", ["401", "403", "403", "204", "204"]), ("ADMIN", "10", ["401", "403", "403", "403", "204"])]
    cell = lambda v: (f'<td><span class="mono" style="display:inline-block;width:46px;text-align:center;padding:4px 0;border-radius:6px;'
                      f'background:{"#EFF6FF" if v == "204" else "#F1F5F9"};color:{"#1D4ED8" if v == "204" else "#475569"};font-size:12px;font-weight:600">{v}</span></td>')
    body = "".join(f'<tr><td class="b" style="font-size:12.5px">{n}</td><td class="s mono">{p}</td>{"".join(cell(v) for v in vs)}</tr>' for n, p, vs in rows)
    return page(f'''
<style>table{{border-collapse:separate;border-spacing:0 6px}} td{{padding:0 5px}} th{{font-size:11px;color:#64748B;font-weight:500;text-align:left;padding:0 5px}}</style>
<div class="t">route와 권한 정책을 한 곳으로 옮긴 순서</div>
<div style="display:flex;margin:10px 0 16px">{flow}</div>
<div style="display:flex;gap:20px">
 <div style="flex:1">
  <div class="t">전환 전후 같은 판정 · 경로 105개 × 5주체</div>
  <table><tr><th>정책</th><th>path</th><th>익명</th><th>scope만</th><th>USER</th><th>ORG</th><th>ADMIN</th></tr>{body}</table>
 </div>
 <div style="width:250px;display:flex;flex-direction:column;gap:8px">
  {kpi("Gateway 테스트", "190", "282개")}
  <div class="card" style="padding:10px 12px;font-size:12px;line-height:1.6;color:#334155"><span class="b">보강 중 찾은 버그</span><br>비밀번호 변경 요청 body가 로그에 원문으로 남음 → 실패 테스트 3건 먼저, 다음 커밋에서 수정</div>
 </div>
</div>''')


def retry_steps():
    # DOCS/refactoring/be-refactor/PHASE_6E, 6H, 6K, 6L, 6M_A, 6M_B, 6N (didim-log-BE@876ad9c)
    rows = [("6E", "#105", "상태 전이 CAS", "같은 작업 두 번 실행 시 외부 호출", "2 → 1건"),
            ("6H", "#108", "실패 원장", "재시도 뒤 복구 안 된 문제", "1 → 0건"),
            ("6K", "#111", "재시작 복구", "재시작 뒤 멈춘 PENDING·RUNNING", "FAILED로 정리"),
            ("6L", "#112", "대상 manifest", "취소 뒤 재시도의 3·4번 재호출", "0건"),
            ("6M-A", "#113", "worker lease", "같은 작업 동시 claim 성공", "1건"),
            ("6M-B", "#114", "만료 작업 인계", "두 서버의 같은 작업 인계 시 외부 호출", "1건"),
            ("6N", "#117", "상세 수집 4개 병렬", "3,400건 누락·중복, 결과 SHA-256", "0건 · 일치")]
    html = "".join(
        f'<div style="display:flex;align-items:center;height:41px;border-bottom:1px solid #E2E8F0">'
        f'<div class="mono b" style="width:58px;font-size:12px;color:{BLUE}">{k}</div>'
        f'<div style="width:150px;font-size:13px;font-weight:600">{t}</div>'
        f'<div class="s" style="flex:1;font-size:12px">{d}</div>'
        f'<div class="b" style="width:120px;text-align:right;font-size:13.5px;color:{BLUE}">{v}</div>'
        f'<div class="s mono" style="width:52px;text-align:right;font-size:11px">{pr}</div></div>'
        for k, pr, t, d, v in rows)
    return page(f'''
<div class="t">단계마다 실패를 테스트로 먼저 재현하고, 고친 뒤 같은 테스트로 확인</div>
<div class="s" style="margin:4px 0 10px">실제 Redis·MongoDB 통합 테스트 · 각 단계 별도 PR</div>
<div style="border-top:1px solid #E2E8F0">{html}</div>''')


def admin_steps():
    # PHASE_1A~1D, ADMIN_QUERY_OPTIMIZATION_OVERVIEW.md (didim-log-BE@876ad9c)
    st = [("1A", "N+1 제거", "읽기 명령 · 페이지 10명", "11", "2"),
          ("1B", "studentId 인덱스", "회고 문서 검사", "12", "0"),
          ("1C", "DB 페이징", "매핑한 회원 · 1,000명 중 20명", "1,000", "20"),
          ("1D", "정렬 인덱스", "페이지 문서 검사 · 깊은 페이지 포함", "1,000", "20")]
    cards = "".join(
        f'<div class="card" style="flex:1;padding:14px 14px;display:flex;flex-direction:column">'
        f'<div class="mono b" style="font-size:12px;color:{BLUE}">{k}</div><div class="b" style="font-size:15px;margin-top:4px">{t}</div>'
        f'<div class="s" style="margin-top:14px;min-height:32px;line-height:1.45">{m}</div>'
        f'<div style="font-size:24px;font-weight:700;margin-top:6px"><span style="color:#94A3B8">{b}</span> <span class="s" style="font-size:16px">→</span> <span class="or">{a}</span></div></div>'
        + ('' if i == 3 else f'<div style="align-self:center;color:#94A3B8;font-size:18px">›</div>')
        for i, (k, t, m, b, a) in enumerate(st))
    return page(f'''
<div class="t">관리자 회원 목록 · 한 단계씩 바꾸고 같은 fixture로 다시 측정</div>
<div class="s" style="margin:4px 0 16px">driver CommandListener와 explain으로 측정 · 응답 내용과 전체 수는 그대로</div>
<div style="display:flex;gap:8px">{cards}</div>
<div class="card" style="margin-top:16px;padding:12px 16px;font-size:12.5px;color:#334155;line-height:1.6">
 1D 이후 첫 페이지와 깊은 페이지 모두 <span class="mono">IXSCAN</span>으로 20건만 검사하고, 블로킹 <span class="mono">SORT</span>가 사라졌습니다.
</div>''', center=True)


VISUALS = {"bugs": bugs, "batch-load": batch, "web-steps": web_steps, "gateway-steps": gateway_steps,
           "didim-retry-steps": retry_steps, "didim-admin-steps": admin_steps, "didim-split": split}


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
