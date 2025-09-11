// types/domain.ts
export type Period = 'daily' | 'weekly' | 'monthly';

export interface OverviewDto {
  totalCount: number;        // 현재 기간 VoC 건수 (백엔드와 일치)
  prevCount: number;         // 이전 기간 VoC 건수 (백엔드와 일치)
  deltaPercent: number;      // 증감률 (%) (백엔드와 일치)
  topCategory: string;       // Top Small 카테고리 이름 (백엔드와 일치)
  topRatio: number;         // Top Small 카테고리 비중 (%) (백엔드와 일치)
}

export interface ShareItem {
  name: string;        // 백엔드와 일치 (bigCategory → name)
  count: number;       // 백엔드와 일치
  ratio: number;       // 백엔드와 일치 (sharePct → ratio)
}

export interface CategoryShareResponse {
  totalCount: number;
  items: ShareItem[];      // CategoryShareItem → ShareItem
}

export interface CaseItem {
  vocEventId: number;           // 백엔드와 일치 (vocId → vocEventId, string → number)
  sourceSystem: string;         // 백엔드와 일치 (새로 추가)
  consultingDate: string;       // 백엔드와 일치 (YYYY-MM-DD)
  bigCategory: string;          // 백엔드와 일치 (새로 추가)
  consultingCategoryName: string; // 백엔드와 일치 (consultingCategory → consultingCategoryName)
  clientAge?: string;           // 백엔드와 일치
  clientGender?: string;        // 백엔드와 일치 ('M'|'F' → string)
  summary?: string;             // 백엔드와 일치
}

export interface VocListData {
  totalCount: number;
  page?: number;
  size?: number;
  totalPages?: number;
  items: CaseItem[];           // VocListItem → CaseItem
}

export interface VocDetailData extends CaseItem {
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

// 백엔드 API 응답과 일치하도록 수정
export interface SeriesPoint {
  date: string;         // 백엔드 응답 필드명과 일치 (LocalDate)
  count: number;        // 백엔드 응답 필드명과 일치 (Long)
}

// 차트 표시용 데이터 (기존 호환성 유지)
export interface TimeSeriesData {
  labels: string[];
  values: number[];
}

// 백엔드 API 응답과 일치하도록 수정
export interface SmallTrendItem {
  smallName: string;    // 백엔드 응답 필드명과 일치
  count: number;        // 백엔드 응답 필드명과 일치
}

// 차트 표시용 데이터 (기존 호환성 유지)
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
