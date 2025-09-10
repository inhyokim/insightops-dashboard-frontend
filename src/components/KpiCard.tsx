import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../utils/cn';
import { formatNumber, formatDeltaPercent, getDeltaColorClass } from '../utils/format';

interface KpiCardProps {
  title: string;
  value: number | string;
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  className?: string;
  tooltip?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  className,
  tooltip
}) => {
  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return TrendingUp;
    if (delta < 0) return TrendingDown;
    return Minus;
  };

  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      return formatNumber(val);
    }
    return val;
  };

  const DeltaIcon = delta !== undefined ? getDeltaIcon(delta) : null;

  return (
    <div className={cn(
      "bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow",
      className
    )} title={tooltip}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {formatValue(value)}
          </p>
          {delta !== undefined && (
            <div className={cn(
              "flex items-center mt-2 text-sm",
              getDeltaColorClass(delta)
            )}>
              {DeltaIcon && <DeltaIcon className="h-4 w-4 mr-1" />}
              <span>
                {formatDeltaPercent(delta)}
                {deltaLabel && ` ${deltaLabel}`}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0 ml-4">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};
