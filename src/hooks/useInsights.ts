import { useQuery } from '@tanstack/react-query';
import { getInsights } from '../api/dashboard';

export const useInsights = (limit = 6) => {
  return useQuery({
    queryKey: ['insights', limit],
    queryFn: () => getInsights(limit),
    staleTime: 60_000
  });
};
