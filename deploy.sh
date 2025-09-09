#!/bin/bash

# InsightOps Dashboard 배포 스크립트
echo "🚀 InsightOps Dashboard 배포를 시작합니다..."

# 최신 이미지 pull
echo "📥 최신 Docker 이미지를 가져오는 중..."
docker pull inhyokim/insightops-dashboard-frontend:latest
docker pull inhyokim/insightops-dashboard-backend:latest

# 기존 컨테이너 중지 및 제거 (무시 에러)
echo "🛑 기존 컨테이너를 중지합니다..."
docker stop insightops-frontend insightops-backend 2>/dev/null || true
docker rm insightops-frontend insightops-backend 2>/dev/null || true

# 프론트엔드 배포 모드 선택
echo "🔧 배포 모드를 선택하세요:"
echo "1) 프론트엔드만 (포트: 3000)"
echo "2) 전체 스택 (docker-compose)"
read -p "선택 (1 또는 2): " choice

case $choice in
    1)
        echo "🌐 프론트엔드만 배포합니다..."
        docker run -d \
            -p 3000:80 \
            --name insightops-frontend \
            --restart unless-stopped \
            inhyokim/insightops-dashboard-frontend:latest
        echo "✅ 프론트엔드 배포 완료! http://localhost:3000"
        ;;
    2)
        echo "🔄 전체 스택을 배포합니다..."
        # 환경변수 설정이 필요할 수 있음
        export DATABASE_URL=${DATABASE_URL:-"your-database-url"}
        
        # docker-compose로 실행
        docker-compose down 2>/dev/null || true
        docker-compose up -d
        echo "✅ 전체 스택 배포 완료!"
        echo "   - 프론트엔드: http://localhost:3000"
        echo "   - 백엔드: http://localhost:8080"
        ;;
    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac

# 상태 확인
echo ""
echo "📊 현재 실행 중인 컨테이너:"
docker ps | grep insightops

echo ""
echo "🎉 배포가 완료되었습니다!"
