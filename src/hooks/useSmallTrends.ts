import { useQuery } from '@tanstack/react-query';
import { getSmallTrends } from '../api/dashboard';
import type { FilterRequest } from '../types/domain';

export const useSmallTrends = (params: FilterRequest) => {
  return useQuery({
    queryKey: ['small-trends', params],
    queryFn: () => getSmallTrends(params),
    staleTime: 60_000,
    enabled: !!params.from && !!params.to
  });
};
