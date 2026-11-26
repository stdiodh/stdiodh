// DETAIL PAGES v2: clones of Final · 03 (209:154). Each page reads 문제 → 리팩터링 → 수치 변화 → 안정성.
// IMAGES is defined by build_plugin.py (base64 PNGs rendered by detail-pages/visuals.py).
const DETAILS = [
  { name: 'Final · 01a', after: 'Final · 01', row: 0, col: 0, img: 'bugs',
    head: ['5개 프로젝트', '테스트 보강', '2026.11'],
    title: '빈 분기를 테스트로 채우다가 \n**숨어 있던 버그 3건**을 찾았습니다.',
    steps: [
      ['==문제== 리팩터링 전에 빈 분기부터', '5개 저장소 main의 라인 커버리지는 78.01%였고,\n오류 처리·로그·권한 분기에 테스트가 비어 있었습니다.'],
      ['==리팩터링== 운영 코드보다 테스트를 먼저', '저장소마다 빈 분기를 테스트만 담은 브랜치로 먼저 채우고,\n리팩터링 브랜치는 그 위에 쌓아 같은 테스트로 확인했습니다.'],
      ['==수치 변화== 테스트 1,862 → 2,413개', '같은 측정 방식으로 라인 커버리지를\n78.01%에서 89.95%로 올렸습니다.'],
      ['==안정성== 실패 테스트가 먼저 찾은 버그 3건', '로그 비밀번호 노출, 보호자 그룹 403 고착, solved.ac 장애 시 로그인 실패를\n실패하는 테스트로 먼저 커밋하고 다음 커밋에서 고쳤습니다.'],
    ],
    metrics: [['라인 커버리지 (5개 저장소)', '78.01 → 89.95%'], ['테스트로 찾은 버그', '3건']],
    caption: '버그별 실패 테스트와 수정 커밋', link: ['PR 보기', 'https://github.com/stdiodh/A-AND-I-GATEWAY-SERVER/pull/3'] },
  { name: 'Final · 03a', after: 'Final · 03', row: 1, col: 0, img: 'batch-load',
    head: ['A&I.com', 'Web Server 부하 검증', '2026.06-11'],
    title: '과제가 1,000개로 늘어도 \n**목표 부하를 버티게** 했습니다.',
    steps: [
      ['==문제== 과제 수만큼 늘어나는 하위 조회', '과제마다 요구사항·테스트케이스를 따로 읽어\n과제가 N개면 저장소 호출이 2N번이었습니다.'],
      ['==리팩터링== ID를 모아 두 번에 조회', 'IN 조회 두 번으로 묶고 원래 정렬 순서대로 응답을 다시 만든 뒤,\n호출 횟수와 응답 순서를 테스트로 고정했습니다.'],
      ['==수치 변화== P95 187 → 128ms', '과제 1,000개·5 RPS에서 2분씩 3회 잰 중앙값입니다.\n3회 범위도 겹치지 않았습니다(183.7~201.7 / 127.8~128.5ms).'],
      ['==안정성== 50 RPS 목표 부하 유지', '변경 전 서버는 8.6 req/s에 그쳐 요청 4,833건이 밀렸고,\n변경 후에는 49.94 req/s로 목표 부하를 유지했습니다.'],
    ],
    metrics: [['과제 1,000개 · 5 RPS P95', '187 → 128ms'], ['50 RPS 목표 부하 처리량', '8.6 → 49.9 req/s']],
    caption: '같은 부하에서 변경 전후 (k6, 2분×3회 중앙값)', link: ['기록 보기', 'https://github.com/stdiodh/A-AND-I-WEB-SERVER/blob/docs/assignment-list-remeasure/docs/performance/results/2026-11-26-assignment-list-scale-before-after.md'] },
  { name: 'Final · 03b', after: 'Final · 03a', row: 1, col: 1, img: 'web-steps',
    head: ['A&I.com', 'Web Server 리팩터링', '2026.03-11'],
    title: '749줄 명령 서비스를 \n**테스트 checkpoint마다** 나눴습니다.',
    steps: [
      ['==문제== 한 서비스에 과제·코스 책임', 'CourseCommandService 749줄에 과제 생성·복사·삭제가 섞였고,\n요구사항·테스트케이스 저장이 동시에 시작됐습니다.'],
      ['==리팩터링== 단계마다 테스트 통과 뒤 다음으로', '명령·조회 서비스 분리, 저장 순서 고정, 계층 경계 정리를\n단계마다 전체 테스트와 JaCoCo gate를 통과한 뒤 이어 갔습니다.'],
      ['==수치 변화== 테스트 188 → 602개', 'CourseCommandService는 749 → 185줄이 됐고,\n테스트·성능 검증 job을 나눠 CI는 140 → 109초가 됐습니다.'],
      ['==안정성== 앞 저장이 실패하면 뒤는 멈춤', '저장을 차례로 구독하게 바꿔, 앞 단계가 실패하면 다음 쓰기와\n이벤트가 시작되지 않는 것을 TestPublisher로 확인했습니다.'],
    ],
    metrics: [['테스트 수', '188 → 602개'], ['CI Line 통과 기준', '70 → 86%']],
    caption: '리팩터링 단계별 테스트 수와 라인 커버리지', link: ['기록 보기', 'https://github.com/stdiodh/A-AND-I-WEB-SERVER/blob/main/docs/refactoring/2026-07-stable-refactoring.md'] },
  { name: 'Final · 03c', after: 'Final · 03b', row: 1, col: 2, img: 'gateway-steps',
    head: ['A&I.com', 'Gateway 접근 정책', '2026.07-11'],
    title: '141개 route의 권한 정책을 \n**판정을 바꾸지 않고** 한 곳으로 옮겼습니다.',
    steps: [
      ['==문제== route와 권한 정책이 따로 관리됨', 'route는 application.yaml, 권한은 필터 코드에 있어\nroute를 고칠 때 정책을 빠뜨리기 쉬웠습니다.'],
      ['==리팩터링== 고정 → 시험 → 전환 → 정리', 'route 141개를 테스트로 고정하고, 정책 catalog를 테스트에서 먼저\n돌려 본 뒤 운영 코드로 옮기고 중복 matcher 13개를 지웠습니다.'],
      ['==수치 변화== 경로 105개 × 5주체 판정 일치', '전환 전후 모두 105개 경로를 익명·scope만·USER·ORGANIZER·ADMIN으로\n요청해 401·403·204 판정이 같은지 비교했습니다.'],
      ['==안정성== 보강한 테스트가 찾은 로그 노출', '테스트를 190 → 282개로 늘리다 비밀번호 변경 요청이 로그에 남는 것을\n찾아, 실패 테스트 3건을 먼저 커밋하고 고쳤습니다.'],
    ],
    metrics: [['Gateway 테스트', '190 → 282개'], ['라인 커버리지', '92.35 → 98.27%']],
    caption: '전환 순서와 주체별 접근 판정', link: ['기록 보기', 'https://github.com/stdiodh/A-AND-I-GATEWAY-SERVER/blob/main/docs/REFACTORING_PLAN.md'] },
  { name: 'Final · 04a', after: 'Final · 04', row: 2, col: 0, img: 'didim-retry-steps',
    head: ['디딤로그', '수집 작업 안정화', '2026.07-08'],
    title: '수집 작업의 실패를 하나씩 재현해 \n**단계마다 0건으로** 만들었습니다.',
    steps: [
      ['==문제== 어디까지 했는지만 저장', 'checkpoint만 저장해 완료된 작업의 실패 문제가 재시도에서 빠졌고,\n같은 작업이 두 번 돌거나 재시작 뒤 멈춘 채 남았습니다.'],
      ['==리팩터링== 재현 테스트 먼저, 단계별 PR', '상태 전이 CAS → 실패 원장 → 재시작 복구 → 대상 manifest →\nworker lease → 만료 작업 인계 순서로 PR을 나눴습니다.'],
      ['==수치 변화== 재현한 실패를 0건으로', '재시도 뒤 복구 안 된 문제 1 → 0건,\n같은 작업을 두 번 실행할 때 외부 호출 2 → 1건이 됐습니다.'],
      ['==안정성== 병렬로 바꿔도 같은 결과', '이 상태 관리 위에서 상세 수집을 4개씩 병렬로 바꿨고,\n3,400건 누락·중복 0건, 순차·병렬 결과 SHA-256이 같았습니다.'],
    ],
    metrics: [['재시도 뒤 복구 안 된 문제', '1 → 0건'], ['같은 작업 재실행 시 외부 호출', '2 → 1건']],
    caption: '단계별로 재현한 실패와 수정 결과', link: ['PR 보기', 'https://github.com/didim-log/didim-log-BE/pull/108'] },
  { name: 'Final · 04b', after: 'Final · 04a', row: 2, col: 1, img: 'didim-admin-steps',
    head: ['디딤로그', '관리자 회원 조회', '2026.07'],
    title: '회원이 늘어도 관리자 조회가 \n**읽는 양이 늘지 않게** 했습니다.',
    steps: [
      ['==문제== 회원 수만큼 늘어나는 읽기', '회원마다 회고를 전부 읽고, 전체 회원을 불러와 메모리에서\n자르고 정렬해 회원이 늘면 읽는 양도 함께 늘었습니다.'],
      ['==리팩터링== N+1 → 인덱스 → DB 페이징 → 정렬 인덱스', '회고 개수를 집계 한 번으로 바꾸고 studentId 인덱스를 둔 뒤,\n페이징과 정렬을 DB로 넘기고 정렬 인덱스를 붙였습니다.'],
      ['==수치 변화== 읽기 11 → 2회, 검사 1,000 → 20건', '페이지 10명일 때 읽기 명령 11 → 2회,\n회원 1,000명일 때 페이지 문서 검사 1,000 → 20건입니다.'],
      ['==안정성== 깊은 페이지도 같은 비용', '첫 페이지와 깊은 페이지 모두 인덱스로 20건만 검사하고\n블로킹 정렬이 사라졌습니다. 응답 내용과 전체 수는 그대로입니다.'],
    ],
    metrics: [['MongoDB 읽기 (페이지 10명)', '11 → 2회'], ['페이지 문서 검사 (회원 1,000명)', '1,000 → 20건']],
    caption: '단계별 측정 (같은 fixture)', link: ['기록 보기', 'https://github.com/didim-log/didim-log-BE/blob/main/DOCS/refactoring/be-refactor/ADMIN_QUERY_OPTIMIZATION_OVERVIEW.md'] },
  { name: 'Final · 04c', after: 'Final · 04b', row: 2, col: 2, img: 'didim-split',
    head: ['디딤로그', '수집 서비스 분리', '2026.11'],
    title: '2,754줄짜리 수집 서비스를 \n**동작은 그대로 두고** 13개로 나눴습니다.',
    steps: [
      ['==문제== 한 클래스에 일곱 가지 책임', '상태 저장, Lua CAS, manifest 검증, worker lease,\n실행 루프, 재시도 선택, 메트릭이 한 파일에 있었습니다.'],
      ['==리팩터링== 계약 테스트 먼저, 클래스마다 커밋', 'Lua 6개의 SHA1과 Redis 키 접두사·TTL을 테스트로 고정하고\n협력 클래스를 12번의 커밋으로 하나씩 옮겼습니다.'],
      ['==수치 변화== 파사드 2,754 → 330줄', '전체는 3,218줄로 늘었지만, 재시도·lease·조회를 고칠 때\n해당 클래스 하나만 열면 됩니다.'],
      ['==안정성== 공개 API와 Redis 계약 유지', 'public API 18개와 생성자 시그니처를 그대로 두었고,\n단위 998개·통합 278개(조건부 10개 제외) 테스트가 실패 없이 통과했습니다.'],
    ],
    metrics: [['ProblemCollectorService', '2,754 → 330줄'], ['분리 뒤 테스트 실패', '0건']],
    caption: '분리 전후 파일 구성 (줄 수)', link: ['PR 보기', 'https://github.com/didim-log/didim-log-BE/pull/122'] },
];
// page order after inserting the detail pages
const DETAIL_PAGE = 'Portfolio · 상세';
const ORDER = ['Final · 01', 'Final · 01a', 'Final · 02', 'Final · 03', 'Final · 03a', 'Final · 03b', 'Final · 03c', 'Final · 04', 'Final · 04a', 'Final · 04b', 'Final · 04c', 'Final · 05', 'Final · 06', 'Final · 07'];

