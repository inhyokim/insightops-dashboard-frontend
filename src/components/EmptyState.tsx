import React from 'react';
import { FileX, Search, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "데이터가 없습니다",
  description = "조건에 맞는 데이터를 찾을 수 없습니다.",
  icon,
  action,
  className
}) => {
  const defaultIcon = <FileX className="h-12 w-12 text-gray-400" />;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        {description}
      </p>
      {action}
    </div>
  );
};

export const SearchEmptyState: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12 text-gray-400" />}
      title="검색 결과가 없습니다"
      description={
        searchTerm 
          ? `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.`
          : "검색 조건을 확인하고 다시 시도해 주세요."
      }
    />
  );
};
