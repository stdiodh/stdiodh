const FIGS = {
ev: { w:874, h:418, draw(){
  const L=[40,190], M=[352,170], R=[650,184], hh=56;
  const rows=[70,200,320];
  // row A: Web 과제 저장 -> SNS/SQS -> 채점 서버
  label(L[0],rows[0]-hh/2,L[1],hh,'Web · 과제 저장',{c:BLUE,icon:'assign'});
  label(M[0],rows[0]-hh/2,M[1],hh,'SNS → SQS',{icon:'queue'});
  label(R[0],rows[0]-hh/2,R[1],hh,'채점 서버',{icon:'judge'});
  arrow(L[0]+L[1]+6,rows[0],M[0]-6,rows[0],{label:'테스트케이스'});
  arrow(M[0]+M[1]+6,rows[0],R[0]-6,rows[0]);
  xmark((M[0]+M[1]+R[0])/2,rows[0],7);
  note((M[0]+M[1]+R[0])/2+14,rows[0]+48,'① 입력 형식이 달랐음\n문자열 하나 ↔ 인자 목록',{c:RED,a:'middle'});
  // row B: 인증 서버 -> SNS/SQS -> Web 회원 정보
  label(R[0],rows[1]-hh/2,R[1],hh,'인증 서버',{icon:'auth'});
  label(M[0],rows[1]-hh/2,M[1],hh,'SNS → SQS',{icon:'queue'});
  label(L[0],rows[1]-hh/2,L[1],hh,'Web · 회원 정보',{c:BLUE,icon:'assign'});
  arrow(R[0]-6,rows[1],M[0]+M[1]+6,rows[1],{label:'회원 이벤트'});
  arrow(M[0]-6,rows[1],L[0]+L[1]+6,rows[1]);
  xmark((L[0]+L[1]+M[0])/2,rows[1],7);
  note((L[0]+L[1]+M[0])/2,rows[1]+46,'② 필드 이름이 달랐음\ntype ↔ eventType',{c:RED});
  // row C: 채점 서버 -> SNS/SQS -> Web 결과 사본 -> 관리자 화면
  label(R[0],rows[2]-hh/2,R[1],hh,'채점 서버 · 채점 완료',{icon:'judge'});
  label(M[0],rows[2]-hh/2,M[1],hh,'SNS → SQS',{icon:'queue'});
  label(L[0],rows[2]-hh/2,L[1],hh,'Web · 결과 사본',{c:BLUE,icon:'assign'});
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
  const base=330;
  text(250,44,'P95 응답 시간',{size:15,w:700});
  [[79,48,'과제 300개'],[187,128,'과제 1,000개']].forEach(([a,b,l],k)=>{ const x0=90+k*230;
    [a,b].forEach((v,i)=>{ const h=Math.round(v/187*200), x=x0+i*80, B=i===1;
      box(x,base-h,62,h,{r:3,c:B?BLUE:INK,fill:B?'#93C5FD':'#CBD5E1',gap:6});
      text(x+31,base-h-18,v+'ms',{size:16,w:700,c:B?BLUE:INK}); text(x+31,base+22,B?'후':'전',{size:14,w:600,c:B?BLUE:SLATE}); });
    text(x0+71,base+52,l,{size:14,w:600}); });
  line(70,base,480,base,{sw:1.4});
  line(540,60,540,380,{dash:true,c:FAINT,sw:1.1});
  text(700,44,'초당 50건을 보낼 때 처리량',{size:15,w:700});
  [[8.6,'8.6건'],[49.9,'50건']].forEach(([v,l],i)=>{ const h=Math.round(v/50*200), x=620+i*100, B=i===1;
    box(x,base-h,62,h,{r:3,c:B?BLUE:INK,fill:B?'#93C5FD':'#CBD5E1',gap:6});
    text(x+31,base-h-18,l,{size:16,w:700,c:B?BLUE:INK}); text(x+31,base+22,B?'후':'전',{size:14,w:600,c:B?BLUE:SLATE}); });
  line(600,base,800,base,{sw:1.4});
}},
gw: { w:874, h:418, draw(){
  text(60,70,'전',{size:16,w:700,a:'start'});
  label(60,100,190,64,'설정 파일\nAPI 경로',{size:14,icon:'file'});
  label(60,236,190,64,'필터 코드\n권한 규칙',{size:14,icon:'lock'});
  line(155,170,155,230,{dash:true,c:SLATE,sw:1.2});
  path([[256,132],[300,160],[330,196]],{c:BLUE,sw:1.6}); path([[256,268],[300,240],[330,206]],{c:BLUE,sw:1.6});
  arrow(330,200,392,200,{c:BLUE,sw:1.6});
  text(410,70,'후',{size:16,w:700,a:'start',c:BLUE});
  label(410,156,190,88,'한 목록\n경로 + 권한',{c:BLUE,size:15});
  arrow(606,200,652,200);
  label(654,172,148,56,'Gateway',{size:15,icon:'gateway'});
  note(728,262,'허용한 API만 통과',{size:14,c:INK,w:600});
}},
bot: { w:874, h:418, draw(){
  text(40,30,'전',{size:16,w:700,a:'start'});
  label(40,54,90,46,'EC2',{size:13,icon:'server'});
  [0,1,2].forEach(i=>{ label(170,48+i*40,110,30,'컨테이너 로그',{size:11,w:500,c:SLATE}); });
  arrow(134,77,164,63,{sw:1.2}); arrow(134,77,164,103,{sw:1.2}); arrow(134,77,164,143,{sw:1.2});
  note(160,190,'접속해서 하나씩 열어 봄',{size:12});
  line(320,40,320,380,{dash:true,c:FAINT,sw:1.1});
  text(350,30,'후',{size:16,w:700,a:'start',c:BLUE});
  note(372,76,'요청',{size:13,c:INK});
  const xs=[410,560,710], ns=['Gateway','Web','채점 서버'];
  arrow(386,76,404,76);
  const BI=['gateway','assign','judge']; xs.forEach((x,i)=>{ label(x,54,120,44,ns[i],{size:13,icon:BI[i],is:20}); if(i<2) arrow(x+124,76,xs[i+1]-6,76);
    text(x+60,116,'trace a1b2',{size:11,w:600,c:BLUE});
    path([[x+60,128],[x+60+(600-x)*0.2,190],[690,228]],{dash:true,c:SLATE,sw:1.1}); });
  note(830,30,'Gateway가 요청마다 같은 traceId를 붙임',{a:'end'});
  label(350,250,170,64,'Discord\n/ops trace a1b2',{c:BLUE,size:13,icon:'chat',is:22});
  arrow(526,282,566,282,{c:BLUE});
  box(572,232,262,130,{r:8});
  text(588,256,'시간 순서로 모인 로그',{size:12,w:600,a:'start',c:SLATE});
  [['Gateway','요청 받음'],['Web','채점 요청'],['채점 서버','타임아웃']].forEach(([a,b],i)=>{ text(590,286+i*26,a,{size:13,w:600,a:'start'}); text(700,286+i*26,b,{size:13,w:500,a:'start',c:i==2?RED:INK}); });
}},
tests: { w:874, h:418, draw(){
  const base=318;
  const P=[[188,602,'188개','602개','테스트 수',602],[749,185,'749줄','185줄','과제 클래스',749],[140,109,'140초','109초','CI 시간',140]];
  P.forEach(([a,b,la,lb,t,m],k)=>{ const x0=70+k*270;
    text(x0+80,52,t,{size:15,w:700});
    [a,b].forEach((v,i)=>{ const h=Math.round(v/m*200), x=x0+i*96, B=i===1;
      box(x,base-h,64,h,{r:3,c:B?BLUE:INK,fill:B?'#93C5FD':'#CBD5E1',gap:6});
      text(x+32,base-h-18,i?lb:la,{size:16,w:700,c:B?BLUE:INK}); text(x+32,base+22,B?'후':'전',{size:14,w:600,c:B?BLUE:SLATE}); });
    line(x0-16,base,x0+176,base,{sw:1.4}); });
}},
'didim-admin': { w:874, h:418, draw(){
  const X=[200,440,680], ox=110, oy=340, sy=24; const yb=[2,6,11], ya=[2,2,2];
  line(ox,oy,800,oy,{sw:1.4}); line(ox,oy,ox,40,{sw:1.4});
  text(ox-8,30,'DB 읽기 횟수',{size:13,w:600,a:'start'}); text(800,oy+44,'한 페이지 회원 수',{size:13,w:600,a:'end'});
  X.forEach((x,i)=>text(x,oy+20,['1명','5명','10명'][i],{size:13,w:600}));
  [2,6,11].forEach(v=>{ text(ox-14,oy-v*sy,String(v),{size:12,c:SLATE,a:'end'}); line(ox-4,oy-v*sy,ox+4,oy-v*sy,{sw:1}); });
  poly(X.map((x,i)=>[x,oy-yb[i]*sy]),{c:INK,sw:1.8}); X.forEach((x,i)=>circle(x,oy-yb[i]*sy,9,{fill:INK,c:INK}));
  poly(X.map((x,i)=>[x,oy-ya[i]*sy]),{c:BLUE,sw:2.4}); X.forEach((x,i)=>circle(x,oy-ya[i]*sy,9,{fill:BLUE,c:BLUE}));
  note(700,oy-11*sy,'전',{a:'start',c:INK,size:15,w:700});
  note(700,oy-2*sy-26,'후: 항상 2번',{a:'start',c:BLUE,size:15,w:700});
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
  note(590,290,'4개씩 동시에',{a:'start',c:INK,w:600,size:14});
}},
soloplay: { w:310, h:525, draw(){
  const x=40,w=230,h=52;
  label(x,30,w,h,'카카오 장소 검색',{size:14,icon:'search',is:20});
  arrow(155,86,155,112);
  label(x,116,w,h,'장소 ID로 중복 정리',{size:14,icon:'map',is:20});
  arrow(155,172,155,198);
  label(x,202,w,h,'MongoDB에 먼저 저장',{size:14,c:BLUE,icon:'mongodb',is:22,solid:true});
  note(148,280,'장소는 여기서 남음',{c:BLUE,w:600}); check(216,277,6);
  line(155,296,155,334,{dash:true,c:SLATE,sw:1.3}); head(155,296,155,338,SLATE,1.3);
  note(165,318,'저장이 끝난 뒤 따로',{a:'start'});
  label(x,344,w,h+6,'Gemini 소개·태그',{size:14,dash:true,c:SLATE,icon:'sparkle',is:20});
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
}},
arch: { w:894, h:503, draw(){
  label(4,40,146,54,'Firebase Hosting\n웹 화면',{size:13,w:600,c:SLATE,icon:'firebase',is:20,solid:true});
  icon(44,158,36,'user'); text(62,214,'사용자',{size:15,w:700});
  arrow(62,148,70,100,{sw:1.4,c:SLATE});
  arrow(96,190,170,190); text(124,174,'API 요청',{size:12,w:600,c:SLATE});
  box(156,10,728,356,{dash:true,c:SLATE,sw:1.3}); icon(174,22,24,'cloud',{c:SLATE}); text(204,34,'AWS',{size:14,w:700,a:'start',c:SLATE});
  label(176,163,90,54,'Nginx',{size:14,icon:'nginx',is:20});
  arrow(268,190,290,190);
  label(290,157,128,66,'Gateway',{size:16,c:BLUE,icon:'gateway',is:22});
  line(422,190,446,190,{sw:1.4});
  const S=[['인증 서버','/auth','auth'],['과제 서버 (Web)','/assign','assign'],['채점 서버','/judge','judge'],['블로그 서버','/blog','blog']];
  const ys=S.map((_,i)=>52+i*62+22);
  line(446,ys[0],446,ys[3],{sw:1.4});
  S.forEach(([n,r,ic],i)=>{ const y=52+i*62; label(526,y,160,44,n,{size:14,c:i===1?BLUE:INK,icon:ic,is:20}); arrow(446,y+22,520,y+22,{sw:1.3}); text(486,y+10,r,{size:12,w:600,c:SLATE}); });
  [['PostgreSQL',84,'postgresql'],['MongoDB',164,'mongodb'],['Redis',244,'fast']].forEach(([n,y,ic])=>{ db(730,y,32,40,''); icon(756,y-12,24,ic,{solid:true}); text(786,y,n,{size:13,w:600,a:'start'}); });
  line(172,300,868,300,{dash:true,c:FAINT,sw:1.1});
  text(176,333,'이벤트',{size:14,w:700,a:'start',c:SLATE});
  const E=[['과제 서버','SNS → SQS','채점 서버'],['채점 서버','SNS → SQS','과제 서버']];
  line(556,312,556,356,{dash:true,c:SLATE,sw:1.1});
  E.forEach((e,i)=>{ const x=236+i*332, y=316; label(x,y,80,34,e[0],{size:12,w:600,c:i?INK:BLUE}); arrow(x+84,y+17,x+104,y+17,{sw:1.2});
    label(x+108,y,92,34,e[1],{size:12,w:600}); arrow(x+204,y+17,x+222,y+17,{sw:1.2}); label(x+226,y,80,34,e[2],{size:12,w:600,c:i?BLUE:INK}); });
  const C=['GitHub 저장소 5개','GitHub Actions\n빌드·테스트','Amazon ECR','서비스별 EC2\nDocker Compose'], CI=['github','ci','registry','container'];
  C.forEach((c,i)=>{ const x=176+i*180, w=152; label(x,414,w,58,c,{size:13,w:600,icon:CI[i],is:20}); if(i<3) arrow(x+w+4,443,x+176,443,{sw:1.3}); });
  arrow(792,410,792,370,{sw:1.3});
}},
cover: { w:640, h:520, draw(){
  text(70,260,'사용자',{size:15,w:700}); circle(70,224,30,{});
  arrow(104,240,186,240);
  label(190,204,150,72,'Gateway',{size:18,c:BLUE});
  const N=['인증','과제 (Web)','채점','블로그'];
  N.forEach((n,i)=>{ const y=80+i*100; label(420,y,170,56,n,{size:16,c:i===1?BLUE:INK}); path([[344,240],[380,240],[396,y+28],[414,y+28]],{arrow:true,sw:1.4}); });
}},
};