async function applyDetails(){
  const page = await node('144:2'); await figma.setCurrentPageAsync(page);
  const done = [];
  let dpage = figma.root.children.find(p => p.name === DETAIL_PAGE);
  if (!dpage) { dpage = figma.createPage(); dpage.name = DETAIL_PAGE; figma.root.insertChild(figma.root.children.indexOf(page) + 1, dpage); }
  await dpage.loadAsync();
  for (const pg of [page, dpage]) for (const old of pg.children.filter(c => /^Final · 0\d[a-z]$/.test(c.name))) old.remove(); // re-run safe, also drops v1 detail frames
  const src = await node('209:154');
  const srcAll = [src, ...src.findAll(() => true)];
  for (const d of DETAILS) {
    const f = src.clone(); dpage.appendChild(f); f.name = d.name;
    f.x = d.col * 1800; f.y = d.row * 1100;
    const all = [f, ...f.findAll(() => true)];
    const m = id => all[srcAll.findIndex(n => n.id === id)];
    const set = async (id, text) => { const n = m(id); await loadNodeFonts(n); n.characters = text; };
    await set('209:159', d.head[0]); await set('209:161', d.head[1]); await set('209:163', d.head[2]);
    await richKeep(m('209:166').id, d.title);
    const T = ['209:171', '209:177', '209:183', '209:189'], B = ['209:173', '209:179', '209:185', '209:191'];
    for (let i = 0; i < 4; i++) { await richKeep(m(T[i]).id, d.steps[i][0]); await set(B[i], d.steps[i][1]); }
    await set('209:197', d.metrics[0][0]); await set('209:199', d.metrics[0][1]);
    await set('209:202', d.metrics[1][0]); await set('209:204', d.metrics[1][1]);
    await set('209:212', d.caption);
    const ln = m('209:215'); await loadNodeFonts(ln); ln.characters = d.link[0]; ln.setRangeHyperlink(0, ln.characters.length, { type: 'URL', value: d.link[1] });
    const im = m('209:208'); const hash = figma.createImage(figma.base64Decode(IMAGES[d.img])).hash;
    im.x = 0; im.y = 0; im.resize(874, 418); im.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: hash }];
    for (const k of im.children) k.visible = false;
    done.push(d.name);
  }
  // footer numbers: "NN / 13"
  const total = ORDER.length;
  for (let i = 0; i < total; i++) {
    const fr = [...page.children, ...dpage.children].find(c => c.name === ORDER[i]); if (!fr) throw new Error('frame ' + ORDER[i]);
    const t = fr.findAll(n => n.type === 'TEXT' && /^\d{2} \/ \d+$/.test(n.characters))[0];
    if (t) { await loadNodeFonts(t); t.characters = String(i + 1).padStart(2, '0') + ' / ' + total; }
  }
  // cover: project page numbers
  const no = name => String(ORDER.indexOf(name) + 1).padStart(2, '0');
  done.push(await plain('209:30', no('Final · 02') + '-' + no('Final · 03c')));
  done.push(await plain('209:38', no('Final · 04') + '-' + no('Final · 04c')));
  for (const [id, name] of [['209:46', 'Final · 05'], ['209:54', 'Final · 06'], ['209:62', 'Final · 07']]) done.push(await plain(id, no(name)));
  // accent #2563EB: diagrams recoloured outside Figma (same pixel size, crop kept)
  for (const [id, key] of [['209:146', 'arch-blue'], ['209:209', 'batch-blue']]) {
    const n = await node(id); const hash = figma.createImage(figma.base64Decode(IMAGES[key])).hash;
    n.fills = n.fills.map(f => f.type === 'IMAGE' ? Object.assign({}, f, { imageHash: hash }) : f); done.push(id);
  }
  return done;
}
