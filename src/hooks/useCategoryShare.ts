import { useQuery } from '@tanstack/react-query';
import { getCategoryShare } from '../api/dashboard';

export const useCategoryShare = (from: string, to: string) => {
  return useQuery({
    queryKey: ['category-share', from, to],
    queryFn: () => getCategoryShare(from, to),
    staleTime: 60_000,
    enabled: !!from && !!to
  });
};
