TITLE = "SoloPlay System Architecture"
OVERVIEW = [
    "Kakao 장소 검색 결과를 저장하고 Gemini로 소개·태그를 보강하는 WebFlux API입니다.",
    "EC2 한 대의 Docker Compose에서 MongoDB·Redis와 함께 실행됩니다.",
    "develop 브랜치에 push하면 GitHub Actions가 Docker Hub 이미지로 배포합니다.",
]
BASIS = "저장소 설정 기준 · stdiodh/Solo-Play-Web-Server main@128b2a5 (배포 워크플로는 develop 대상) · 2026-11-26 분석 · 운영 서버 상태는 직접 확인하지 않음"
LEGEND_AT = (1560, 28)

GROUPS = [
    dict(x=420, y=262, w=900, h=560, label="AWS EC2 · Docker Compose", logo="aws-ec2"),
    dict(x=1400, y=262, w=480, h=436, label="External Services", dashed=True),
]

NODES = [
    dict(x=56, y=462, w=130, h=104, title="Client", icon="users", bare=True),
    dict(x=520, y=420, w=340, h=180, title="SoloPlay API", sub="Spring WebFlux · Coroutines", logo="spring-boot", logo_size=56, repo="Solo-Play-Web-Server"),
    dict(x=990, y=330, w=270, h=118, title="MongoDB", sub="컨테이너 · 장소·회원", logo="mongodb", logo_size=44),
    dict(x=990, y=580, w=270, h=118, title="Redis", sub="인증 코드·토큰", logo="redis", logo_size=44),
    dict(x=1430, y=340, w=420, h=90, title="Kakao Local API", sub="키워드 장소 검색 (최대 15개)"),
    dict(x=1430, y=456, w=420, h=90, title="Google Gemini API", sub="장소 소개·해시태그 보강 (비동기)"),
    dict(x=1430, y=572, w=420, h=90, title="Gmail SMTP", sub="가입 인증 코드 메일"),
    dict(x=56, y=884, w=320, h=110, title="GitHub", sub="Solo-Play-Web-Server", logo="github"),
    dict(x=452, y=884, w=400, h=110, title="GitHub Actions", sub="develop: check (test·JaCoCo) / 배포", logo="github-actions"),
    dict(x=930, y=884, w=300, h=110, title="Docker Hub", sub="이미지 :latest", logo="docker"),
]

EDGES = [
    dict(pts=[(188, 511), (518, 511)], label="HTTP :8080", at=(220, 498), size=17),
    dict(pts=[(860, 470), (930, 470), (930, 389), (988, 389)]),
    dict(pts=[(860, 556), (930, 556), (930, 639), (988, 639)]),
    dict(pts=[(860, 512), (1370, 512)], label="HTTPS 외부 호출", at=(1060, 500), size=17, arrow=False),
    dict(pts=[(1370, 385), (1370, 617)], arrow=False),
    dict(pts=[(1370, 385), (1428, 385)]),
    dict(pts=[(1370, 501), (1428, 501)]),
    dict(pts=[(1370, 617), (1428, 617)]),
    dict(pts=[(376, 939), (450, 939)], style="deploy", label="push", at=(392, 928), size=16),
    dict(pts=[(852, 939), (928, 939)], style="deploy", label="push", at=(866, 928), size=16),
    dict(pts=[(1080, 882), (1080, 824)], style="deploy", label="Pull image", at=(1092, 862), size=16),
    dict(pts=[(640, 882), (640, 824)], style="deploy", label="SSH: compose 복사 · docker pull · up -d", at=(652, 862), size=16),
]
