// shared helpers (concatenated into code.js by build step)
const DARK={r:0.06666667014360428,g:0.0941176488995552,b:0.15294118225574493};
const OR={r:1,g:0.4000000059604645,b:0};
const P=(style)=>({family:'Pretendard',style});
async function loadNodeFonts(n){ if(n.characters.length===0){ if(n.fontName!==figma.mixed) await figma.loadFontAsync(n.fontName); return;} for(const s of n.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); }
function parse(md){ let out='',ranges=[]; const re=/(\*\*|==)(.+?)\1/g; let last=0,m; while((m=re.exec(md))){ out+=md.slice(last,m.index); const st=out.length; out+=m[2]; ranges.push({st,en:out.length,kind:m[1]}); last=re.lastIndex;} out+=md.slice(last); return {out,ranges}; }
async function node(id){ const n=await figma.getNodeByIdAsync(id); if(!n) throw new Error('missing node '+id); return n; }
async function rich(id, md, base){ const n=await node(id); if(n.type!=='TEXT') throw new Error(id+' not text'); await loadNodeFonts(n); const baseStyle = base || 'Regular'; await figma.loadFontAsync(P(baseStyle)); await figma.loadFontAsync(P('Bold'));
  const {out,ranges}=parse(md); n.characters=out; if(out.length){ n.setRangeFontName(0,out.length,P(baseStyle)); n.setRangeFills(0,out.length,[{type:'SOLID',color:DARK}]);
  for(const r of ranges){ n.setRangeFontName(r.st,r.en,P('Bold')); if(r.kind==='==') n.setRangeFills(r.st,r.en,[{type:'SOLID',color:OR}]); } } return id; }
async function plain(id, text){ const n=await node(id); await loadNodeFonts(n); n.characters=text; return id; }
async function addBullet(afterTextId, md){ const t=await node(afterTextId); const bullet=t.parent.parent; const list=bullet.parent; const want=parse(md).out;
  for(const b of list.children){ const tx=b.findAllWithCriteria({types:['TEXT']}).find(x=>x.characters===want); if(tx) return tx.id; }
  const c=bullet.clone(); list.insertChild(list.children.indexOf(bullet)+1,c); const txt=c.findAllWithCriteria({types:['TEXT']}).filter(x=>x.characters.trim().length>1)[0]; return await rich(txt.id, md); }
async function cloneBulletAfter(textId){ const t=await node(textId); const bullet=t.parent.parent; const list=bullet.parent; const c=bullet.clone(); list.insertChild(list.children.indexOf(bullet)+1,c); const txt=c.findAllWithCriteria({types:['TEXT']}).filter(x=>x.characters.trim().length>1)[0]; return txt.id; }
async function reorder(parentId, ids){ const p=await node(parentId); ids.forEach((id,i)=>{ const c=p.children.find(x=>x.id===id); if(!c) throw new Error('child '+id); p.insertChild(i,c); }); }
async function allPretendard(frameId){ const f=await node(frameId); let fixed=0; for(const t of f.findAllWithCriteria({types:['TEXT']})){ const segs=t.getStyledTextSegments(['fontName']); for(const s of segs){ if(s.fontName.family!=='Pretendard'){ const st=s.fontName.style==='Semi Bold'||s.fontName.style==='SemiBold'?'SemiBold':s.fontName.style; let target=P(s.fontName.style); try{ await figma.loadFontAsync(target);}catch(e){ target=P('Regular'); await figma.loadFontAsync(target);} await figma.loadFontAsync(s.fontName); t.setRangeFontName(s.start,s.end,target); fixed++; } } } return fixed; }

