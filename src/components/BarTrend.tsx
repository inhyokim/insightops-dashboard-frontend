import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../utils/cn';
import { formatNumber, formatDeltaPercent, getDeltaColorClass } from '../utils/format';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import type { SmallTrendsData } from '../types/domain';

interface BarTrendProps {
  data: SmallTrendsData;
  loading?: boolean;
  error?: boolean;
  className?: string;
  title?: string;
}

export const BarTrend: React.FC<BarTrendProps> = ({
  data,
  loading = false,
  error = false,
  className,
  title = "카테고리별 트렌드"
}) => {
  if (loading) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <LoadingSkeleton lines={8} />
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

  if (!data || !data.labels || data.labels.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <EmptyState
          title="데이터 없음"
          description="표시할 트렌드 데이터가 없습니다."
        />
      </div>
    );
  }

  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index] || 0,
    delta: data.deltas[index] || 0
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">
            건수: {formatNumber(data.value)}건
          </p>
          <p className={cn("text-sm", getDeltaColorClass(data.delta))}>
            전월 대비: {formatDeltaPercent(data.delta)}
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
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Delta badges below chart */}
      <div className="mt-4 flex flex-wrap gap-2">
        {chartData.map((item, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 text-xs"
          >
            <span className="text-gray-600 truncate max-w-20">
              {item.name}
            </span>
            <span className={cn(
              "px-2 py-1 rounded-full font-medium",
              item.delta > 0 
                ? "bg-green-100 text-green-700"
                : item.delta < 0
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            )}>
              {formatDeltaPercent(item.delta)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
