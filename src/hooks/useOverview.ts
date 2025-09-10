import { useQuery } from '@tanstack/react-query';
import { getOverview, getCategoryShare, getVocSeries, getInsights } from '../api/dashboard';
import type { Period } from '../types/domain';

export const useOverview = (from: string, to: string, period: Period) => {
  const overview = useQuery({
    queryKey: ['overview', period],
    queryFn: () => getOverview(period),
    staleTime: 60_000
  });

  const share = useQuery({
    queryKey: ['category-share', from, to],
    queryFn: () => getCategoryShare(from, to),
    staleTime: 60_000,
    enabled: !!from && !!to
  });

  const series = useQuery({
    queryKey: ['voc-series', period, from, to],
    queryFn: () => getVocSeries(period, from, to),
    staleTime: 60_000,
    enabled: !!period && !!from && !!to
  });

  const insights = useQuery({
    queryKey: ['insights'],
    queryFn: () => getInsights(6),
    staleTime: 60_000
  });

  return { overview, share, series, insights };
};
