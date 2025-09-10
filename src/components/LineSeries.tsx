import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../utils/cn';
import { formatNumber } from '../utils/format';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import type { TimeSeriesData, Period } from '../types/domain';

interface LineSeriesProps {
  data: TimeSeriesData;
  period: Period;
  loading?: boolean;
  error?: boolean;
  className?: string;
  title?: string;
  onPeriodChange?: (period: Period) => void;
}

const PERIOD_LABELS: Record<Period, string> = {
  daily: '일별',
  weekly: '주별',
  monthly: '월별'
};

export const LineSeries: React.FC<LineSeriesProps> = ({
  data,
  period,
  loading = false,
  error = false,
  className,
  title = "VoC 변화량",
  onPeriodChange
}) => {
  if (loading) {
    return (
      <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex space-x-2">
            {Object.keys(PERIOD_LABELS).map((key) => (
              <div key={key} className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
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
          description="표시할 시계열 데이터가 없습니다."
        />
      </div>
    );
  }

  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index] || 0
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">
            VoC: {formatNumber(payload[0].value)}건
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onPeriodChange && (
          <div className="flex space-x-1">
            {(Object.keys(PERIOD_LABELS) as Period[]).map((key) => (
              <button
                key={key}
                onClick={() => onPeriodChange(key)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                  period === key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                {PERIOD_LABELS[key]}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
