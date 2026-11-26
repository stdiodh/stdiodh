// shared helpers (concatenated into code.js by build step)
const DARK={r:0.06666667014360428,g:0.0941176488995552,b:0.15294118225574493};
const OR={r:0x25/255,g:0x63/255,b:0xEB/255}; // #2563EB
const P=(style)=>({family:'Pretendard',style});
async function loadNodeFonts(n){ if(n.characters.length===0){ if(n.fontName!==figma.mixed) await figma.loadFontAsync(n.fontName); return;} for(const s of n.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); }
function parse(md){ let out='',ranges=[]; const re=/(\*\*|==)(.+?)\1/g; let last=0,m; while((m=re.exec(md))){ out+=md.slice(last,m.index); const st=out.length; out+=m[2]; ranges.push({st,en:out.length,kind:m[1]}); last=re.lastIndex;} out+=md.slice(last); return {out,ranges}; }
async function node(id){ const n=await figma.getNodeByIdAsync(id); if(!n) throw new Error('missing node '+id); return n; }
async function rich(id, md, base){ const n=await node(id); if(n.type!=='TEXT') throw new Error(id+' not text'); await loadNodeFonts(n); const baseStyle = base || 'Regular'; await figma.loadFontAsync(P(baseStyle)); await figma.loadFontAsync(P('Bold'));
  const {out,ranges}=parse(md); n.characters=out; if(out.length){ n.setRangeFontName(0,out.length,P(baseStyle)); n.setRangeFills(0,out.length,[{type:'SOLID',color:DARK}]);
  for(const r of ranges){ n.setRangeFontName(r.st,r.en,P('Bold')); if(r.kind==='==') n.setRangeFills(r.st,r.en,[{type:'SOLID',color:OR}]); } } return id; }
async function semiBold(){ for(const s of ['SemiBold','Semi Bold']){ try{ await figma.loadFontAsync(P(s)); return P(s);}catch(e){} } throw new Error('Pretendard SemiBold 글꼴이 없습니다'); }
async function plain(id, text){ const n=await node(id); await loadNodeFonts(n); n.characters=text; return id; }
async function addBullet(afterTextId, md){ const t=await node(afterTextId); const bullet=t.parent.parent; const list=bullet.parent; const want=parse(md).out;
  for(const b of list.children){ const tx=b.findAllWithCriteria({types:['TEXT']}).find(x=>x.characters===want); if(tx) return tx.id; }
  const c=bullet.clone(); list.insertChild(list.children.indexOf(bullet)+1,c); const txt=c.findAllWithCriteria({types:['TEXT']}).filter(x=>x.characters.trim().length>1)[0]; return await rich(txt.id, md); }
async function cloneBulletAfter(textId){ const t=await node(textId); const bullet=t.parent.parent; const list=bullet.parent; const c=bullet.clone(); list.insertChild(list.children.indexOf(bullet)+1,c); const txt=c.findAllWithCriteria({types:['TEXT']}).filter(x=>x.characters.trim().length>1)[0]; return txt.id; }
async function reorder(parentId, ids){ const p=await node(parentId); ids.forEach((id,i)=>{ const c=p.children.find(x=>x.id===id); if(!c) throw new Error('child '+id); p.insertChild(i,c); }); }
async function allPretendard(frameId){ const f=await node(frameId); let fixed=0; for(const t of f.findAllWithCriteria({types:['TEXT']})){ const segs=t.getStyledTextSegments(['fontName']); for(const s of segs){ if(s.fontName.family!=='Pretendard'){ const st=s.fontName.style==='Semi Bold'||s.fontName.style==='SemiBold'?'SemiBold':s.fontName.style; let target=P(s.fontName.style); try{ await figma.loadFontAsync(target);}catch(e){ target=P('Regular'); await figma.loadFontAsync(target);} await figma.loadFontAsync(s.fontName); t.setRangeFontName(s.start,s.end,target); fixed++; } } } return fixed; }
