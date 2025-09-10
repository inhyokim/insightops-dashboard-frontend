import React from 'react';
import { Send, Tag, Users } from 'lucide-react';
import { cn } from '../utils/cn';
import type { InsightCard as InsightCardType } from '../types/domain';

interface InsightCardProps {
  insight: InsightCardType;
  onActionClick?: (insightId: string) => void;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  onActionClick,
  className
}) => {
  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick(insight.id);
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {insight.title}
        </h3>
        <div className="flex-shrink-0 ml-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {insight.summary}
      </p>
      
      {insight.tags && insight.tags.length > 0 && (
        <div className="flex items-center mb-4">
          <Tag className="h-4 w-4 text-gray-400 mr-2" />
          <div className="flex flex-wrap gap-1">
            {insight.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
            {insight.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{insight.tags.length - 3}개
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {insight.assigneeTeam && (
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{insight.assigneeTeam}</span>
          </div>
        )}
        
        <button
          onClick={handleActionClick}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Send className="h-4 w-4 mr-2" />
          담당자 전달
        </button>
      </div>
    </div>
  );
};

interface InsightGridProps {
  insights: InsightCardType[];
  loading?: boolean;
  error?: boolean;
  onActionClick?: (insightId: string) => void;
  className?: string;
}

export const InsightGrid: React.FC<InsightGridProps> = ({
  insights,
  loading = false,
  error = false,
  onActionClick,
  className
}) => {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-24 ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-gray-500">인사이트를 불러올 수 없습니다.</p>
      </div>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-gray-500">표시할 인사이트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          insight={insight}
          onActionClick={onActionClick}
        />
      ))}
    </div>
  );
};
