/**
 * 숫자를 천 단위 구분자와 함께 포맷
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

/**
 * 퍼센트 포맷
 */
export const formatPercent = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

/**
 * 델타 퍼센트 포맷 (부호 포함)
 */
export const formatDeltaPercent = (num: number, decimals: number = 1): string => {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(decimals)}%`;
};

/**
 * 델타 값의 색상 클래스 반환
 */
export const getDeltaColorClass = (delta: number): string => {
  if (delta > 0) return 'text-green-600';
  if (delta < 0) return 'text-red-600';
  return 'text-gray-500';
};

/**
 * 상태에 따른 배지 색상 클래스 반환
 */
export const getStatusColorClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'sent':
      return 'bg-green-100 text-green-800';
    case 'queued':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * 문자열 자르기
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