// RESUME: file HgErN8Vnin2SQKjUuT4dD9, page 375:4, frames 448:4 / 448:94 / 448:205 (resume_v3_01~03)
async function applyResume(){
  const page=await node('375:4'); await figma.setCurrentPageAsync(page);
  const done=[];
  // ---- page 1
  done.push(await plain('448:8','Server Developer'));
  for (const id of ['448:18','448:19','448:20']) { const t=await node(id); await loadNodeFonts(t); await figma.loadFontAsync(P('Semi Bold')); t.setRangeFontName(0,t.characters.length,P('Semi Bold')); done.push(id); }
  done.push(await rich('448:24','교육 서비스 A&I의 모놀리식 백엔드를 ==5개 서비스==로 나누고, Gateway에서 **141개 API** 권한 정책을 관리했습니다.\n과제 목록 조회의 저장소 호출을 **60→2회**로 줄여, 과제 1,000개 기준 처리량을 ==8.6→50 req/s==로 높였습니다.\n5개 프로젝트에 자동화 테스트 ==1,862개==를 두고, 전체 라인 커버리지 **78%**를 유지하고 있습니다.'));
  done.push(await plain('448:28','Projects'));
  done.push(await rich('448:40','2023년부터 운영 중인 교육 커뮤니티 A&I에서 Web·Gateway 백엔드를 맡았습니다.\n5개 백엔드 저장소에 병합 PR **195건**을 올리며 기능 개발과 리팩터링을 진행했습니다.'));
  done.push(await rich('448:48','개발 인원이 2명→6명으로 늘어 백엔드를 ==5개 서비스==로 나누고, \n과제·채점 연동은 SNS/SQS 이벤트로 바꿨습니다.'));
  done.push(await rich('448:53','과제마다 반복하던 하위 조회를 Batch로 묶어 저장소 호출을 **60→2회**로 줄였고, \n과제 1,000개·50 RPS에서 처리량 ==8.6→50 req/s==, 실패 0건을 확인했습니다.'));
  done.push(await rich('448:58','테스트를 **188→456개**로 늘려 라인 커버리지를 ==78→92%==로 올리고, \nCI 통과 기준도 Line 70→86%로 높였습니다.'));
  done.push(await rich('448:63','테스트와 성능 검증 job을 병렬로 나눠 \nCI 시간을 ==140→109초(-22%)==로 줄였습니다.'));
  done.push(await rich('448:68','==141개 API== 라우팅·권한 정책을 Gateway로 모으고, \n**105개 접근 경로**를 역할별 회귀 테스트로 고정했습니다.'));
  done.push(await rich('448:73','Go로 CloudWatch 로그 조회·Discord 장애 알림 봇을 만들어 \ntraceId 하나로 서비스 간 요청을 추적하게 했습니다.'));
  done.push(await rich('448:83','**Backend**  Kotlin, Java, Spring Boot(WebFlux), Go'));
  done.push(await rich('448:88','**Data**  MongoDB, PostgreSQL, Redis'));
  done.push(await rich('448:93','**Infra·Ops**  AWS EC2·ECR·SNS·SQS·CloudWatch, Docker, GitHub Actions, k6'));
  // ---- page 2: order 디딤로그 → 고찌봄 → SoloPlay → Investopia
  await reorder('448:94',['448:95','448:127','448:125','448:97','448:155','448:182','448:180','448:157']);
  done.push(await rich('448:138','백준 풀이 기록으로 문제를 추천하고 회고를 남기는 알고리즘 학습 서비스입니다.'));
  done.push(await rich('448:144','BOJ 프로필 상태 메시지에 5분짜리 인증 코드를 쓰게 해 \n계정 소유권을 확인했습니다.'));
  done.push(await rich('448:149','문제 3,400건 상세 수집을 4개씩 병렬로 바꿔 ==55.6→12.2초(-78%)==, \n누락·중복 **0건**을 확인했습니다. (로컬 고정 지연 조건)'));
  done.push(await rich('448:154','Redis에 checkpoint와 실패 ID를 남겨, 중단돼도 \n실패·미처리 항목만 다시 수집했습니다.'));
  done.push(await addBullet('448:154','관리자 회원 목록의 N+1을 없애 MongoDB 읽기를 **11→2회**로 줄였습니다.'));
  done.push(await rich('448:114','5인 팀 PM으로 MVP를 "알림 → 사진 한 장 → 보호자 확인" 흐름 하나로 \n좁히고, 어르신이 알림에서 바로 복약 화면에 들어가게 했습니다.'));
  done.push(await rich('448:119','FE 라우트 16개와 API 계약 차이를 **BFF 2개**로 정리해 \n4일 안에 배포까지 마쳤습니다.'));
  done.push(await rich('448:124','AI Re-Local 해커톤 ==혁신상·팀 MVP==를 받았습니다.'));
  done.push(await plain('448:163','팀장 · BE Lead'));
  done.push(await rich('448:174','웹과 Raspberry Pi 주문이 ==같은 매수·매도 로직==을 쓰게 해 \n잔액·보유 수량·평균 매입가 계산을 한 곳으로 모았습니다.'));
  done.push(await rich('448:179','네이버 금융 현재가를 30초마다 수집해 차트와 LCD에 반영했습니다.'));
  done.push(await rich('448:199','Kakao Local 응답을 장소 ID 기준으로 정규화·중복 제거해 \nMongoDB에 먼저 저장했습니다.'));
  done.push(await rich('448:204','Gemini 소개·태그 보강을 후처리로 분리해 \n==AI 호출이 실패해도 장소 원본이 남게== 했습니다.'));
  done.push(await addBullet('448:204','테스트 **99개**로 라인 커버리지 **87%**를 확인하고 CI 통과 기준으로 걸었습니다.'));
  // ---- page 3
  done.push(await plain('448:218','2024.04 - 현재'));
  done.push(await rich('448:224','누적 40명 이상이 참여한 개발 커뮤니티에서 \n테크 세션 **30회** 이상, 네트워킹 **5회** 이상을 열었습니다.'));
  done.push(await rich('448:229','커뮤니티 운영진으로 시작해 A&I.com 백엔드 리드까지 맡게 됐습니다.'));
  done.push(await rich('448:248','트러블슈팅·학습·회고 글 **168편**, 누적 조회 **7,500회** 이상을 기록했습니다.'));
  { const n=await node('448:253'); const seg=n.getStyledTextSegments(['hyperlink'])[0]; const link=seg&&seg.hyperlink; await loadNodeFonts(n); n.characters='대표 글: 테스트를 왜 이렇게 많이 만들게 되었을까 (TDD 회고)'; if(link) n.setRangeHyperlink(0,n.characters.length,link); done.push('448:253'); }
  done.push(await rich('448:272','Java 스타일 가이드와 리뷰 기준을 정리하고, \n동료 피드백을 반영해 미션 코드의 가독성과 구조를 고쳤습니다.'));
  done.push(await rich('448:277','역할을 바꿔 가며 구현하고, 서로의 접근 방식을 비교해 공통 설계 기준을 맞췄습니다.'));
  done.push(await addBullet('448:328','정보처리기사 (2026.12 취득 예정)'));
  const closing = await node('448:331'); closing.visible=false; done.push('448:331 hidden');
  return done;
}

