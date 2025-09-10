// types/domain.ts
export type Period = 'daily' | 'weekly' | 'monthly';

export interface OverviewDto {
  thisMonthCount: number;    // 이달의 VoC 건수
  prevMonthCount: number;    // 전달 VoC 건수
  deltaPercent: number;      // 전달 대비 증감률 (%)
  topSmall: string;          // Top Small 카테고리 이름
  topSmallShare: number;     // Top Small 카테고리 비중 (%)
}

export interface CategoryShareItem {
  bigCategory: string; // 7개 중 하나
  count: number;
  sharePct: number;
}

export interface CategoryShareResponse {
  totalCount: number;
  items: CategoryShareItem[];
}

export interface VocListItem {
  vocId: string;
  consultingDate: string;       // YYYY-MM-DD (UTC 기준 날짜)
  consultingCategory: string;   // small(=consulting_category)
  clientAge?: string;           // '10s'|'20s'|...
  clientGender?: 'M'|'F';
  summary?: string;
}

export interface VocListData {
  totalCount: number;
  page?: number;
  size?: number;
  totalPages?: number;
  items: VocListItem[];
}

export interface VocDetailData extends VocListItem {
  fullContent: string;
  keywords?: string[];
  sentiment?: string;
  duration?: number;
  channel?: string;
}

export interface CountSummaryData {
  period: Period;
  baseDate: string;
  currentCount: number;
  previousCount: number;
  deltaPercent: number;
}

export interface InsightCard {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  assigneeTeam?: string;
}

export interface MailPreview {
  to: string;
  subject: string;
  body: string;
}

export interface MailSendRequest { 
  to: string; 
  subject: string; 
  body: string; 
}

export interface MailLog {
  id: string;
  to: string;
  subject: string;
  status: 'SENT'|'QUEUED'|'FAILED';
  sentAt: string;
}

export interface TimeSeriesData {
  labels: string[];
  values: number[];
}

export interface SmallTrendsData {
  labels: string[];
  values: number[];
  deltas: number[];
}

export interface FilterRequest {
  from: string;
  to: string;
  consultingCategory?: string;
  age?: string;
  gender?: string;
  page?: number;
  size?: number;
}
