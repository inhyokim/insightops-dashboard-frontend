import { rest } from 'msw';
import {
  mockOverview,
  mockCategoryShare,
  mockVocSeries,
  mockSmallTrends,
  mockInsights,
  mockVocList,
  mockVocDetail,
  mockMailPreview,
  mockRecentMessages
} from './data';

const baseURL = 'http://localhost:8080';

export const handlers = [
  // 현황 요약
  rest.get(`${baseURL}/api/dashboard/overview`, (req, res, ctx) => {
    return res(ctx.json(mockOverview));
  }),

  // Big 카테고리 비중
  rest.get(`${baseURL}/api/dashboard/category-share`, (req, res, ctx) => {
    return res(ctx.json(mockCategoryShare));
  }),

  // VoC 시계열
  rest.get(`${baseURL}/api/dashboard/voc-series`, (req, res, ctx) => {
    const period = req.url.searchParams.get('period');
    
    // period에 따라 다른 데이터 반환 (시연용)
    let seriesData = { ...mockVocSeries };
    
    if (period === 'weekly') {
      seriesData = {
        labels: ['10월 4주', '11월 1주', '11월 2주', '11월 3주', '11월 4주'],
        values: [312, 298, 334, 287, 316]
      };
    } else if (period === 'monthly') {
      seriesData = {
        labels: ['8월', '9월', '10월', '11월'],
        values: [1156, 1089, 1203, 1247]
      };
    }
    
    return res(ctx.json(seriesData));
  }),

  // Small 트렌드
  rest.get(`${baseURL}/api/dashboard/small-trends`, (req, res, ctx) => {
    return res(ctx.json(mockSmallTrends));
  }),

  // 인사이트
  rest.get(`${baseURL}/api/dashboard/insights`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '6');
    const insights = mockInsights.slice(0, limit);
    return res(ctx.json(insights));
  }),

  // 케이스 목록
  rest.get(`${baseURL}/api/dashboard/cases`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '1');
    const size = parseInt(req.url.searchParams.get('size') || '20');
    
    // 간단한 페이지네이션 시뮬레이션
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedItems = mockVocList.items.slice(startIndex, endIndex);
    
    return res(ctx.json({
      ...mockVocList,
      page,
      size,
      items: paginatedItems
    }));
  }),

  // 케이스 상세
  rest.get(`${baseURL}/api/dashboard/cases/:vocId`, (req, res, ctx) => {
    const { vocId } = req.params;
    
    // vocId에 해당하는 상세 데이터 반환 (시연용으로 고정 데이터)
    const detailData = {
      ...mockVocDetail,
      vocId: vocId as string
    };
    
    return res(ctx.json(detailData));
  }),

  // 메일 미리보기
  rest.get(`${baseURL}/api/dashboard/mail/preview`, (req, res, ctx) => {
    const vocId = req.url.searchParams.get('vocId');
    const insightId = req.url.searchParams.get('insightId');
    
    let previewData = { ...mockMailPreview };
    
    if (insightId) {
      // 인사이트 기반 메일 미리보기
      const insight = mockInsights.find(i => i.id === insightId);
      if (insight) {
        previewData = {
          to: `${insight.assigneeTeam?.toLowerCase().replace('팀', '')}@company.com`,
          subject: `[인사이트] ${insight.title} - ${insightId}`,
          body: `${insight.assigneeTeam} 담당자님께,

InsightOps에서 감지된 중요한 인사이트를 공유드립니다.

[인사이트 정보]
- ID: ${insightId}
- 제목: ${insight.title}
- 담당팀: ${insight.assigneeTeam}

[상세 내용]
${insight.summary}

[관련 태그]
${insight.tags.join(', ')}

검토 후 필요한 조치를 취해 주시기 바랍니다.

감사합니다.

InsightOps 시스템
생성일시: ${new Date().toLocaleString('ko-KR')}`
        };
      }
    }
    
    return res(ctx.json(previewData));
  }),

  // 최근 발송 내역
  rest.get(`${baseURL}/api/dashboard/messages/recent`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '10');
    const messages = mockRecentMessages.slice(0, limit);
    return res(ctx.json(messages));
  }),

  // 메일 발송
  rest.post(`${baseURL}/api/dashboard/mail/send`, (req, res, ctx) => {
    // 발송 성공 시뮬레이션
    return res(
      ctx.json({
        success: true,
        id: `MAIL-${Date.now()}`
      })
    );
  })
];
