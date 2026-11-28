// Number wording fix (04b, 03, 03a). Replaces a text only where it is still exactly what the plugin wrote,
// so anything changed by hand in Figma is left alone and reported as skipped.
const NUMFIX = [
  ['회원마다 회고 수를 다시 읽었습니다', '회원 수만큼 회고를 다시 읽었습니다'],
  ['한 페이지에 10명이면 **MongoDB를 11번 읽는 N+1**이 있었고,\n페이지를 나누기 전에 전체 회원을 서버로 다 가져와 정렬했습니다.',
   '한 페이지 회원이 N명이면 회원 조회 1번에 회원마다 회고 조회 N번,\n모두 **N+1번** DB를 읽었습니다. 10명이면 11번이었습니다.\n페이지를 나누기 전에 전체 회원을 서버로 다 가져와 정렬했습니다.'],
  ['회원 수가 늘어도 2번입니다', '회원이 늘어도 한 페이지만 읽습니다'],
  ['회원이 1,000명이어도 ==전체를 훑거나 메모리에서 정렬하지 않습니다==.\n응답 내용과 전체 수는 그대로입니다.',
   '회원 1,000명 중 20명 페이지를 열 때, DB가 살펴본 회원 문서는\n==1,000건 → 20건==입니다. 전체 수를 세는 count는 아직 1,000건을 봅니다.\n응답 내용과 전체 수는 그대로입니다.'],
  ['목록을 열면 과제마다 요구사항과 테스트케이스를 따로 읽어,\n과제 30개면 **추가 조회가 60번**이었습니다. 기수가 쌓일수록 과제도 늘어납니다.',
   '과제가 N개면 과제마다 요구사항과 테스트케이스를 한 번씩,\n모두 **2N번** 더 읽었습니다. 30개면 60번이고, 기수가 쌓일수록 과제도 늘어납니다.'],
  ['과제 ID를 먼저 모아 **요구사항 한 번, 테스트케이스 한 번**으로 묶어 읽고(Batch),\n바꾼 뒤에도 같은 테스트가 통과하는지 확인했습니다.',
   '과제 ID를 먼저 모아 **과제 수와 상관없이 2번**으로 묶어 읽고(Batch),\n바꾼 뒤에도 같은 테스트가 통과하는지 확인했습니다.'],
  ['권한이 걸린 105개 경로를 5가지 사용자로 요청해 ==결과가 모두 같았습니다==.\n테스트를 늘리다 로그 마스킹에서 빠진 비밀번호 필드도 찾아 고쳤습니다.',
   '권한이 걸린 105개 경로를 5가지 사용자로 요청한 ==525번의 판정==이\n옮기기 전과 모두 같았습니다.\n테스트를 늘리다 로그 마스킹에서 빠진 비밀번호 필드도 찾아 고쳤습니다.'],
];
async function applyNumFix() {
  const page = await node('144:2'); await figma.setCurrentPageAsync(page);
  const dpage = figma.root.children.find(p => p.name === DETAIL_PAGE); await dpage.loadAsync();
  const texts = [page, dpage].flatMap(p => p.findAll(n => n.type === 'TEXT'));
  let changed = 0; const missing = [];
  for (const [oldMd, newMd] of NUMFIX) {
    const want = parse(oldMd).out, hits = texts.filter(t => t.characters === want);
    if (!hits.length) { missing.push(want.split('\n')[0].slice(0, 18)); continue; }
    for (const t of hits) { await richKeep(t, newMd); changed++; }
  }
  return '수치 문장 ' + changed + '곳 수정' + (missing.length ? ' · 손으로 고쳐 건너뜀: ' + missing.join(', ') : '');
}
