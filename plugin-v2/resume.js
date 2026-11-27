// RESUME: file HgErN8Vnin2SQKjUuT4dD9, page 375:4, frames 448:4 / 448:94 / 448:205 (resume_v3_01~03)
async function applyResume(){
  const page=await node('375:4'); await figma.setCurrentPageAsync(page);
  const done=[];
  // ---- page 1
  done.push(await plain('448:8','Server Developer'));
  for (const id of ['448:18','448:19','448:20']) { const t=await node(id); await loadNodeFonts(t); const sb=await semiBold(); t.setRangeFontName(0,t.characters.length,sb); done.push(id); }
  done.push(await rich('448:24','느린 곳은 같은 조건에서 다시 재고, 고친 뒤에는 테스트로 동작을 지킵니다.\n5개 프로젝트에 자동화 테스트 ==2,413개==를 두고, 전체 라인 커버리지 약 **90%**(89.95%)를 확인했습니다.'));
  done.push(await plain('448:28','Projects'));
  done.push(await rich('448:40','2023년부터 운영 중인 교육 커뮤니티 A&I에서 Web·Gateway 백엔드를 맡았습니다.\n5개 백엔드 저장소에 병합 PR **195건**을 올리며 기능 개발과 리팩터링을 진행했습니다.'));
  done.push(await rich('448:48','개발 인원이 2명→6명으로 늘어 백엔드를 ==5개 서비스==로 나누고, \n과제·채점 연동은 SNS/SQS 이벤트로 바꿨습니다.'));
  done.push(await rich('448:53','과제마다 반복하던 하위 조회를 Batch로 묶어 저장소 호출을 **60→2회**(과제 30개)로 줄이고, \n같은 부하에서 과제 1,000개 조회 P95를 ==187→128ms(-31%)==로 낮췄습니다.'));
  done.push(await rich('448:58','테스트를 **188→602개**로 늘려 라인 커버리지를 ==97%==까지 올리고, \nCI 통과 기준도 Line 70→86%로 높였습니다.'));
  done.push(await rich('448:63','테스트와 성능 검증 job을 병렬로 나눠 \nCI 시간을 ==140→109초(-22%)==로 줄였습니다.'));
  done.push(await rich('448:68','==141개 API== 라우팅을 Gateway로 모으고, \n권한이 걸린 **105개 경로**를 역할별 회귀 테스트로 고정했습니다.'));
  done.push(await rich('448:73','Go로 CloudWatch 로그 조회·Discord 장애 알림 봇을 만들어 \nGateway가 붙인 traceId 하나로 여러 서비스 로그를 함께 조회하게 했습니다.'));
  done.push(await rich('448:83','**Backend**  Kotlin, Java, Spring Boot(WebFlux), Go'));
  done.push(await rich('448:88','**Data**  MongoDB, PostgreSQL, Redis'));
  done.push(await rich('448:93','**Infra·Ops**  AWS EC2·ECR·SNS·SQS·CloudWatch, Docker, GitHub Actions, k6'));
  // ---- page 2: order 디딤로그 → 고찌봄 → SoloPlay → Investopia
  await reorder('448:94',['448:95','448:127','448:125','448:97','448:155','448:182','448:180','448:157']);
  done.push(await rich('448:138','백준 풀이 기록으로 문제를 추천하고 회고를 남기는 알고리즘 학습 서비스입니다.'));
  done.push(await rich('448:144','BOJ 프로필 상태 메시지에 5분짜리 인증 코드를 쓰게 해 \n계정 소유권을 확인했습니다.'));
  done.push(await rich('448:149','문제 3,400건 상세 수집을 4개씩 병렬로 바꿔 같은 조건에서\n==55.6→12.2초(-78%)==로 줄였고, 누락·중복 **0건**을 확인했습니다.'));
  done.push(await rich('448:154','Redis에 checkpoint와 실패 ID를 남겨, 중단돼도 \n실패·미처리 항목만 다시 수집했습니다.'));
  done.push(await addBullet('448:154','관리자 회원 목록의 N+1을 없애 MongoDB 읽기를 **11→2회**로 줄였습니다.'));
  done.push(await rich('448:114','5인 팀 PM으로 MVP를 "알림 → 사진 한 장 → 보호자 확인" 흐름 하나로 \n좁히고, 어르신이 알림에서 바로 복약 화면에 들어가게 했습니다.'));
  done.push(await rich('448:119','FE 라우트 16개와 API 계약 차이를 **BFF 2개**로 정리해 \n4일 안에 배포까지 마쳤습니다.'));
  done.push(await rich('448:124','빛나는 인재 AI Re-Local 해커톤에서 ==1등 혁신상==을 받고 팀 MVP로 뽑혔습니다.'));
  done.push(await plain('448:163','팀장 · BE Lead'));
  done.push(await rich('448:174','이후 리팩터링에서 웹·Raspberry Pi 주문이 ==같은 매수·매도 로직==을 쓰게 해 \n잔액·보유 수량·평균 매입가 계산을 한 곳으로 모았습니다.'));
  done.push(await rich('448:179','네이버 금융 현재가를 30초마다 수집해 LCD에 최신 가격·등락률을 띄웠습니다.'));
  done.push(await rich('448:199','Kakao Local 응답을 장소 ID 기준으로 정규화·중복 제거해 \nMongoDB에 먼저 저장했습니다.'));
  done.push(await rich('448:204','Gemini 소개·태그 보강을 저장 뒤 비동기 처리로 설계해 \n==AI 호출이 실패해도 장소 원본이 남게== 했습니다.'));
  done.push(await addBullet('448:204','테스트 **99개**로 라인 커버리지 **87%**를 확인하고 CI 통과 기준으로 걸었습니다.'));
  // ---- page 3
  done.push(await plain('448:218','2024.04 - 현재'));
  done.push(await rich('448:224','누적 40명 이상이 참여한 개발 커뮤니티에서 \n테크 세션 **30회** 이상, 네트워킹 **5회** 이상을 열었습니다.'));
  done.push(await rich('448:229','커뮤니티 운영진으로 시작해 A&I.com 백엔드 리드까지 맡게 됐습니다.'));
  done.push(await rich('448:248','2023년부터 트러블슈팅·학습·회고 글 **171편**을 썼습니다.'));
  { const n=await node('448:253'); await loadNodeFonts(n); n.characters='대표 글: TDD로 총 2,011개의 테스트를 만들며 (2026.07)'; n.setRangeHyperlink(0,n.characters.length,{type:'URL',value:'https://velog.io/@stdiodh/TDD%EB%A1%9C-%EC%B4%9D-2011%EA%B0%9C%EC%9D%98-%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4%EB%A9%B0-%EC%99%9C-%EC%9D%B4%EB%A0%87%EA%B2%8C-%EB%A7%8E%EC%9D%B4-%EB%A7%8C%EB%93%A4%EA%B2%8C-%EB%90%98%EC%97%88%EC%9D%84%EA%B9%8C'}); done.push('448:253'); }
  done.push(await rich('448:272','Java 스타일 가이드와 리뷰 기준을 정리하고, \n동료 피드백을 반영해 미션 코드의 가독성과 구조를 고쳤습니다.'));
  done.push(await rich('448:277','역할을 바꿔 가며 구현하고, 서로의 접근 방식을 비교해 공통 설계 기준을 맞췄습니다.'));
  done.push(await addBullet('448:328','정보처리기사 (2026.12 취득 예정)'));
  const closing = await node('448:331'); closing.visible=false; done.push('448:331 hidden');
  return done;
}
