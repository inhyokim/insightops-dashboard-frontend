import type {
  OverviewDto,
  CategoryShareResponse,
  TimeSeriesData,
  SmallTrendsData,
  InsightCard,
  VocListData,
  VocDetailData,
  MailPreview,
  MailLog
} from '../types/domain';

// 목 데이터
export const mockOverview: OverviewDto = {
  monthTotal: 1247,
  momDeltaPct: 12.5,
  topSmall: {
    name: '배송 지연 문의',
    sharePct: 23.8
  }
};

export const mockCategoryShare: CategoryShareResponse = {
  totalCount: 1247,
  items: [
    { bigCategory: '배송문의', count: 387, sharePct: 31.0 },
    { bigCategory: '상품문의', count: 298, sharePct: 23.9 },
    { bigCategory: '취소/환불', count: 186, sharePct: 14.9 },
    { bigCategory: '교환/반품', count: 149, sharePct: 11.9 },
    { bigCategory: '결제문의', count: 124, sharePct: 9.9 },
    { bigCategory: '기타문의', count: 87, sharePct: 7.0 },
    { bigCategory: '회원문의', count: 16, sharePct: 1.3 }
  ]
};

export const mockVocSeries: TimeSeriesData = {
  labels: ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
  values: [45, 52, 38, 61, 49, 57, 43]
};

export const mockSmallTrends: SmallTrendsData = {
  labels: ['배송 지연', '상품 불량', '환불 요청', '교환 문의', '결제 오류', '사이즈 문의'],
  values: [298, 186, 149, 124, 87, 73],
  deltas: [12.5, -8.3, 5.7, -2.1, 15.8, -4.6]
};

export const mockInsights: InsightCard[] = [
  {
    id: '1',
    title: '배송 지연 문의 급증 알림',
    summary: '최근 3일간 배송 지연 관련 문의가 평소 대비 35% 증가했습니다. 특정 지역(경기도 남부)에서 집중적으로 발생하고 있어 물류팀 검토가 필요합니다.',
    tags: ['배송', '지연', '경기도'],
    assigneeTeam: '물류팀'
  },
  {
    id: '2',
    title: '신제품 사이즈 문의 패턴 분석',
    summary: '11월 출시 신제품의 사이즈 관련 문의가 지속적으로 발생하고 있습니다. 사이즈 가이드 개선 또는 상품 상세 정보 보완이 필요해 보입니다.',
    tags: ['신제품', '사이즈', '상품정보'],
    assigneeTeam: '상품팀'
  },
  {
    id: '3',
    title: '결제 오류 증가 추세',
    summary: '특정 결제 수단(카카오페이)에서 오류가 빈발하고 있습니다. 기술팀과 협의하여 결제 모듈 점검이 필요합니다.',
    tags: ['결제', '오류', '카카오페이'],
    assigneeTeam: '기술팀'
  },
  {
    id: '4',
    title: '고객 만족도 개선 기회',
    summary: '교환/반품 처리 시간에 대한 불만이 증가하고 있습니다. 프로세스 개선을 통해 고객 만족도를 높일 수 있을 것으로 보입니다.',
    tags: ['교환', '반품', '프로세스'],
    assigneeTeam: 'CS팀'
  }
];

export const mockVocList: VocListData = {
  totalCount: 1247,
  page: 1,
  size: 20,
  totalPages: 63,
  items: [
    {
      vocId: 'VOC-20231101-001',
      consultingDate: '2023-11-01',
      consultingCategory: '배송 지연 문의',
      clientAge: '30s',
      clientGender: 'F',
      summary: '주문한 상품이 예정일보다 3일 늦게 도착했습니다. 급하게 필요한 상품이었는데 매우 불편했습니다.'
    },
    {
      vocId: 'VOC-20231101-002',
      consultingDate: '2023-11-01',
      consultingCategory: '상품 불량',
      clientAge: '40s',
      clientGender: 'M',
      summary: '배송받은 신발에 스크래치가 있어서 교환을 요청드립니다. 포장은 깨끗했는데 상품에 문제가 있네요.'
    },
    {
      vocId: 'VOC-20231101-003',
      consultingDate: '2023-11-01',
      consultingCategory: '환불 요청',
      clientAge: '20s',
      clientGender: 'F',
      summary: '사이즈가 맞지 않아 환불을 요청합니다. 사이즈 가이드와 실제 사이즈가 다른 것 같아요.'
    },
    {
      vocId: 'VOC-20231031-015',
      consultingDate: '2023-10-31',
      consultingCategory: '결제 오류',
      clientAge: '30s',
      clientGender: 'M',
      summary: '카카오페이로 결제하려고 했는데 계속 오류가 발생합니다. 다른 결제 수단으로는 정상 처리됩니다.'
    },
    {
      vocId: 'VOC-20231031-014',
      consultingDate: '2023-10-31',
      consultingCategory: '사이즈 문의',
      clientAge: '20s',
      clientGender: 'F',
      summary: '신제품 원피스 사이즈 문의드립니다. 평소 M 사이즈 입는데 이 제품도 M으로 주문해도 될까요?'
    }
  ]
};

