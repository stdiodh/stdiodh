p='README.md'; L=open(p,encoding='utf-8').read().split('\n')
start=next(i for i,l in enumerate(L) if l.startswith('## 7. 로컬 검증 결과'))
end=next(i for i,l in enumerate(L) if l.startswith('## 8. '))
sec=L[start:end]
doc=['# 로컬 검증 결과 상세','','README의 7절에서 요약한 측정의 전체 표와 조건입니다. 모든 수치는 로컬 fixture 기준이며 운영 처리량이나 응답 시간 개선율이 아닙니다.','']+sec[1:]
doc='\n'.join(doc).replace('](./DOCS/','](./').replace('src="./DOCS/','src="./').replace('### ','## ')
open('DOCS/LOCAL_VERIFICATION.md','w',encoding='utf-8').write(doc)
summary='''## 7. 로컬 검증 결과

대표 결과만 남겼습니다. 모든 표와 측정 조건은 [로컬 검증 결과 상세](./DOCS/LOCAL_VERIFICATION.md)에 있습니다.
수치는 로컬 MongoDB 7.0.16·Redis 7.2.5 fixture에서 Before·After를 같은 조건으로 비교한 값이며, 운영 처리량이나 응답 시간 개선율이 아닙니다.

| 항목 | 고정 조건 | Before | After | 변화 |
| --- | --- | ---: | ---: | ---: |
| 문제 상세 제한 병렬 수집 | 3,400건·10ms 고정 지연·3회 중앙값 | 55.632초 | 12.226초 | 77.96% 단축, 누락·중복 0건 |
| 관리자 회원 조회 N+1 제거 | 회원 12명·페이지 크기 10 | 읽기 명령 11 | 2 | 81.8% 감소 |
| 통계 조회 데이터 축소 | 회고 1,200건 | 5,230,680 B | 107,790 B | 97.94% 감소 |
| 추천 카테고리 조회 단일화 | BFS·RELATED | `problems` find 31 | 1 | 96.77% 감소 |
| 수집 작업 목록 일괄 조회 | index 작업 20건 | Redis 명령 21 | 2 | 90.48% 감소 |
| AI 리뷰 중복 생성 | 동일 로그 50건 동시 요청·10회 | - | Gemini 호출 1회·저장 1건 | 중복 0건 |
'''
L=L[:start]+summary.split('\n')+L[end:]
s='\n'.join(L)
a='- [API 명세](./DOCS/API_SPECIFICATION.md)\n'
s=s.replace(a, a+'- [로컬 검증 결과 상세](./DOCS/LOCAL_VERIFICATION.md)\n',1)
open(p,'w',encoding='utf-8').write(s)
