import { useQuery } from '@tanstack/react-query';
import { getCases, getCaseDetail } from '../api/dashboard';
import type { FilterRequest } from '../types/domain';

export const useVocCases = (params: FilterRequest) => {
  return useQuery({
    queryKey: ['voc-cases', params],
    queryFn: () => getCases(params), // 이제 CaseItem[]을 직접 반환
    staleTime: 60_000,
    enabled: !!params.from && !!params.to
  });
};

export const useVocCaseDetail = (vocId: string) => {
  return useQuery({
    queryKey: ['voc-case-detail', vocId],
    queryFn: () => getCaseDetail(vocId),
    staleTime: 60_000,
    enabled: !!vocId
  });
};
