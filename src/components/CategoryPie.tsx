import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '../utils/cn';
import { formatNumber, formatPercent } from '../utils/format';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import type { ShareItem } from '../types/domain';

interface CategoryPieProps {
  data: ShareItem[];  // 백엔드 API 응답과 일치
  loading?: boolean;
  error?: boolean;
  className?: string;
  title?: string;
}

const COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
];

export const CategoryPie: React.FC<CategoryPieProps> = ({
  data,
  loading = false,
  error = false,
  className,
  title = "카테고리 비중"
}) => {
  if (loading) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <LoadingSkeleton lines={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <EmptyState
          title="데이터 로드 실패"
          description="차트 데이터를 불러올 수 없습니다."
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <EmptyState
          title="데이터 없음"
          description="표시할 카테고리 데이터가 없습니다."
        />
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            건수: {formatNumber(data.count)}건
          </p>
          <p className="text-sm text-gray-600">
            비중: {formatPercent(data.ratio)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="count"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm">
                  {value} ({formatPercent(entry.payload.ratio)})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
