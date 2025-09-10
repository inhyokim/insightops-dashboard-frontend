import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { useOverview } from '../hooks/useOverview';
import { KpiCard } from '../components/KpiCard';
import { CategoryPie } from '../components/CategoryPie';
import { LineSeries } from '../components/LineSeries';
import { InsightGrid } from '../components/InsightCard';
import { getDefaultDateRange, formatCurrentTime } from '../utils/date';
import type { Period } from '../types/domain';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>('daily');
  const { from, to } = getDefaultDateRange();
  
  const { overview, share, series, insights } = useOverview(from, to, period);

  const handleInsightAction = (insightId: string) => {
    navigate(`/action?insightId=${insightId}`);
  };

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">현황 요약</h1>
          <p className="text-sm text-gray-500 mt-1">
            마지막 업데이트: {formatCurrentTime()}
          </p>
        </div>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiCard
          title="이달의 전체 VoC 건수"
          value={overview.data?.thisMonthCount || 0}
          delta={overview.data?.deltaPercent}
          deltaLabel="전월 대비"
          icon={MessageSquare}
          tooltip="이번 달 총 VoC 건수와 전월 대비 증감률"
        />
        <KpiCard
          title="Top Small 카테고리"
          value={overview.data?.topSmall || '-'}
          delta={overview.data?.topSmallShare}
          deltaLabel="전체 비중"
          icon={TrendingUp}
          tooltip="가장 많은 VoC가 발생한 세부 카테고리"
        />
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPie
          data={share.data?.items || []}
          loading={share.isLoading}
          error={!!share.error}
          title="Big 카테고리 비중"
        />
        <LineSeries
          data={series.data || { labels: [], values: [] }}
          period={period}
          loading={series.isLoading}
          error={!!series.error}
          title="전체 VoC 변화량"
          onPeriodChange={handlePeriodChange}
        />
      </div>

      {/* 인사이트 카드 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          주요 인사이트
        </h2>
        <InsightGrid
          insights={insights.data || []}
          loading={insights.isLoading}
          error={!!insights.error}
          onActionClick={handleInsightAction}
        />
      </div>
    </div>
  );
};
