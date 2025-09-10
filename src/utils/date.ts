import { format, startOfMonth, endOfMonth, subMonths, isValid } from 'date-fns';

/**
 * Date를 UTC 기준 YYYY-MM-DD 형식으로 변환
 */
export const toUtcDateOnly = (d: Date): string => {
  if (!isValid(d)) {
    throw new Error('Invalid date provided');
  }
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10);
};

/**
 * 현재 월의 첫날을 UTC 날짜 문자열로 반환
 */
export const getCurrentMonthStart = (): string => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  return toUtcDateOnly(monthStart);
};

/**
 * 현재 날짜를 UTC 날짜 문자열로 반환
 */
export const getCurrentDate = (): string => {
  return toUtcDateOnly(new Date());
};

/**
 * 지정된 개월 수만큼 이전 날짜를 UTC 날짜 문자열로 반환
 */
export const getDateMonthsAgo = (months: number): string => {
  const date = subMonths(new Date(), months);
  return toUtcDateOnly(date);
};

/**
 * 날짜 문자열을 로컬 형식으로 포맷
 */
export const formatLocalDate = (dateString: string, formatStr: string = 'yyyy-MM-dd'): string => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return dateString;
  }
  return format(date, formatStr);
};

/**
 * 현재 시간을 로컬 형식으로 포맷
 */
export const formatCurrentTime = (formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string => {
  return format(new Date(), formatStr);
};

/**
 * 날짜 범위 검증
 */
export const isValidDateRange = (from: string, to: string): boolean => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return isValid(fromDate) && isValid(toDate) && fromDate <= toDate;
};

/**
 * 기본 날짜 범위 생성 (이번 달 1일 ~ 오늘)
 */
export const getDefaultDateRange = (): { from: string; to: string } => {
  return {
    from: getCurrentMonthStart(),
    to: getCurrentDate()
  };
};
