# InsightOps Dashboard Frontend

React 기반의 대시보드 프론트엔드 애플리케이션

## 🚀 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 🐳 Docker 배포

```bash
# 로컬 배포 (자동화 스크립트)
./deploy.sh

# 수동 Docker 실행
docker run -d -p 3000:80 --name insightops-frontend inhyokim/insightops-dashboard-frontend:latest
```

## 📁 프로젝트 구조

```
├── .github/workflows/    # CI/CD 파이프라인
├── src/                  # React 소스 코드 (추후 생성)
├── Dockerfile           # 프로덕션 배포용
├── docker-compose.yml   # 로컬 개발용
├── nginx.conf           # 웹서버 설정
└── deploy.sh           # 배포 스크립트
```

## 🔧 기술 스택

- **Frontend**: React + TypeScript + Vite
- **Styling**: (추후 결정)
- **State Management**: (추후 결정)
- **Build Tool**: Vite
- **Container**: Docker + nginx