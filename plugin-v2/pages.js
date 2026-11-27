// PORTFOLIO v3 (process-first): file XDYFF0ZT7hoXu2q2DoQ52C, page 144:2. Data in pages_data.js.
const GRAY = { r: 0.2784, g: 0.3333, b: 0.4118 }; // #475569
const NAVY = { r: 0.0588, g: 0.0902, b: 0.1647 }; // #0f172a
const DETAIL_PAGE = 'Portfolio · 상세';

// keep the node's regular (non-bold) style as base, then bold / blue-bold the marked parts
async function richKeep(n, md) {
  await loadNodeFonts(n); const segs = n.getStyledTextSegments(['fontName', 'fills']);
  const seg = segs.find(s => s.fontName.style !== 'Bold') || segs[0];
  await figma.loadFontAsync(P('Bold'));
  const { out, ranges } = parse(md); n.characters = out;
  n.setRangeFontName(0, out.length, seg.fontName); n.setRangeFills(0, out.length, seg.fills);
  for (const r of ranges) { n.setRangeFontName(r.st, r.en, P('Bold')); if (r.kind === '==') n.setRangeFills(r.st, r.en, [{ type: 'SOLID', color: OR }]); }
}
async function setT(n, text) { await loadNodeFonts(n); n.characters = text; }
async function parts(n, list) {
  await loadNodeFonts(n); const style = n.getStyledTextSegments(['fontName'])[0].fontName;
  const C = { G: GRAY, N: NAVY, O: OR };
  n.characters = list.map(x => x[0]).join(''); let i = 0;
  for (const [t, c] of list) { n.setRangeFontName(i, i + t.length, style); n.setRangeFills(i, i + t.length, [{ type: 'SOLID', color: C[c] }]); i += t.length; }
}
async function link(n, text, url) { await setT(n, text); n.setRangeHyperlink(0, text.length, { type: 'URL', value: url }); }
function imageHash(key) { if (!IMAGES[key]) throw new Error('이미지 없음: ' + key); return figma.createImage(figma.base64Decode(IMAGES[key])).hash; }
function setImg(n, key, w, h) {
  n.x = 0; n.y = 0; n.resize(w, h);
  n.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash(key) }];
  for (const k of n.children || []) k.visible = false;
}
// id -> node inside `root`; for a clone, ids are the source's ids
function byId(root) { const M = {}; for (const n of [root, ...root.findAll(() => true)]) M[n.id] = n; return id => { if (!M[id]) throw new Error('node ' + id); return M[id]; }; }
function cloneMap(src, clone) {
  const a = [src, ...src.findAll(() => true)], b = [clone, ...clone.findAll(() => true)];
  if (a.length !== b.length) throw new Error('clone mismatch ' + src.id);
  const M = {}; a.forEach((x, i) => { M[x.id] = b[i]; });
  return id => { if (!M[id]) throw new Error('node ' + id); return M[id]; };
}

async function fillIntro(m, d) {
  for (const [id, t] of [['209:93', d.head[0]], ['209:95', d.head[1]], ['209:97', d.head[2]]]) await setT(m(id), t);
  await richKeep(m('209:100'), d.title); await setT(m('209:102'), d.sub);
  const T = ['209:107', '209:113', '209:119', '209:125'], B = ['209:109', '209:115', '209:121', '209:127'];
  for (let i = 0; i < 4; i++) { await richKeep(m(T[i]), d.items[i][0]); await setT(m(B[i]), d.items[i][1]); }
  await setT(m('209:148'), d.caption);
  const im = m('209:146');
  if (d.clone) {
    im.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash(d.img) }]; for (const k of im.children) k.visible = false;
    await link(m('209:132'), d.link[0], d.link[1]);
    m('209:137').parent.parent.visible = false; m('209:142').parent.parent.visible = false;
  } else {
    const h = imageHash(d.img); im.fills = im.fills.map(f => f.type === 'IMAGE' ? Object.assign({}, f, { imageHash: h }) : f);
  }
}

async function fillDetail(m, d) {
  for (const [id, t] of [['209:159', d.head[0]], ['209:161', d.head[1]], ['209:163', d.head[2]]]) await setT(m(id), t);
  await richKeep(m('209:166'), d.title);
  const T = ['209:171', '209:177', '209:183', '209:189'], B = ['209:173', '209:179', '209:185', '209:191'];
  for (let i = 0; i < 4; i++) { await richKeep(m(T[i]), d.steps[i][0]); await setT(m(B[i]), d.steps[i][1]); }
  await setT(m('209:197'), d.metrics[0][0]); await setT(m('209:199'), d.metrics[0][1]);
  await setT(m('209:202'), d.metrics[1][0]); await setT(m('209:204'), d.metrics[1][1]);
  await setT(m('209:212'), d.caption);
  await link(m('209:215'), d.link[0], d.link[1]);
  setImg(m('209:208'), d.img, 874, 418);
}

async function fillItems(m, ids, items) {
  for (let i = 0; i < items.length; i++) { if (!items[i]) continue; await richKeep(m(ids[i][0]), items[i][0]); await setT(m(ids[i][1]), items[i][1]); }
}

