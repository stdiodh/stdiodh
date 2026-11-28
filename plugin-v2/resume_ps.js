// Problem Solving in resume_v4_02, added in place so text edited by hand in Figma stays as it is.
// Goes between Writing and Education & Certificates, built from the Education row. Re-running replaces only these nodes.
async function applyProblemSolving() {
  const page = await node('375:4'); await figma.setCurrentPageAsync(page);
  const p2 = page.children.find(c => c.name === V4.p2); if (!p2) throw new Error('resume_v4_02가 없습니다');
  for (const k of p2.children.filter(c => c.name.startsWith('PS · '))) k.remove();
  const isSub = (c, txt) => c.name === 'SubSec' && c.findOne(n => n.type === 'TEXT' && n.characters.trim() === txt);
  const kids = p2.children;
  const eduSub = kids.find(c => isSub(c, 'Education & Certificates')); if (!eduSub) throw new Error('Education 칸을 찾지 못했습니다');
  const eduRow = kids[kids.indexOf(eduSub) + 1], divider = kids[kids.indexOf(eduSub) - 1];
  if (!eduRow || eduRow.name !== 'Row' || !divider || !/Divider/.test(divider.name)) throw new Error('Education 주변 구조가 예상과 다릅니다');
  const at = kids.indexOf(divider);
  const d = divider.clone(), s = eduSub.clone(), r = eduRow.clone();
  d.name = 'PS · divider'; s.name = 'PS · SubSec'; r.name = 'PS · Row';
  p2.insertChild(at, r); p2.insertChild(at, s); p2.insertChild(at, d);   // order: divider, SubSec, Row, then the existing divider before Education
  const texts = n => n.findAll(x => x.type === 'TEXT' && x.characters.trim().length > 1);
  await plain(texts(s)[0].id, 'Problem Solving');
  const [left, right] = r.children;
  const lt = texts(left); await plain(lt[0].id, '백준 · 프로그래머스'); await plain(lt[1].id, '2024.02 - 현재');
  const bt = texts(right);
  await rich(bt[0].id, '백준 **Gold III**, 프로그래머스 **240문제** 이상을 풀며 알고리즘 기반을 다졌습니다.');
  await rich(bt[1].id, '2025 『Do it! 알고리즘 코딩 테스트 자바편』 서평단으로 참여해\n풀이 전략과 학습 과정을 정리했습니다.');
  return overflowReport(p2);
}
