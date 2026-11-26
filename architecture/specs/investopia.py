TITLE = "Investopia System Architecture"
OVERVIEW = [
    "네이버 금융 시세로 웹과 Raspberry Pi에서 모의 주식 거래를 하는 Flask 프로토타입입니다.",
    "웹 화면과 Raspberry Pi가 같은 매수·매도 API와 MariaDB 자산 데이터를 사용합니다.",
    "저장소에 배포 설정은 없고, GitHub Actions는 테스트만 실행합니다.",
]
BASIS = "저장소 코드 기준 · stdiodh/Investopia main@5c8ca52 · 2026-11-26 분석 · 실행 호스트와 DB 위치는 환경 변수 값이라 미확인"
LEGEND_AT = (1560, 28)

GROUPS = [
    dict(x=1440, y=232, w=440, h=200, label="External", dashed=True),
]

NODES = [
    dict(x=56, y=300, w=130, h=104, title="Browser", icon="users", bare=True),
    dict(x=480, y=380, w=330, h=170, title="Investopia Web", sub="Flask · Jinja 템플릿 · REST", logo="flask", logo_size=52, repo="app.py"),
    dict(x=980, y=262, w=330, h=120, title="Price Collector", sub="update_prices.py · 30초 주기", logo="python", logo_size=46),
    dict(x=980, y=520, w=330, h=170, title="MariaDB", sub="user_asset · portfolio · stock", logo="mariadb", logo_size=52),
    dict(x=1470, y=300, w=380, h=100, title="Naver Finance", sub="종목 페이지 HTML"),
    dict(x=200, y=640, w=360, h=130, title="Raspberry Pi", sub="LCD · 조이스틱 · 버튼 · LED", logo="raspberry-pi", logo_size=50, repo="static/hardware.py"),
    dict(x=56, y=884, w=300, h=110, title="GitHub", sub="Investopia", logo="github"),
    dict(x=432, y=884, w=380, h=110, title="GitHub Actions", sub="pytest (Python 3.12)", logo="github-actions"),
]

EDGES = [
    dict(pts=[(188, 352), (330, 352), (330, 430), (478, 430)], label="HTTP 화면·폼", at=(200, 340), size=17),
    dict(pts=[(420, 638), (420, 505), (478, 505)], label="POST /api/buy · /api/sell", at=(432, 600), size=17),
    dict(pts=[(560, 666), (978, 666)], label="시세·자산 조회 (pymysql)", at=(640, 654), size=17),
    dict(pts=[(810, 465), (900, 465), (900, 570), (978, 570)], label="pymysql", at=(820, 453), size=17),
    dict(pts=[(1310, 350), (1468, 350)], label="HTML 수집", at=(1330, 338), size=17),
    dict(pts=[(1145, 382), (1145, 518)], label="stock upsert", at=(1156, 458), size=17),
    dict(pts=[(356, 939), (430, 939)], style="deploy", label="push", at=(372, 928), size=16),
]