async function applyPortfolio() {
  const page = await node('144:2'); await figma.setCurrentPageAsync(page);
  const done = [];
  let dpage = figma.root.children.find(p => p.name === DETAIL_PAGE);
  if (!dpage) { dpage = figma.createPage(); dpage.name = DETAIL_PAGE; figma.root.insertChild(figma.root.children.indexOf(page) + 1, dpage); }
  await dpage.loadAsync();
  for (const pg of [page, dpage]) for (const old of pg.children.filter(c => /^Final · 0\d[a-z]$/.test(c.name))) old.remove(); // re-run safe, drops v2 detail frames

  // 01 cover
  const cover = byId(await node('209:2'));
  await setT(cover('209:9'), 'Server Developer');
  for (const [i, id] of ['209:14', '209:16', '209:18'].entries()) await parts(cover(id), PDATA.cover.lines[i]);
  for (const [id, t] of Object.entries(PDATA.cover.subs)) await setT(cover(id), t);
  done.push('Final · 01');

  // 02 A&I intro (in place), then 04a = clone of 02
  const f02 = await node('209:88');
  await fillIntro(byId(f02), PDATA.intros[0]); done.push('Final · 02');
  const c04a = f02.clone(); dpage.appendChild(c04a); c04a.name = 'Final · 04a'; c04a.x = 0; c04a.y = 2 * 1100;
  await fillIntro(cloneMap(f02, c04a), PDATA.intros[1]); done.push('Final · 04a');

  // detail pages: Final · 03 in place, the rest are clones of it (cloned after the in-place edit)
  const f03 = await node('209:154');
  const inPlace = PDATA.details.find(d => d.inPlace);
  await fillDetail(byId(f03), inPlace); done.push(inPlace.name);
  const pos = { 'Final · 02a': [0, 0], 'Final · 03a': [1, 0], 'Final · 03b': [1, 1], 'Final · 03c': [1, 2], 'Final · 04b': [2, 1], 'Final · 04c': [2, 2] };
  for (const d of PDATA.details.filter(d => !d.inPlace)) {
    const f = f03.clone(); dpage.appendChild(f); f.name = d.name; f.x = pos[d.name][1] * 1800; f.y = pos[d.name][0] * 1100;
    await fillDetail(cloneMap(f03, f), d); done.push(d.name);
  }

  // 04 디딤 ① 수집
  { const m = byId(await node('209:223')), d = PDATA.collect;
    for (const [id, t] of [['209:228', d.head[0]], ['209:230', d.head[1]], ['209:232', d.head[2]]]) await setT(m(id), t);
    await richKeep(m('209:254'), d.title); await setT(m('209:256'), d.sub);
    await fillItems(m, [['209:261', '209:263'], ['209:267', '209:269'], ['209:273', '209:275'], ['209:279', '209:281']], d.items);
    const M = [['209:241', '209:243', '209:245'], ['209:248', '209:250', '209:252']];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) await setT(m(M[i][j]), d.metrics[i][j]);
    await setT(m('209:237'), d.caption); setImg(m('209:235'), d.img, 836, 458); done.push('Final · 04'); }

  // 05 고찌봄
  { const m = byId(await node('209:299')), d = PDATA.gozzi;
    await setT(m('209:306'), d.role); await richKeep(m('209:311'), d.title); await setT(m('209:313'), d.sub);
    await fillItems(m, [['209:318', '209:320'], ['209:324', '209:326'], ['209:330', '209:332'], ['209:336', '209:338']], d.items); done.push('Final · 05'); }

  // 06 SoloPlay
  { const m = byId(await node('209:378')), d = PDATA.solo;
    await setT(m('209:385'), d.role); await richKeep(m('209:396'), d.title); await setT(m('209:398'), d.sub);
    await fillItems(m, [['209:403', '209:405'], ['209:409', '209:411'], ['209:415', '209:417'], ['209:421', '209:423']], d.items);
    await setT(m('209:394'), d.caption); setImg(m('209:392'), d.img, 310, 525); done.push('Final · 06'); }

  // 07 Investopia
  { const m = byId(await node('209:436')), d = PDATA.invest;
    await setT(m('209:443'), d.role); await setT(m('209:450'), d.sub);
    await fillItems(m, [['209:455', '209:457'], ['209:461', '209:463'], ['209:467', '209:469'], ['209:473', '209:475']], d.items); done.push('Final · 07'); }

  // footers "NN / 14" and cover page ranges
  const frames = [...page.children, ...dpage.children];
  for (let i = 0; i < PORDER.length; i++) {
    const fr = frames.find(c => c.name === PORDER[i]); if (!fr) throw new Error('frame ' + PORDER[i]);
    const t = fr.findAll(n => n.type === 'TEXT' && /^\d{2} \/ \d+$/.test(n.characters))[0];
    if (t) await setT(t, String(i + 1).padStart(2, '0') + ' / ' + PORDER.length);
  }
  const no = name => String(PORDER.indexOf(name) + 1).padStart(2, '0');
  await setT(cover('209:30'), no('Final · 02') + '-' + no('Final · 03c'));
  await setT(cover('209:38'), no('Final · 04a') + '-' + no('Final · 04c'));
  for (const [id, name] of [['209:46', 'Final · 05'], ['209:54', 'Final · 06'], ['209:62', 'Final · 07']]) await setT(cover(id), no(name));
  return done;
}
