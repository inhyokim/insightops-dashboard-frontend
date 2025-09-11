import { api } from './axios';
import type {
  OverviewDto,
  CategoryShareResponse,
  ShareItem,
  VocListData,
  VocDetailData,
  CaseItem,
  InsightCard,
  MailPreview,
  MailSendRequest,
  MailLog,
  Period,
  SeriesPoint,
  TimeSeriesData,
  SmallTrendItem,
  SmallTrendsData,
  FilterRequest
} from '../types/domain';

export const getOverview = async (period: Period = 'daily'): Promise<OverviewDto> => {
  const response = await api.get<OverviewDto>('/api/dashboard/overview', {
    params: { period }
  });
  return response.data;
};

// 새로 추가: Top Small Category API
export const getTopSmallCategory = async (period: Period = 'daily', baseDate?: string): Promise<{
  topCategory: string;
  topCount: number;
  totalCount: number;
  topShare: number;
}> => {
  const response = await api.get('/api/dashboard/top-small-category', {
    params: { 
      period, 
      baseDate: baseDate || new Date().toISOString().split('T')[0]
    }
  });
  return response.data;
};

export const getCategoryShare = async (from: string, to: string, granularity: string = 'month'): Promise<ShareItem[]> => {
  const response = await api.get<ShareItem[]>('/api/dashboard/big-category-share', {
    params: { granularity, from, to }
  });
  // 백엔드 응답이 이미 올바른 형식 (ShareItem[])
  return response.data;
};

export const getVocSeries = async (period: Period, from: string, to: string): Promise<TimeSeriesData> => {
  const granularity = period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month';
  const response = await api.get<SeriesPoint[]>('/api/dashboard/total-series', {
    params: { granularity, from, to }
  });
  // 백엔드 응답(SeriesPoint[])을 차트용 형식으로 변환
  return {
    labels: response.data.map(item => 
      new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    ),
    values: response.data.map(item => item.count)
  };
};

export const getSmallTrends = async (params: FilterRequest): Promise<SmallTrendsData> => {
  const response = await api.get<SmallTrendItem[]>('/api/dashboard/small-trends', {
    params: {
      granularity: 'month',
      from: params.from,
      to: params.to,
      clientAge: params.age,
      clientGender: params.gender,
      limit: 25  // 백엔드 요구사항에 맞게 25개로 변경
    }
  });
  // 백엔드 응답(SmallTrendItem[])을 차트용 형식으로 변환
  return {
    labels: response.data.map(item => item.smallName),
    values: response.data.map(item => item.count),
    deltas: response.data.map(() => 0) // 백엔드에서 delta 정보가 없으므로 0으로 설정
  };
};

// 새로 추가: 복잡한 필터링 API
export const getFilteredCases = async (filter: {
  startDate: string;
  endDate: string;
  categories?: string[];
  ageGroups?: string[];
  genders?: string[];
  page?: number;
  size?: number;
}): Promise<{
  cases: CaseItem[];
  totalCount: number;
  filter: any;
  page: number;
  size: number;
}> => {
  const response = await api.post('/api/dashboard/filtered-cases', filter);
  return response.data;
};

export const getInsights = async (limit = 6): Promise<InsightCard[]> => {
  const response = await api.get<InsightCard[]>('/api/dashboard/insights', {
    params: { limit }
  });
  return response.data;
};

export const getCases = async (params: FilterRequest): Promise<CaseItem[]> => {
  const response = await api.get<CaseItem[]>('/api/dashboard/cases', {
    params: {
      from: params.from,
      to: params.to,
      consultingCategory: params.consultingCategory,
      page: params.page || 0,
      size: params.size || 20
    }
  });
  // 백엔드 응답이 이미 올바른 형식 (CaseItem[])
  return response.data;
};

export const getCaseDetail = async (vocId: string): Promise<VocDetailData> => {
  const response = await api.get<any>(`/api/dashboard/voc-detail/${vocId}`);
  // 백엔드 응답을 프론트엔드 형식으로 변환
  const analysisResult = response.data.analysis_result || '';
  return {
    vocEventId: parseInt(vocId) || 0,
    sourceSystem: 'dashboard',
    consultingDate: new Date().toISOString().slice(0, 10), // 임시값
    bigCategory: '조회/안내', // 임시값
    consultingCategoryName: '상품문의', // 임시값
    clientAge: '30s', // 임시값
    clientGender: 'F', // 임시값
    summary: analysisResult.substring(0, 200) + '...',
    fullContent: analysisResult,
    keywords: ['분석결과', 'VoC'],
    sentiment: '보통',
    duration: 300,
    channel: '전화'
  };
};

export const getMailPreview = async (params: { vocId?: string; insightId?: string }): Promise<MailPreview> => {
  const response = await api.post<MailPreview>('/api/dashboard/mail/preview', {
    vocId: params.vocId || null
  });
  return response.data;
};

export const getRecentMessages = async (limit = 10): Promise<MailLog[]> => {
  const response = await api.get<any>('/api/dashboard/mail/recent');
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return response.data.slice(0, limit).map((item: any) => ({
    id: item.id?.toString() || '',
    to: item.recipient || item.to || '',
    subject: item.subject || '',
    status: item.status || 'SENT',
    sentAt: item.sentAt || item.createdAt || new Date().toISOString()
  }));
};

export const generateMailByCategory = async (categoryId: string): Promise<{
  subject: string;
  content: string;
  categoryId: string;
  success: boolean;
  message: string;
}> => {
  const response = await api.post('/api/dashboard/mail/generate', {
    categoryId
  });
  return response.data;
};

export const sendMail = async (body: MailSendRequest): Promise<{ success: boolean; id: string }> => {
  const response = await api.post<{ success: boolean; id: string }>('/api/dashboard/mail/send', body);
  return response.data;
};