export const mockVocDetail: VocDetailData = {
  vocId: 'VOC-20231101-001',
  consultingDate: '2023-11-01',
  consultingCategory: '배송 지연 문의',
  clientAge: '30s',
  clientGender: 'F',
  summary: '주문한 상품이 예정일보다 3일 늦게 도착했습니다. 급하게 필요한 상품이었는데 매우 불편했습니다.',
  fullContent: `안녕하세요. 10월 28일에 주문한 상품(주문번호: ORD-20231028-1234)이 예정 배송일인 10월 30일을 넘어서 11월 2일에 도착했습니다.

결혼식에 착용하려고 급하게 주문한 드레스였는데, 3일이나 늦게 도착해서 정말 당황스러웠습니다. 다행히 결혼식 전날에 도착해서 큰 문제는 없었지만, 만약 더 늦었다면 정말 큰일날 뻔했습니다.

배송 추적을 확인해보니 물류센터에서 2일 동안 지연되었다고 나와있더라고요. 이런 경우에는 미리 연락을 주시면 좋겠습니다. 고객이 배송 추적을 직접 확인해야 하는 상황은 좀 불편한 것 같아요.

앞으로는 이런 일이 없도록 배송 관리를 좀 더 철저히 해주시기 바랍니다.`,
  keywords: ['배송지연', '결혼식', '드레스', '물류센터', '배송추적'],
  sentiment: '불만',
  duration: 420,
  channel: '전화'
};

export const mockMailPreview: MailPreview = {
  to: 'logistics@company.com',
  subject: '[긴급] 배송 지연 관련 고객 불만 처리 요청 - VOC-20231101-001',
  body: `물류팀 담당자님께,

고객 VoC 관련하여 긴급히 검토가 필요한 사항이 있어 연락드립니다.

[고객 정보]
- VoC ID: VOC-20231101-001
- 상담일: 2023-11-01
- 카테고리: 배송 지연 문의
- 고객: 30대 여성

[문제 상황]
주문번호 ORD-20231028-1234 상품이 예정 배송일(10월 30일)보다 3일 늦게 배송되어 고객 불만이 발생했습니다. 특히 결혼식용 드레스로 급히 필요한 상품이었던 점을 고려할 때 고객의 불편이 컸을 것으로 판단됩니다.

[요청 사항]
1. 해당 주문 건의 배송 지연 원인 분석
2. 유사한 지연 사례 재발 방지 대책 수립
3. 지연 발생 시 고객 사전 안내 프로세스 개선

빠른 시일 내에 검토 결과를 공유해 주시기 바랍니다.

감사합니다.

InsightOps 시스템
생성일시: 2023-11-01 14:30:00`
};

export const mockRecentMessages: MailLog[] = [
  {
    id: 'MAIL-001',
    to: 'logistics@company.com',
    subject: '[긴급] 배송 지연 관련 고객 불만 처리 요청',
    status: 'SENT',
    sentAt: '2023-11-01T14:30:00Z'
  },
  {
    id: 'MAIL-002',
    to: 'product@company.com',
    subject: '신제품 사이즈 가이드 개선 요청',
    status: 'SENT',
    sentAt: '2023-11-01T13:15:00Z'
  },
  {
    id: 'MAIL-003',
    to: 'tech@company.com',
    subject: '카카오페이 결제 오류 관련 검토 요청',
    status: 'QUEUED',
    sentAt: '2023-11-01T12:45:00Z'
  },
  {
    id: 'MAIL-004',
    to: 'cs@company.com',
    subject: '교환/반품 프로세스 개선 제안',
    status: 'SENT',
    sentAt: '2023-11-01T11:20:00Z'
  },
  {
    id: 'MAIL-005',
    to: 'invalid@company.com',
    subject: '테스트 메일',
    status: 'FAILED',
    sentAt: '2023-11-01T10:00:00Z'
  }
];
