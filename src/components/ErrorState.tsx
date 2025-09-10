import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "오류가 발생했습니다",
  description = "데이터를 불러오는 중 문제가 발생했습니다.",
  onRetry,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          다시 시도
        </button>
      )}
    </div>
  );
};
