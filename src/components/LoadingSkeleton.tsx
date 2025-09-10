import React from 'react';
import { cn } from '../utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className,
  lines = 1 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 rounded h-4 w-full"
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC<{ className?: string; height?: number }> = ({ 
  className, 
  height = 300 
}) => {
  return (
    <div className={cn("bg-white rounded-lg border p-6 shadow-sm", className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div 
          className="bg-gray-200 rounded"
          style={{ height: `${height}px` }}
        />
      </div>
    </div>
  );
};
