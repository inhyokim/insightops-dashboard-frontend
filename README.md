# InsightOps Dashboard Frontend

InsightOps 대시보드의 프론트엔드 애플리케이션입니다. React 18 + TypeScript + Vite를 기반으로 하는 현대적인 B2B SaaS 대시보드입니다.

## 🚀 기술 스택

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui 스타일 컴포넌트
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Validation**: Zod
- **Date Handling**: date-fns
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Development**: MSW (Mock Service Worker)

## 📁 프로젝트 구조

```
src/
├── api/                    # API 모듈
│   ├── axios.ts           # Axios 설정
│   └── dashboard.ts       # 대시보드 API 함수들
├── components/            # 재사용 가능한 컴포넌트
│   ├── BarTrend.tsx      # 막대 트렌드 차트
│   ├── CategoryPie.tsx   # 카테고리 파이 차트
│   ├── EmptyState.tsx    # 빈 상태 컴포넌트
│   ├── ErrorState.tsx    # 에러 상태 컴포넌트
│   ├── Filters.tsx       # 필터 컴포넌트
│   ├── InsightCard.tsx   # 인사이트 카드
│   ├── KpiCard.tsx       # KPI 카드
│   ├── Layout.tsx        # 레이아웃 컴포넌트
│   ├── LineSeries.tsx    # 라인 차트
│   └── LoadingSkeleton.tsx # 로딩 스켈레톤
├── hooks/                 # React Query 훅들
│   ├── useCategoryShare.ts
│   ├── useInsights.ts
│   ├── useMail.ts
│   ├── useOverview.ts
│   ├── useSmallTrends.ts
│   └── useVocCases.ts
├── mocks/                 # MSW 목 데이터
│   ├── browser.ts
│   ├── data.ts
│   └── handlers.ts
├── pages/                 # 페이지 컴포넌트
│   ├── ActionPage.tsx    # 메일 발송 페이지
│   ├── CasesPage.tsx     # 상담내용 상세 페이지
│   ├── OverviewPage.tsx  # 현황 요약 페이지
│   └── TrendPage.tsx     # 트렌드 분석 페이지
├── types/                 # TypeScript 타입 정의
│   └── domain.ts
├── utils/                 # 유틸리티 함수
│   ├── cn.ts             # 클래스명 병합
│   ├── date.ts           # 날짜 유틸리티
│   └── format.ts         # 포맷팅 유틸리티
├── App.tsx
├── main.tsx
├── router.tsx
└── index.css
```

## 🎯 주요 기능

### 1. 현황 요약 (Overview)
- **KPI 카드**: 이달의 전체 VoC 건수, Top Small 카테고리
- **카테고리 비중**: Big 카테고리별 도넛 차트
- **VoC 변화량**: 시계열 라인 차트 (Daily/Weekly/Monthly 토글)
- **인사이트 카드**: AI 분석 기반 주요 인사이트

### 2. 트렌드 분석 (Trend)
- **필터링**: 카테고리, 기간, 연령, 성별별 필터
- **막대 차트**: Top 카테고리 트렌드 + 전월 대비 증감률 배지
- **URL 상태 관리**: 필터 상태가 URL에 반영되어 뒤로가기 지원

### 3. 상담내용 상세 (Cases)
- **케이스 목록**: 최근 20건, 페이지네이션 지원
- **상세 뷰**: 선택된 케이스의 전체 내용, 키워드, 감정 분석
- **액션 버튼**: 담당팀 전달 기능

### 4. 메일 발송 (Action)
- **메일 미리보기**: 템플릿 기반 자동 생성
- **편집 가능**: 수신자, 제목, 본문 수정 가능
- **발송 내역**: 최근 발송된 메일 목록과 상태

## 🛠 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_DEFAULT_TZ=Asia/Seoul
VITE_MOCK=1  # 개발 시 목 데이터 사용 (0: 실제 API, 1: 목 데이터)
```

### 3. 개발 서버 실행
```bash
npm run dev
```

개발 서버가 http://localhost:3000에서 실행됩니다.

## 🏗 빌드 및 배포

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## 🎨 디자인 시스템

- **색상**: 차분한 B2B SaaS 톤 (블루 계열 primary)
- **레이아웃**: 카드형 레이아웃, 반응형 그리드
- **타이포그래피**: 깔끔하고 읽기 쉬운 폰트
- **상태 표시**: 로딩, 에러, 빈 상태에 대한 명확한 UI

## 📊 데이터 플로우

1. **날짜 처리**: 로컬 날짜 선택 → UTC 날짜 문자열로 변환하여 API 전송
2. **캐싱**: TanStack Query를 통한 스마트 캐싱 (staleTime: 60초)
3. **에러 처리**: 전역 에러 핸들링 및 사용자 친화적 에러 메시지
4. **상태 관리**: URL 쿼리 파라미터를 통한 필터 상태 관리

## 🧪 목 데이터 (개발용)

개발 환경에서는 MSW(Mock Service Worker)를 사용하여 실제 백엔드 없이도 개발이 가능합니다.

- `VITE_MOCK=1`로 설정하면 목 데이터 사용
- `src/mocks/` 디렉토리에 목 데이터와 핸들러 정의
- 실제 API와 동일한 인터페이스 제공

## 🔄 API 연동

백엔드 API와 연동하려면:

1. `.env` 파일에서 `VITE_MOCK=0` 설정
2. `VITE_API_BASE_URL`을 실제 백엔드 URL로 변경
3. 백엔드 서버가 CORS 설정이 되어 있는지 확인

## 📱 반응형 디자인

- **모바일**: 1열 스택 레이아웃
- **태블릿**: 혼합 레이아웃
- **데스크톱**: 2열/그리드 레이아웃
- **네비게이션**: 모바일에서는 햄버거 메뉴

## 🎯 성능 최적화

- **코드 스플리팅**: 페이지별 lazy loading
- **이미지 최적화**: WebP 포맷 지원
- **번들 최적화**: Vite의 최적화된 번들링
- **캐싱 전략**: React Query의 스마트 캐싱

## 🚀 배포

### Docker를 이용한 배포
```bash
docker build -t insightops-dashboard-frontend .
docker run -p 3000:80 insightops-dashboard-frontend
```

### Nginx 설정
프로젝트에 포함된 `nginx.conf` 파일을 사용하여 SPA 라우팅을 지원합니다.

## 🤝 기여 가이드

1. 이 저장소를 Fork합니다
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 지원

문의사항이 있으시면 다음으로 연락해 주세요:
- 이메일: support@insightops.com
- 이슈 트래커: GitHub Issues
# 배포 완료 - Thu Sep 11 09:40:51 KST 2025
# GitHub Actions Test
# Deployment test Thu Sep 11 13:45:15 KST 2025
