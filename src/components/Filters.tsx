import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import { cn } from '../utils/cn';

interface FilterValue {
  from: string;
  to: string;
  consultingCategory?: string;
  age?: string;
  gender?: string;
}

interface FiltersProps {
  value: FilterValue;
  onChange: (filters: FilterValue) => void;
  className?: string;
}

const CATEGORIES = [
  '전체',
  '상품문의',
  '배송문의', 
  '취소/환불',
  '교환/반품',
  '결제문의',
  '기타문의'
];

const AGE_GROUPS = [
  '전체',
  '10s',
  '20s',
  '30s',
  '40s',
  '50s',
  '60+'
];

const GENDERS = [
  '전체',
  'M',
  'F'
];

const PERIODS = [
  { label: '최근 1주', days: 7 },
  { label: '최근 1개월', days: 30 },
  { label: '최근 3개월', days: 90 },
];

export const Filters: React.FC<FiltersProps> = ({
  value,
  onChange,
  className
}) => {
  const handlePeriodChange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    onChange({
      ...value,
      from: from.toISOString().slice(0, 10),
      to: to.toISOString().slice(0, 10)
    });
  };

  const handleFieldChange = (field: keyof FilterValue, newValue: string) => {
    const updatedValue = {
      ...value,
      [field]: newValue === '전체' ? undefined : newValue
    };
    onChange(updatedValue);
  };

  return (
    <div className={cn(
      "bg-white rounded-lg border p-6 shadow-sm",
      className
    )}>
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">필터</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 기간 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기간
          </label>
          <div className="space-y-2">
            {PERIODS.map((period) => (
              <button
                key={period.days}
                onClick={() => handlePeriodChange(period.days)}
                className="block w-full text-left px-3 py-2 text-sm border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {period.label}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">시작일</label>
              <input
                type="date"
                value={value.from}
                onChange={(e) => handleFieldChange('from', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">종료일</label>
              <input
                type="date"
                value={value.to}
                onChange={(e) => handleFieldChange('to', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            value={value.consultingCategory || '전체'}
            onChange={(e) => handleFieldChange('consultingCategory', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 연령대 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연령대
          </label>
          <select
            value={value.age || '전체'}
            onChange={(e) => handleFieldChange('age', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AGE_GROUPS.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별
          </label>
          <select
            value={value.gender || '전체'}
            onChange={(e) => handleFieldChange('gender', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender === 'M' ? '남성' : gender === 'F' ? '여성' : gender}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
