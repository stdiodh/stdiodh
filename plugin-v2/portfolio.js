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
  done.push(await plain('209:28','MSA 전환, 과제 1,000개 P95 187→128ms'));
  done.push(await plain('209:34','디딤로그')); done.push(await plain('209:36','3,400건 수집 55.6→12.2초, 누락·중복 0건')); done.push(await plain('209:38','04'));
  done.push(await plain('209:42','고찌봄')); done.push(await plain('209:44','4일 해커톤 1등 혁신상·팀 MVP')); done.push(await plain('209:46','05'));
  done.push(await plain('209:50','SoloPlay')); done.push(await plain('209:52','AI가 실패해도 장소 원본을 지키는 저장 흐름')); done.push(await plain('209:54','06'));
  done.push(await plain('209:58','Investopia')); done.push(await plain('209:60','웹·Raspberry Pi 주문을 하나의 거래 로직으로')); done.push(await plain('209:62','07'));
  // 02 A&I architecture
  done.push(await plain('209:109','2023년부터 운영 중인 A&I의 과제·채점 서비스를 초기 2명이 모놀리식 백엔드로 개발했습니다. 개발 인원이 6명으로 늘면서 기능별 개발·배포 책임을 나눌 필요가 생겼습니다.'));
  done.push(await plain('209:127','5개 서비스의 독립 배포 환경을 만들고, 141개 API 라우팅을 Gateway로 모으고, 권한이 걸린 105개 경로를 역할별 회귀 테스트로 고정했습니다.'));
  // 03 A&I query
  done.push(await plain('209:189','60 → 2 / P95 187 → 128ms'));
  done.push(await plain('209:191','과제 30개 조회 기준 Repository 호출 96.67% 감소. 같은 부하(2분×3회)에서 P95가 과제 1,000개 187→128ms(-31%), 300개 79→48ms(-40%) 줄었습니다.'));
  done.push(await plain('209:202','과제 1,000개 · 5 RPS 동일 부하 P95'));
  done.push(await plain('209:204','187 → 128ms'));
  // 04 디딤로그 (was 05)
  done.push(await plain('209:298','04 / 7'));
  done.push(await plain('209:281','로컬 고정 지연 조건 중앙값 55.632 → 12.226초(-77.96%). 3,400건 누락·중복·실패 0건, 순차·병렬 결과 SHA-256 일치를 확인했습니다.'));
  // 05 고찌봄 (was 04)
  done.push(await plain('209:377','05 / 7'));
  done.push(await plain('209:308','2026.06.30-07.03'));
  done.push(await plain('209:332','알림 → 복약 확인 → 사진 → 보호자 확인으로 흐름을 정하고, 알림에서 복약 화면으로 바로 들어가게 했습니다. FE 라우트 16개와 API 계약 차이는 BFF 2개로 좁혀 구현 범위를 줄였습니다.'));
  // 06 SoloPlay (was 07)
  done.push(await plain('209:435','06 / 7'));
  done.push(await plain('209:423','장소를 먼저 저장하고 AI 보강은 비동기로 처리하도록 설계해 Gemini가 실패해도 장소 데이터가 남게 했습니다. 테스트 99개로 실패 경로를 고정하고 라인 커버리지 87%를 CI 기준으로 걸었습니다.'));
  // 07 Investopia (was 06)
  done.push(await plain('209:515','07 / 7'));
  done.push(await plain('209:467','종료 뒤 중복 계산을 한 함수로 모았습니다'));
  done.push(await plain('209:469','프로젝트 때는 웹 폼과 REST API가 평균 매입가를 따로 계산했습니다. 2026.07에 테스트를 붙이며 _buy·_sell로 모아 두 경로가 같은 계산을 쓰게 했습니다.'));
  done.push(await plain('209:475','웹과 Raspberry Pi 주문이 모두 서버를 거쳐 현금·보유 수량·평균 매입가·현재가를 같은 DB 상태로 공유했습니다.'));
  return done;
}
