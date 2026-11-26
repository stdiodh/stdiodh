# 필요한 공식 로고 (SYSTEM_ARCHITECTURE.md 3절 기준)

공식 브랜드·아이콘 배포 페이지에서만 받습니다. 제3자 아이콘 모음, 검색 썸네일, 다시 그린 path는 쓰지 않습니다.
받은 파일은 하나의 폴더(예: `logos/`)에 두고 `SOURCES.json`에 기록합니다. 흰 배경용 변형, 가능하면 심벌(아이콘) 형태를 고릅니다.

| key | 제품 | 탐색 시작점 |
| --- | --- | --- |
| aws-ec2 | Amazon EC2 | https://aws.amazon.com/architecture/icons/ (공식 아이콘 패키지의 EC2 서비스 아이콘) |
| aws-s3 | Amazon S3 | 같은 패키지의 Simple Storage Service 아이콘 |
| nginx | NGINX (오픈소스) | https://www.f5.com/products/nginx 또는 nginx.org 공식 자산 |
| certbot | Certbot (EFF) | https://certbot.eff.org/ 공식 자산. 공식 파일이 없으면 key를 비워 두고 보고 |
| spring-boot | Spring Boot | https://spring.io/projects/spring-boot , 사용 지침 https://spring.io/trademarks/ |
| mongodb | MongoDB | https://www.mongodb.com/company/newsroom/brand-resources |
| redis | Redis | https://redis.io/company/news/ 에서 연결되는 brand kit |
| postgresql | PostgreSQL | https://wiki.postgresql.org/wiki/Logo |
| firebase | Firebase | https://firebase.google.com/brand-guidelines |
| github | GitHub (GHCR에도 사용) | https://brand.github.com/foundations/logo |
| github-actions | GitHub Actions | GitHub 공식 배포 자산. 별도 공식 로고가 없으면 보고 (임의 대체 금지) |
| docker | Docker (Docker Hub에도 사용) | https://www.docker.com/company/newsroom/media-resources/ |
| flask | Flask | Pallets 공식 문서·저장소의 로고 자산 |
| python | Python | https://www.python.org/community/logos/ |
| mariadb | MariaDB | MariaDB 공식 로고 페이지 |
| raspberry-pi | Raspberry Pi | https://www.raspberrypi.com/trademark-rules/ |

`SOURCES.json` 예:

```json
[{"key": "mongodb", "product": "MongoDB", "file": "mongodb-leaf.svg",
  "page": "https://www.mongodb.com/company/newsroom/brand-resources",
  "url": "<실제로 받은 파일 주소 또는 패키지 내 경로>", "checked": "2026-11-26"}]
```

공식 원본을 못 구한 key는 SOURCES.json에 넣지 말고 목록으로 보고합니다. 그 도면은 초안으로 두고 완성본이라고 하지 않습니다.
