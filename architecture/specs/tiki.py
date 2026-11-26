TITLE = "Gojjibom System Architecture"
OVERVIEW = [
    "약국이 등록한 복약 정보를 어르신과 보호자에게 잇는 복약 안부 API입니다.",
    "EC2 한 대의 Docker Compose에서 Nginx·PostgreSQL과 함께 실행되고, 사진은 S3에 비공개로 둡니다.",
    "main에 반영되면 GitHub Actions가 검증 후 GHCR 이미지로 배포합니다.",
]
BASIS = "저장소 설정 기준 · TIKI-TAKA-hackathon/Tiki-Taka-BE main@bb2823a · 2026-11-26 분석 · 운영 서버 상태는 직접 확인하지 않음"
LEGEND_AT = (1560, 28)

GROUPS = [
    dict(x=500, y=262, w=910, h=560, label="AWS EC2 · Docker Compose", logo="aws-ec2"),
    dict(x=1460, y=300, w=420, h=320, label="AWS Managed Service", dashed=True),
]

NODES = [
    dict(x=56, y=462, w=130, h=104, title="Users", icon="users", bare=True),
    dict(x=226, y=456, w=214, h=110, title="Frontend", sub="Firebase Hosting", logo="firebase", logo_size=40, repo="Tiki-Taka-FE"),
    dict(x=540, y=452, w=230, h=118, title="Nginx", sub="TLS · /api 프록시", logo="nginx"),
    dict(x=540, y=660, w=230, h=100, title="Certbot", sub="인증서 갱신 (12h)", logo="certbot", logo_size=42),
    dict(x=838, y=420, w=304, h=180, title="Gojjibom API", sub="Spring Boot · Kotlin", logo="spring-boot", logo_size=56, repo="Tiki-Taka-BE"),
    dict(x=1166, y=300, w=232, h=124, title="PostgreSQL", sub="16 · Flyway", logo="postgresql", logo_size=40),
    dict(x=1490, y=440, w=360, h=112, title="Amazon S3", sub="비공개 사진 저장", logo="aws-s3", logo_size=48),
    dict(x=56, y=884, w=300, h=110, title="GitHub", sub="Tiki-Taka-BE", logo="github"),
    dict(x=432, y=884, w=380, h=110, title="GitHub Actions", sub="ktlint · detekt · test · JaCoCo", logo="github-actions"),
    dict(x=890, y=884, w=320, h=110, title="GHCR", sub="tiki-taka-be:latest·sha", logo="github"),
]

EDGES = [
    dict(pts=[(188, 514), (224, 514)]),
    dict(pts=[(440, 511), (538, 511)], label="HTTPS", at=(456, 498), size=17),
    dict(pts=[(770, 511), (836, 511)], label=":8080", at=(780, 498), size=17),
    dict(pts=[(1142, 470), (1156, 470), (1154, 362), (1164, 362)]),
    dict(pts=[(1142, 512), (1488, 512)], label="서버 업로드 (putObject)", at=(1170, 500), size=17),
    dict(pts=[(333, 454), (333, 244), (1700, 244), (1700, 438)], style="presign", label="Presigned URL로 사진 업로드·조회 (URL은 API가 발급)", at=(780, 234), size=17),
    dict(pts=[(356, 939), (430, 939)], style="deploy", label="push", at=(372, 928), size=16),
    dict(pts=[(812, 939), (888, 939)], style="deploy", label="push", at=(828, 928), size=16),
    dict(pts=[(1050, 882), (1050, 824)], style="deploy", label="Pull image", at=(1062, 862), size=16),
    dict(pts=[(640, 882), (640, 824)], style="deploy", label="SSH: git pull · compose up -d · nginx reload", at=(652, 862), size=16),
]
