TITLE = "Didim-Log System Architecture"
OVERVIEW = [
    "알고리즘 풀이 회고 서비스의 단일 Spring Boot API입니다.",
    "EC2 한 대의 Docker Compose에서 Nginx·MongoDB·Redis와 함께 실행되고,",
    "main 브랜치에 push하면 GitHub Actions가 Docker Hub 이미지로 배포합니다.",
]
BASIS = "저장소 설정 기준 · didim-log/didim-log-BE main@876ad9c · 2026-11-26 분석 · 운영 서버 상태는 직접 확인하지 않음"
LEGEND_AT = (1560, 28)

GROUPS = [
    dict(x=500, y=262, w=920, h=560, label="AWS EC2 · Docker Compose", logo="aws-ec2"),
    dict(x=1470, y=214, w=410, h=606, label="External Services", dashed=True),
]

NODES = [
    dict(x=56, y=462, w=130, h=104, title="Users", icon="users", bare=True),
    dict(x=226, y=456, w=214, h=110, title="Frontend", sub="배포 위치 미확인", repo="didim-log-FE"),
    dict(x=540, y=452, w=230, h=118, title="Nginx", sub="Reverse Proxy", logo="nginx"),
    dict(x=540, y=660, w=230, h=100, title="Certbot", sub="인증서 갱신 (12h)", logo="certbot", logo_size=42),
    dict(x=838, y=420, w=304, h=180, title="Didim-Log API", sub="Spring Boot · Kotlin", logo="spring-boot", logo_size=56, repo="didim-log-BE"),
    dict(x=1196, y=318, w=204, h=112, title="MongoDB", sub="컨테이너", logo="mongodb", logo_size=44),
    dict(x=1196, y=604, w=204, h=118, title="Redis", sub="컨테이너", logo="redis", logo_size=44),
    dict(x=1500, y=280, w=350, h=82, title="solved.ac API", sub="문제 메타데이터 수집"),
    dict(x=1500, y=378, w=350, h=82, title="BOJ (acmicpc.net)", sub="문제 상세 수집 · 계정 인증"),
    dict(x=1500, y=476, w=350, h=82, title="Google Gemini API", sub="AI 회고 리뷰 (AI_ENABLED)"),
    dict(x=1500, y=574, w=350, h=82, title="OAuth 2.0 Providers", sub="Google · GitHub · Naver"),
    dict(x=1500, y=672, w=350, h=82, title="Gmail SMTP", sub="아이디·비밀번호 찾기 메일"),
    dict(x=56, y=884, w=300, h=110, title="GitHub", sub="didim-log-BE", logo="github"),
    dict(x=432, y=884, w=380, h=110, title="GitHub Actions", sub="PR: test·check  /  main: assemble", logo="github-actions"),
    dict(x=890, y=884, w=300, h=110, title="Docker Hub", sub="didim-log-be:latest", logo="docker"),
]

EDGES = [
    dict(pts=[(188, 514), (224, 514)]),
    dict(pts=[(440, 511), (538, 511)], label="API", at=(472, 498), size=17),
    dict(pts=[(770, 511), (836, 511)], label=":8080", at=(780, 498), size=17),
    dict(pts=[(1142, 470), (1172, 470), (1168, 374), (1194, 374)]),
    dict(pts=[(1142, 556), (1168, 556), (1168, 663), (1194, 663)]),
    dict(pts=[(1142, 512), (1440, 512)], label="HTTPS 외부 호출", at=(1230, 500), size=17, arrow=False),
    dict(pts=[(1440, 321), (1440, 713)], arrow=False),
    dict(pts=[(1440, 321), (1498, 321)]),
    dict(pts=[(1440, 419), (1498, 419)]),
    dict(pts=[(1440, 517), (1498, 517)]),
    dict(pts=[(1440, 615), (1498, 615)]),
    dict(pts=[(1440, 713), (1498, 713)]),
    dict(pts=[(356, 939), (430, 939)], style="deploy", label="push", at=(372, 928), size=16),
    dict(pts=[(812, 939), (888, 939)], style="deploy", label="push", at=(828, 928), size=16),
    dict(pts=[(1040, 882), (1040, 824)], style="deploy", label="Pull image", at=(1052, 862), size=16),
    dict(pts=[(640, 882), (640, 824)], style="deploy", label="SSH: compose 복사 · up -d", at=(652, 862), size=16),
]
