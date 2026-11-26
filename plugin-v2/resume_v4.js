// RESUME v4 (2 pages): clones resume_v3_01/02/03 (448:4/94/205) into resume_v4_01/02 to the right.
// v3 frames are never modified. Re-running deletes the old v4 frames first.
const V4 = { p1: 'resume_v4_01', p2: 'resume_v4_02' };

function mapClone(orig, clone, M) {
  const a = [orig, ...orig.findAll(() => true)], b = [clone, ...clone.findAll(() => true)];
  if (a.length !== b.length) throw new Error('clone mismatch ' + orig.id);
  a.forEach((n, i) => { M[n.id] = b[i].id; });
}

function overflowReport(frame) {
  const limit = frame.height - frame.paddingBottom;
  let bottom = 0;
  for (const c of frame.children) bottom = Math.max(bottom, c.y + c.height);
  const over = Math.round(bottom - limit);
  return frame.name + (over > 0 ? ' 넘침 ' + over + 'px' : ' 여유 ' + (-over) + 'px');
}

async function applyResumeV4() {
  const page = await node('375:4'); await figma.setCurrentPageAsync(page);
  for (const f of page.children.filter(c => c.name === V4.p1 || c.name === V4.p2)) f.remove();
  const M = {};
  const N = id => { if (!M[id]) throw new Error('unmapped ' + id); return M[id]; };
  const src1 = await node('448:4'), src2 = await node('448:94');
  const p1 = src1.clone(); page.appendChild(p1); p1.name = V4.p1; p1.x = src1.x + 900; p1.y = src1.y; mapClone(src1, p1, M);
  const p2 = src2.clone(); page.appendChild(p2); p2.name = V4.p2; p2.x = src2.x + 900; p2.y = src2.y; mapClone(src2, p2, M);
  const take = async (origId, dest) => { const o = await node(origId); const c = o.clone(); dest.appendChild(c); mapClone(o, c, M); return c; };
  const rm = async id => (await node(N(id))).remove();
  const R = (id, md) => rich(N(id), md);
  const done = [];
  // page 2 removals first: take() below re-maps 448:127 to the page-1 copy
  for (const id of ['448:95', '448:127', '448:125', '448:157']) await rm(id);   // Projects 제목, 디딤로그, 구분선, Investopia

  // ---- page 1: header, 약력, Projects, A&I, 디딤로그
  done.push(await R('448:24',
    '커뮤니티 운영진으로 시작해 **A&I.com 백엔드 리드**를 맡고 있는 서버 개발자입니다.\n' +
    '느린 곳은 같은 조건에서 다시 재고, 리팩터링 전에는 테스트로 지금 동작을 먼저 고정합니다.\n' +
    '5개 프로젝트에 테스트 ==2,413개==를 두고 라인 커버리지 ==89.95%==를 확인했으며,\n' +
    '테스트를 보강하며 찾은 버그 **3건**을 고쳤습니다.'));
  const intro = await node(N('448:40')); intro.layoutSizingHorizontal = 'FILL'; intro.textAutoResize = 'HEIGHT';
  done.push(await R('448:48', '개발 인원이 2명→6명으로 늘어 백엔드를 **5개 서비스**로 나누고,\n과제·채점 연동은 SNS/SQS 이벤트로 바꿨습니다.'));
  done.push(await R('448:53', '과제마다 반복하던 하위 조회를 Batch로 묶어,\n과제 1,000개 목록 조회 P95를 ==187→128ms(-31%)==로 낮췄습니다.'));
  done.push(await R('448:58', '테스트를 **188→602개**로 늘리며 CI 통과 기준을 Line ==70→86%==로 올렸습니다.'));
  const t58 = await node(N('448:58')); t58.layoutSizingHorizontal = 'FILL'; t58.textAutoResize = 'HEIGHT';
  done.push(await R('448:63', '테스트·성능 검증 job을 병렬로 나눠 CI 시간을 ==140→109초(-22%)==로 줄였습니다.'));
  done.push(await R('448:68', '**141개** route와 권한 정책을 Gateway로 모으고,\n권한이 걸린 ==105개 경로==를 역할별 회귀 테스트로 고정했습니다.'));
  done.push(await R('448:73', 'Go로 장애 알림·CloudWatch 로그 조회 봇을 만들어,\ntraceId 하나로 여러 서비스 로그를 함께 찾게 했습니다.'));
  await rm('448:76'); await rm('448:78');          // Skills → page 2
  await take('448:127', p1);                         // 디딤로그 (divider 448:74 stays above it)
  (await node(N('448:137'))).layoutSizingVertical = 'HUG';
  await rm('448:140');                               // BOJ 인증 줄은 포트폴리오로
  done.push(await R('448:149', '문제 3,400건 상세 수집을 4개씩 병렬로 바꿔 ==55.6→12.2초(-78%)==,\n누락·중복 **0건**을 확인했습니다. (로컬 고정 지연 조건)'));
  done.push(await R('448:154', 'Redis에 실패 ID 원장을 남겨, 재시도 때 실패·미처리 항목만 다시 수집합니다.'));
  done.push(await R('458:8', '관리자 회원 목록의 N+1을 없애 MongoDB 읽기를 ==11→2회==로 줄였습니다.'));
  done.push(await addBullet(N('458:8'), '2,754줄짜리 수집 서비스를 협력 클래스 **13개**로 나눠 ==330줄==로 줄였습니다.'));

  // ---- page 2: 고찌봄, SoloPlay, Skills, Growth(Community, Writing, Education & Certificates)
  const box = await node(N('448:113')); box.layoutSizingVertical = 'HUG';
  done.push(await R('448:114', '5인 팀 PM으로 MVP를 "알림 → 사진 한 장 → 보호자 확인" 흐름 하나로 좁혔습니다.'));
  done.push(await R('448:119', 'FE 라우트 16개와 API 계약 차이를 BFF 2개로 정리해 4일 안에 배포했습니다.'));
  done.push(await R('448:124', '빛나는 인재 AI Re-Local 해커톤에서 ==1등 혁신상==을 받고 팀 MVP로 뽑혔습니다.'));
  await rm('448:195');                               // Kakao 정규화 줄은 포트폴리오로
  done.push(await R('448:204', 'Gemini 소개·태그 보강을 장소 저장 뒤 비동기로 처리하도록 설계해,\n==AI 호출이 실패해도 장소 원본이 남게== 했습니다.'));
  done.push(await R('458:13', '테스트 **99개**로 라인 커버리지 ==87.21%==를 확인하고 CI 통과 기준으로 걸었습니다.'));
  await take('448:76', p2); await take('448:78', p2);            // Skills
  for (const id of ['448:254', '448:206', '448:208', '448:210', '448:230', '448:232', '448:234', '448:278', '448:289', '448:291']) await take(id, p2);
  await rm('448:225');                               // 운영진→리드 줄은 약력으로
  done.push(await R('448:224', '누적 40명 이상이 참여한 개발 커뮤니티에서\n테크 세션 30회 이상, 네트워킹 5회 이상을 열었습니다.'));
  done.push(await plain(N('448:242'), '2023.01 - 현재'));
  done.push(await R('448:248', '2023년부터 트러블슈팅·학습·회고 글 **171편**을 썼습니다.'));
  done.push(await plain(N('448:290'), 'Education & Certificates'));
  done.push(await R('448:303', '학사학위 전공심화과정 · 전체 평점 4.4 / 4.5 · 성적우수장학금 5회'));
  done.push(await R('448:308', 'SQLD · 네트워크관리사 2급 · 정보처리기사 (2026.12 취득 예정)'));
  await rm('448:309');
  for (const id of ['448:303', '448:308']) { const t = await node(N(id)); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; }

  const report = [overflowReport(p1), overflowReport(p2)];
  figma.viewport.scrollAndZoomIntoView([p1, p2]);
  return { done, report };
}
