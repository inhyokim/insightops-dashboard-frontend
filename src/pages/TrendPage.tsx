import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSmallTrends } from '../hooks/useSmallTrends';
import { Filters } from '../components/Filters';
import { BarTrend } from '../components/BarTrend';
import { getDefaultDateRange, formatCurrentTime } from '../utils/date';
import type { FilterRequest } from '../types/domain';

export const TrendPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL에서 필터 값 초기화
  const [filters, setFilters] = useState<FilterRequest>(() => {
    const defaultRange = getDefaultDateRange();
    return {
      from: searchParams.get('from') || defaultRange.from,
      to: searchParams.get('to') || defaultRange.to,
      consultingCategory: searchParams.get('category') || undefined,
      age: searchParams.get('age') || undefined,
      gender: searchParams.get('gender') || undefined
    };
  });

  const trendsQuery = useSmallTrends(filters);

  // 필터 변경 시 URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('from', filters.from);
    params.set('to', filters.to);
    
    if (filters.consultingCategory) {
      params.set('category', filters.consultingCategory);
    }
    if (filters.age) {
      params.set('age', filters.age);
    }
    if (filters.gender) {
      params.set('gender', filters.gender);
    }

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: FilterRequest) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">트렌드 분석</h1>
          <p className="text-sm text-gray-500 mt-1">
            마지막 업데이트: {formatCurrentTime()}
          </p>
        </div>
      </div>

      {/* 필터 */}
      <Filters
        value={filters}
        onChange={handleFiltersChange}
      />

      {/* 트렌드 차트 */}
      <BarTrend
        data={trendsQuery.data || { labels: [], values: [], deltas: [] }}
        loading={trendsQuery.isLoading}
        error={!!trendsQuery.error}
        title="Top 카테고리 트렌드"
      />

      {/* 추가 정보 */}
      {trendsQuery.data && (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            분석 결과 요약
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">분석 기간:</span>
              <span className="ml-2 font-medium">
                {filters.from} ~ {filters.to}
              </span>
            </div>
            <div>
              <span className="text-gray-500">카테고리 수:</span>
              <span className="ml-2 font-medium">
                {trendsQuery.data.labels.length}개
              </span>
            </div>
            <div>
              <span className="text-gray-500">전체 건수:</span>
              <span className="ml-2 font-medium">
                {trendsQuery.data.values.reduce((sum, val) => sum + val, 0).toLocaleString()}건
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
