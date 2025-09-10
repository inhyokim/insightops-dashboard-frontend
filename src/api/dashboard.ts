import { api } from './axios';
import type {
  OverviewDto,
  CategoryShareResponse,
  VocListData,
  VocDetailData,
  InsightCard,
  MailPreview,
  MailSendRequest,
  MailLog,
  Period,
  TimeSeriesData,
  SmallTrendsData,
  FilterRequest
} from '../types/domain';

export const getOverview = async (period: Period = 'daily'): Promise<OverviewDto> => {
  const response = await api.get<OverviewDto>('/api/dashboard/overview', {
    params: { period }
  });
  return response.data;
};

export const getCategoryShare = async (from: string, to: string, granularity: string = 'month'): Promise<CategoryShareResponse> => {
  const response = await api.get<any>('/api/dashboard/big-category-share', {
    params: { granularity, from, to }
  });
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return {
    totalCount: response.data.reduce((sum: number, item: any) => sum + (item.count || 0), 0),
    items: response.data.map((item: any) => ({
      bigCategory: item.name || item.category || '',
      count: item.count || 0,
      sharePct: item.ratio || item.percentage || 0
    }))
  };
};

export const getVocSeries = async (period: Period, from: string, to: string): Promise<TimeSeriesData> => {
  const granularity = period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month';
  const response = await api.get<any>('/api/dashboard/total-series', {
    params: { granularity, from, to }
  });
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return {
    labels: response.data.map((item: any) => {
      if (item.x) {
        return new Date(item.x).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
      }
      return item.label || item.date || item.period;
    }),
    values: response.data.map((item: any) => item.y || item.value || item.count || 0)
  };
};

export const getSmallTrends = async (params: FilterRequest): Promise<SmallTrendsData> => {
  const response = await api.get<any>('/api/dashboard/small-trends', {
    params: {
      granularity: 'month',
      from: params.from,
      to: params.to,
      clientAge: params.age,
      clientGender: params.gender,
      limit: 10
    }
  });
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return {
    labels: response.data.map((item: any) => item.smallCategory || item.category || item.name),
    values: response.data.map((item: any) => item.count || item.value || 0),
    deltas: response.data.map((item: any) => item.deltaPercent || item.changePercent || 0)
  };
};

export const getInsights = async (limit = 6): Promise<InsightCard[]> => {
  const response = await api.get<InsightCard[]>('/api/dashboard/insights', {
    params: { limit }
  });
  return response.data;
};

export const getCases = async (params: FilterRequest): Promise<VocListData> => {
  const response = await api.get<any>('/api/dashboard/cases', {
    params: {
      from: params.from,
      to: params.to,
      consultingCategory: params.consultingCategory,
      page: params.page || 0,
      size: params.size || 20
    }
  });
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return {
    totalCount: response.data.length,
    page: params.page || 1,
    size: params.size || 20,
    totalPages: Math.ceil(response.data.length / (params.size || 20)),
    items: response.data.map((item: any) => ({
      vocId: item.vocEventId?.toString() || item.id?.toString() || '',
      consultingDate: item.consultingDate || item.date || '',
      consultingCategory: item.consultingCategoryName || item.category || '',
      clientAge: item.clientAge || '',
      clientGender: item.clientGender || '',
      summary: item.summary || item.content || ''
    }))
  };
};

export const getCaseDetail = async (vocId: string): Promise<VocDetailData> => {
  const response = await api.get<any>(`/api/dashboard/voc-detail/${vocId}`);
  // 백엔드 응답을 프론트엔드 형식으로 변환
  const analysisResult = response.data.analysis_result || '';
  return {
    vocId,
    consultingDate: new Date().toISOString().slice(0, 10), // 임시값
    consultingCategory: '상품문의', // 임시값
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

export const sendMail = async (body: MailSendRequest): Promise<{ success: boolean; id: string }> => {
  const response = await api.post<{ success: boolean; id: string }>('/api/dashboard/mail/send', body);
  return response.data;
};
