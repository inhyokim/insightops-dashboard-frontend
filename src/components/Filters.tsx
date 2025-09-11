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
  '이용내역 안내',
  '한도 안내',
  '가상계좌 안내',
  '서비스 이용방법 안내',
  '결제대금 안내',
  '약관 안내',
  '상품 안내',
  '도난/분실 신청/해제',
  '승인취소/매출취소 안내',
  '선결제/즉시출금',
  '연체대금 즉시출금',
  '결제일 안내/변경',
  '한도상향 접수/처리',
  '결제계좌 안내/변경',
  '포인트/마일리지 전환등록',
  '증명서/확인서 발급',
  '가상계좌 예약/취소',
  '단기카드대출 안내/실행',
  '장기카드대출 안내',
  '심사 진행사항 안내',
  '정부지원 바우처 (등유, 임신 등)',
  '도시가스',
  '이벤트 안내',
  '일부결제 대금이월약정 안내',
  '일부결제대금이월약정 해지'
];

const AGE_GROUPS = [
  '전체',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대+'
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
