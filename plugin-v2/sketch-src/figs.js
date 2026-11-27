const FIGS = {
ev: { w:874, h:418, draw(){
  const L=[40,190], M=[352,170], R=[650,184], hh=56;
  const rows=[70,200,320];
  // row A: Web 과제 저장 -> SNS/SQS -> 채점 서버
  label(L[0],rows[0]-hh/2,L[1],hh,'Web · 과제 저장',{c:BLUE});
  label(M[0],rows[0]-hh/2,M[1],hh,'SNS → SQS');
  label(R[0],rows[0]-hh/2,R[1],hh,'채점 서버');
  arrow(L[0]+L[1]+6,rows[0],M[0]-6,rows[0],{label:'테스트케이스'});
  arrow(M[0]+M[1]+6,rows[0],R[0]-6,rows[0]);
  xmark((M[0]+M[1]+R[0])/2,rows[0],7);
  note((M[0]+M[1]+R[0])/2+14,rows[0]+48,'① 입력 형식이 달랐음\n문자열 하나 ↔ 인자 목록',{c:RED,a:'middle'});
  // row B: 인증 서버 -> SNS/SQS -> Web 회원 정보
  label(R[0],rows[1]-hh/2,R[1],hh,'인증 서버');
  label(M[0],rows[1]-hh/2,M[1],hh,'SNS → SQS');
  label(L[0],rows[1]-hh/2,L[1],hh,'Web · 회원 정보',{c:BLUE});
  arrow(R[0]-6,rows[1],M[0]+M[1]+6,rows[1],{label:'회원 이벤트'});
  arrow(M[0]-6,rows[1],L[0]+L[1]+6,rows[1]);
  xmark((L[0]+L[1]+M[0])/2,rows[1],7);
  note((L[0]+L[1]+M[0])/2,rows[1]+46,'② 필드 이름이 달랐음\ntype ↔ eventType',{c:RED});
  // row C: 채점 서버 -> SNS/SQS -> Web 결과 사본 -> 관리자 화면
  label(R[0],rows[2]-hh/2,R[1],hh,'채점 서버 · 채점 완료');
  label(M[0],rows[2]-hh/2,M[1],hh,'SNS → SQS');
  label(L[0],rows[2]-hh/2,L[1],hh,'Web · 결과 사본',{c:BLUE});
  arrow(R[0]-6,rows[2],M[0]+M[1]+6,rows[2]);
  arrow(M[0]-6,rows[2],L[0]+L[1]+6,rows[2]);
  arrow(L[0]+L[1]/2,rows[2]+hh/2+4,L[0]+L[1]/2,rows[2]+hh/2+34);
  text(L[0]+L[1]/2,rows[2]+hh/2+48,'관리자 화면은 여기만 읽음',{size:13,w:600,c:INK});
  // 남은 것
  box(L[0]-12,rows[0]-hh/2-12,L[1]+24,hh+24,{dash:true,c:SLATE,sw:1.2,r:12});
  note(L[0]-8,rows[0]-hh/2-24,'남은 것: 저장과 발행이 한 번에 묶이지 않음',{a:'start'});
  // legend
  xmark(R[0]+12,400,5); note(R[0]+24,400,'장애가 났던 곳',{a:'start'});
  line(R[0]+112,400,R[0]+132,400,{dash:true,c:SLATE,sw:1.2}); note(R[0]+138,400,'남은 것',{a:'start'});
}},
batch: { w:874, h:418, draw(){
  text(40,34,'전',{size:16,w:700,a:'start'}); text(476,34,'후',{size:16,w:700,a:'start',c:BLUE});
  const ys=[78,132,0,238]; const names=['과제 1','과제 2','','과제 30'];
  const dbx=330, dby=158;
  ys.forEach((y,i)=>{ if(!names[i]) { text(110,190,'⋮',{size:22,w:700}); return; }
    label(55,y-17,110,34,names[i],{size:13});
    path([[171,y-6],[250,y-20+ (dby-y)*0.35],[dbx-26,dby-8]],{arrow:true,sw:1.3});
    path([[171,y+6],[250,y+14+(dby-y)*0.35],[dbx-26,dby+8]],{arrow:true,sw:1.3}); });
  db(dbx+6,dby,46,56);
  note(200,310,'과제마다 요구사항·테스트케이스를\n따로 읽음 → 과제가 늘면 조회도 늘어남',{size:13});
  line(437,40,437,380,{dash:true,c:FAINT,sw:1.2});
  label(490,118,140,80,'과제 ID\n한 번에 모으기',{c:BLUE,size:13});
  db(800,158,46,56);
  arrow(636,140,770,140,{label:'요구사항 한 번',c:BLUE,ly:-10});
  arrow(636,178,770,178,{label:'테스트케이스 한 번',c:BLUE,ly:14});
  check(560,300,8); text(578,300,'과제가 늘어도 2번',{size:15,w:700,a:'start'});
  note(578,330,'바꾸기 전 응답 순서를 테스트로 먼저 남김',{a:'start'});
}},
gw: { w:874, h:418, draw(){
  text(40,30,'전',{size:16,w:700,a:'start'});
  label(40,56,170,58,'설정 파일\nAPI 경로',{size:13});
  label(40,150,170,58,'필터 코드\n권한 규칙',{size:13});
  line(125,118,125,146,{dash:true,c:SLATE,sw:1.2});
  note(232,132,'따로 고쳐서\n빠뜨리기 쉬움',{a:'start',c:SLATE});
  arrow(330,132,400,132,{label:'한 곳으로',c:BLUE});
  text(420,30,'후',{size:16,w:700,a:'start',c:BLUE});
  label(420,92,170,80,'한 목록\n경로 + 권한',{c:BLUE,size:14});
  arrow(596,132,650,132);
  label(656,104,110,56,'Gateway',{size:14});
  arrow(772,132,812,132); note(838,124,'허용한\nAPI만',{size:12,a:'middle'});
  // steps
  line(40,236,834,236,{dash:true,c:FAINT,sw:1.1});
  const sx=[40,240,440]; const st=['① 지금 동작을\n테스트로 적기','② 새 목록을\n테스트에서만 돌리기','③ 운영 코드\n바꾸기'];
  st.forEach((s,i)=>{ label(sx[i],270,170,60,s,{size:13,w:600}); if(i<2) arrow(sx[i]+176,300,sx[i+1]-6,300); });
  arrow(616,300,656,300);
  check(672,300,8); text(690,292,'판정 전 = 후',{size:15,w:700,a:'start'}); note(690,316,'사용자 5종으로 확인',{a:'start'});
}},
bot: { w:874, h:418, draw(){
  text(40,30,'전',{size:16,w:700,a:'start'});
  label(40,54,90,46,'EC2',{size:13});
  [0,1,2].forEach(i=>{ label(170,48+i*40,110,30,'컨테이너 로그',{size:11,w:500,c:SLATE}); });
  arrow(134,77,164,63,{sw:1.2}); arrow(134,77,164,103,{sw:1.2}); arrow(134,77,164,143,{sw:1.2});
  note(160,190,'접속해서 하나씩 열어 봄',{size:12});
  line(320,40,320,380,{dash:true,c:FAINT,sw:1.1});
  text(350,30,'후',{size:16,w:700,a:'start',c:BLUE});
  note(372,76,'요청',{size:13,c:INK});
  const xs=[410,560,710], ns=['Gateway','Web','채점 서버'];
  arrow(386,76,404,76);
  xs.forEach((x,i)=>{ label(x,54,120,44,ns[i],{size:13}); if(i<2) arrow(x+124,76,xs[i+1]-6,76);
    text(x+60,116,'trace a1b2',{size:11,w:600,c:BLUE});
    path([[x+60,128],[x+60+(600-x)*0.2,190],[690,228]],{dash:true,c:SLATE,sw:1.1}); });
  note(830,30,'Gateway가 요청마다 같은 traceId를 붙임',{a:'end'});
  label(350,250,170,64,'Discord\n/ops trace a1b2',{c:BLUE,size:13});
  arrow(526,282,566,282,{c:BLUE});
  box(572,232,262,130,{r:8});
  text(588,256,'시간 순서로 모인 로그',{size:12,w:600,a:'start',c:SLATE});
  [['Gateway','요청 받음'],['Web','채점 요청'],['채점 서버','타임아웃']].forEach(([a,b],i)=>{ text(590,286+i*26,a,{size:13,w:600,a:'start'}); text(700,286+i*26,b,{size:13,w:500,a:'start',c:i==2?RED:INK}); });
  note(40,392,'봇은 조회만 함 · 토큰과 요청 본문은 남기지 않음 · 예시 값',{a:'start'});
}},
tests: { w:874, h:418, draw(){
  const base=340, x0=90, bw=60, gap=62, vals=[188,277,338,388,456,602], labs=['시작','1차','2차','3차','정리 후','빈 분기 채움'];
  line(60,base,840,base,{sw:1.4});
  vals.forEach((v,i)=>{ const h=Math.round(v/602*230), x=x0+i*(bw+gap), last=i===vals.length-1;
    box(x,base-h,bw,h,{r:3,c:last?BLUE:INK,fill:last?'#93C5FD':'#CBD5E1',gap:6});
    text(x+bw/2,base+20,labs[i],{size:13,w:600,c:last?BLUE:INK});
    if(i===0||last) text(x+bw/2,base-h-16,v+'개',{size:15,w:700,c:last?BLUE:INK}); });
  for(let i=0;i<4;i++){ const xa=x0+i*(bw+gap)+bw+4, xb=x0+(i+1)*(bw+gap)-4; const ya=base-Math.round(vals[i]/602*230)-8, yb=base-Math.round(vals[i+1]/602*230)-8; path([[xa,ya],[(xa+xb)/2,Math.min(ya,yb)-18],[xb,yb]],{arrow:true,sw:1.1,c:SLATE}); }
  note(70,40,'한 단계를 바꿀 때마다 전체 테스트가 통과해야 다음 단계로',{a:'start',size:13,c:INK,w:600});
  note(70,62,'커버리지가 기준보다 낮으면 배포가 막히고, 테스트가 늘면 기준도 올림',{a:'start'});
}},
'didim-admin': { w:874, h:418, draw(){
  const X=[200,440,680], ox=110, oy=340, sy=24; const yb=[2,6,11], ya=[2,2,2];
  line(ox,oy,800,oy,{sw:1.4}); line(ox,oy,ox,40,{sw:1.4});
  text(ox-8,30,'DB 읽기 횟수',{size:13,w:600,a:'start'}); text(800,oy+44,'한 페이지 회원 수',{size:13,w:600,a:'end'});
  X.forEach((x,i)=>text(x,oy+20,['1명','5명','10명'][i],{size:13,w:600}));
  [2,6,11].forEach(v=>{ text(ox-14,oy-v*sy,String(v),{size:12,c:SLATE,a:'end'}); line(ox-4,oy-v*sy,ox+4,oy-v*sy,{sw:1}); });
  poly(X.map((x,i)=>[x,oy-yb[i]*sy]),{c:INK,sw:1.8}); X.forEach((x,i)=>circle(x,oy-yb[i]*sy,9,{fill:INK,c:INK}));
  poly(X.map((x,i)=>[x,oy-ya[i]*sy]),{c:BLUE,sw:2.4}); X.forEach((x,i)=>circle(x,oy-ya[i]*sy,9,{fill:BLUE,c:BLUE}));
  note(696,oy-11*sy,'전: 회원마다 회고 수를\n한 번씩 더 읽음',{a:'start',c:INK,size:13});
  note(696,oy-2*sy-26,'후: 항상 2번',{a:'start',c:BLUE,size:14,w:700});
}},
'didim-split': { w:874, h:418, draw(){
  box(40,70,200,280,{r:8});
  text(140,96,'수집 서비스 한 파일',{size:14,w:700});
  for(let i=0;i<10;i++) line(62,128+i*21,62+[150,120,140,90,155,110,135,80,150,120][i],128+i*21,{c:FAINT,sw:2});
  note(140,374,'상태 저장 · 다시 시도 · 작업 점유 · 통계',{size:12});
  arrow(256,210,320,210,{label:'역할별로',c:BLUE});
  label(392,40,474,48,'원래 서비스: 각 클래스에 일을 넘기기만',{c:BLUE,size:14});
  const names=['대상 수집','재시도 계획','작업 점유','상태 저장','Redis 스크립트','대상 목록','작업 시작','상태 조회','대상 검증','실행 루프','상태 계산','감사 로그','Redis 키'];
  line(629,92,629,112,{c:BLUE});
  names.forEach((n,i)=>{ const c=i%5, r=Math.floor(i/5); label(392+c*96,120+r*72,90,52,n,{size:13,w:600}); });
  note(629,370,'역할 하나를 옮길 때마다 커밋 하나, 같은 테스트로 확인',{size:12});
}},
'didim-collect': { w:836, h:458, draw(){
  text(36,30,'전',{size:16,w:700,a:'start'});
  const ids=['1001','1002','1003','1004','1005'];
  [[60,78],[152,182],[256,286],[360,390],[464,494],[568,640]].forEach(([a,b])=>line(a,110,b,110,{sw:1.4})); head(60,110,650,110,INK,1.4);
  ids.forEach((s,i)=>{ const x=80+i*104; if(i===2){ label(x,140,70,34,s,{size:12,c:RED}); xmark(x+35,192,6); arrow(x+35,102,x+35,134,{c:RED,dash:true,sw:1.2}); } else label(x,92,70,36,s,{size:12}); });
  db(708,110,50,58,'저장');
  note(80,66,'"어디까지 했는지"만 저장',{a:'start'});
  note(300,224,'실패한 문제는 다시 시도해도 빠짐',{a:'start',c:RED});
  line(30,250,806,250,{dash:true,c:FAINT,sw:1.1});
  text(36,282,'후',{size:16,w:700,a:'start',c:BLUE});
  [[60,78],[152,182],[256,286],[360,390],[464,494],[568,640]].forEach(([a,b])=>line(a,340,b,340,{sw:1.4})); head(60,340,650,340,INK,1.4);
  ids.forEach((s,i)=>{ const x=80+i*104; label(x,322,70,36,s,{size:12,c:i===2?BLUE:INK}); });
  label(250,392,170,44,'실패 목록 (Redis)',{c:BLUE,size:13});
  path([[323,362],[318,376],[312,390]],{arrow:true,c:BLUE,sw:1.3});
  path([[420,414],[470,404],[500,366]],{arrow:true,c:BLUE,sw:1.3}); note(520,402,'그 문제만 다시 수집',{a:'start',c:BLUE});
  db(708,340,50,58,'저장');
  [0,1,2,3].forEach(i=>arrow(650,316+i*16,680,316+i*16,{sw:1.1,c:BLUE}));
  note(560,290,'빠지지 않는 걸 확인한 뒤 4개씩 동시에',{a:'start',c:INK,w:600});
}},
soloplay: { w:310, h:525, draw(){
  const x=40,w=230,h=52;
  label(x,30,w,h,'카카오 장소 검색',{size:14});
  arrow(155,86,155,112);
  label(x,116,w,h,'장소 ID로 중복 정리',{size:14});
  arrow(155,172,155,198);
  label(x,202,w,h,'MongoDB에 먼저 저장',{size:14,c:GREEN});
  note(148,280,'장소는 여기서 남음',{c:GREEN,w:600}); check(216,277,6);
  line(155,296,155,334,{dash:true,c:SLATE,sw:1.3}); head(155,296,155,338,SLATE,1.3);
  note(165,318,'저장이 끝난 뒤 따로',{a:'start'});
  label(x,344,w,h+6,'Gemini 소개·태그',{size:14,dash:true,c:SLATE});
  xmark(272,346,6); note(155,428,'실패해도 장소 저장엔\n영향 없음',{c:RED});

}},
'didim-intro': { w:894, h:503, draw(){
  const X=[24,315,606], W=264, H=211, Y=60;
  const keys=['didim-01-solve','didim-02-retrospective','didim-03-dashboard'];
  const T=['풀이 기록','회고','다음 문제 추천'], N=['코드와 걸린 시간을 남김','무엇을 왜 바꿨는지 적음','약한 분야의 문제를 추천'];
  X.forEach((x,i)=>{ text(x+W/2,38,T[i],{size:16,w:700,c:i===2?BLUE:INK}); shot(x,Y,W,H,keys[i],{c:i===2?BLUE:INK,meet:i===0?'#111827':undefined});
    note(x+W/2,Y+H+30,N[i],{size:13}); if(i<2) arrow(x+W+6,Y+H/2,X[i+1]-8,Y+H/2,{sw:1.8}); });
  path([[X[2]+W/2,Y+H+50],[X[2]+W/2-40,Y+H+110],[447,Y+H+132],[X[0]+W/2+40,Y+H+110],[X[0]+W/2,Y+H+54]],{arrow:true,c:BLUE,sw:1.6});
  text(447,Y+H+160,'추천받은 문제를 다시 풀고 기록',{size:14,w:600,c:BLUE});
  note(447,482,'로컬 Docker · 테스트 계정 · 고정 응답으로 찍은 화면',{size:11});
}},
};
