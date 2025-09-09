#!/bin/bash

# InsightOps Dashboard Frontend 배포 스크립트
echo "🚀 InsightOps Dashboard Frontend 배포를 시작합니다..."

# 최신 이미지 pull
echo "📥 최신 Docker 이미지를 가져오는 중..."
docker pull inhyokim/insightops-dashboard-frontend:latest

# 기존 컨테이너 중지 및 제거 (무시 에러)
echo "🛑 기존 프론트엔드 컨테이너를 중지합니다..."
docker stop insightops-dashboard-frontend 2>/dev/null || true
docker rm insightops-dashboard-frontend 2>/dev/null || true

# 배포 모드 선택
echo "🔧 배포 방법을 선택하세요:"
echo "1) Docker run 명령어로 실행"
echo "2) Docker Compose로 실행"
read -p "선택 (1 또는 2): " choice

case $choice in
    1)
        echo "🌐 Docker run으로 프론트엔드를 배포합니다..."
        docker run -d \
            -p 3000:80 \
            --name insightops-dashboard-frontend \
            --restart unless-stopped \
            inhyokim/insightops-dashboard-frontend:latest
        echo "✅ 프론트엔드 배포 완료! http://localhost:3000"
        ;;
    2)
        echo "🔄 Docker Compose로 프론트엔드를 배포합니다..."
        docker-compose down 2>/dev/null || true
        docker-compose up -d
        echo "✅ 프론트엔드 배포 완료! http://localhost:3000"
        ;;
    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac

# 상태 확인
echo ""
echo "📊 현재 실행 중인 프론트엔드 컨테이너:"
docker ps | grep insightops-dashboard-frontend

echo ""
echo "🎉 프론트엔드 배포가 완료되었습니다!"
echo "💡 백엔드는 별도 레포지토리에서 관리하세요."