// PORTFOLIO: file XDYFF0ZT7hoXu2q2DoQ52C, page 144:2, frames Final · 01~07 (209:2 ...)
const GRAY={r:0.2784,g:0.3333,b:0.4118}; // #475569
const NAVY={r:0.0588,g:0.0902,b:0.1647}; // #0f172a
async function richKeep(id, md){ const n=await node(id); await loadNodeFonts(n); const seg=n.getStyledTextSegments(['fontName','fills'])[0]; const base=seg.fontName; const fill=seg.fills; await figma.loadFontAsync(P('Bold'));
  const {out,ranges}=parse(md); n.characters=out; n.setRangeFontName(0,out.length,base); n.setRangeFills(0,out.length,fill);
  for(const r of ranges){ n.setRangeFontName(r.st,r.en,P('Bold')); if(r.kind==='==') n.setRangeFills(r.st,r.en,[{type:'SOLID',color:OR}]); } return id; }
async function parts(id, list){ const n=await node(id); await loadNodeFonts(n); const style=n.getStyledTextSegments(['fontName'])[0].fontName; n.characters=list.map(x=>x[0]).join(''); let i=0; for(const [t,c] of list){ n.setRangeFontName(i,i+t.length,style); n.setRangeFills(i,i+t.length,[{type:'SOLID',color:c}]); i+=t.length; } return id; }
async function applyPortfolio(){
  const page=await node('144:2'); await figma.setCurrentPageAsync(page);
  const done=[];
  // 01 cover
  done.push(await plain('209:9','Server Developer'));
  done.push(await parts('209:14',[['5개 서비스',NAVY],['로 나눈 MSA를 Gateway로 운영합니다.',GRAY]]));
  done.push(await parts('209:16',[['개선은 측정한 숫자로 설명합니다.',OR]]));
  done.push(await parts('209:18',[['테스트로 ',GRAY],['리팩터링 전후 동작',NAVY],['을 지킵니다.',GRAY]]));
  done.push(await plain('209:28','MSA 전환, 과제 1,000개 처리량 8.6→50 req/s'));
  done.push(await plain('209:34','디딤로그')); done.push(await plain('209:36','3,400건 수집 55.6→12.2초, 누락·중복 0건')); done.push(await plain('209:38','04'));
  done.push(await plain('209:42','고찌봄')); done.push(await plain('209:44','4일 해커톤 MVP, 혁신상·팀 MVP')); done.push(await plain('209:46','05'));
  done.push(await plain('209:50','SoloPlay')); done.push(await plain('209:52','AI가 실패해도 장소 원본을 지키는 저장 흐름')); done.push(await plain('209:54','06'));
  done.push(await plain('209:58','Investopia')); done.push(await plain('209:60','웹·Raspberry Pi 주문을 하나의 거래 로직으로')); done.push(await plain('209:62','07'));
  // 02 A&I architecture
  done.push(await plain('209:109','2023년부터 운영 중인 A&I의 과제·채점 서비스를 초기 2명이 모놀리식 백엔드로 개발했습니다. 개발 인원이 6명으로 늘면서 기능별 개발·배포 책임을 나눌 필요가 생겼습니다.'));
  done.push(await plain('209:127','5개 서비스의 독립 배포 환경을 만들고, 141개 API 정책을 Gateway에서 관리하며 105개 접근 경로를 회귀 테스트로 고정했습니다.'));
  // 03 A&I query
  done.push(await plain('209:189','60 → 2 / 처리량 8.6 → 50 req/s'));
  done.push(await plain('209:191','Repository 호출 96.67% 감소. 과제 300·1,000개를 50 RPS로 보냈을 때 개선 전은 30.8·8.6 req/s에 그쳤고, 개선 후는 3회 모두 실패·누락 0건으로 50 RPS를 유지했습니다(P95 42·238ms).'));
  done.push(await plain('209:202','과제 1,000개 · 50 RPS 처리량'));
  done.push(await plain('209:204','8.6 → 50 req/s'));
  // 04 디딤로그 (was 05)
  done.push(await plain('209:298','04 / 7'));
  done.push(await plain('209:281','로컬 고정 지연 조건 중앙값 55.632 → 12.226초(-77.96%). 3,400건 누락·중복·실패 0건, 순차·병렬 결과 SHA-256 일치를 확인했습니다.'));
  // 05 고찌봄 (was 04)
  done.push(await plain('209:377','05 / 7'));
  done.push(await plain('209:308','2026.06.30-07.03'));
  done.push(await plain('209:332','알림 → 복약 확인 → 사진 → 보호자 확인으로 흐름을 정하고, 알림에서 복약 화면으로 바로 들어가게 했습니다. FE 라우트 16개와 API 계약 차이는 BFF 2개로 좁혀 구현 범위를 줄였습니다.'));
  // 06 SoloPlay (was 07)
  done.push(await plain('209:435','06 / 7'));
  done.push(await plain('209:423','장소 저장과 AI 처리를 분리해 Gemini가 실패해도 장소 데이터가 남게 했습니다. 테스트 99개로 실패 경로를 고정하고 라인 커버리지 87%를 CI 기준으로 걸었습니다.'));
  // 07 Investopia (was 06)
  done.push(await plain('209:515','07 / 7'));
  return done;
}

(async () => {
  try {
    const pages = figma.root.children.map(p=>p.id);
    let done;
    if (pages.includes('375:4')) done = await applyResume();
    else if (pages.includes('144:2')) done = await applyPortfolio();
    else throw new Error('이 파일은 대상이 아닙니다');
    figma.closePlugin('완료: ' + done.length + '개 수정');
  } catch (e) {
    figma.closePlugin('실패: ' + (e && e.message ? e.message : String(e)));
  }
})();
