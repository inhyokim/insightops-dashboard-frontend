import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageSquare, User, Send } from 'lucide-react';
import { useVocCases, useVocCaseDetail } from '../hooks/useVocCases';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { getDefaultDateRange, formatLocalDate, formatCurrentTime } from '../utils/date';
import { truncateText, getStatusColorClass } from '../utils/format';
import { cn } from '../utils/cn';
import type { VocListItem, FilterRequest } from '../types/domain';

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVocId, setSelectedVocId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters] = useState<FilterRequest>(() => {
    const defaultRange = getDefaultDateRange();
    return {
      from: defaultRange.from,
      to: defaultRange.to,
      page: currentPage,
      size: 20
    };
  });

  const casesQuery = useVocCases({ ...filters, page: currentPage });
  const detailQuery = useVocCaseDetail(selectedVocId || '');

  const handleCaseClick = (vocId: string) => {
    setSelectedVocId(vocId);
  };

  const handleActionClick = (vocId: string) => {
    navigate(`/action?vocId=${vocId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderCaseList = () => {
    if (casesQuery.isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border p-4 shadow-sm">
              <LoadingSkeleton lines={3} />
            </div>
          ))}
        </div>
      );
    }

    if (casesQuery.error) {
      return (
        <ErrorState
          title="케이스 로드 실패"
          description="VoC 케이스 목록을 불러올 수 없습니다."
          onRetry={() => casesQuery.refetch()}
        />
      );
    }

    const cases = casesQuery.data?.items || [];
    
    if (cases.length === 0) {
      return (
        <EmptyState
          title="케이스가 없습니다"
          description="조건에 맞는 VoC 케이스를 찾을 수 없습니다."
        />
      );
    }

    return (
      <div className="space-y-3">
        {cases.map((vocCase) => (
          <CaseListItem
            key={vocCase.vocId}
            case={vocCase}
            isSelected={selectedVocId === vocCase.vocId}
            onClick={() => handleCaseClick(vocCase.vocId)}
          />
        ))}
        
        {/* 페이지네이션 */}
        {casesQuery.data && casesQuery.data.totalPages && casesQuery.data.totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(casesQuery.data.totalPages, 5) }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCaseDetail = () => {
    if (!selectedVocId) {
      return (
        <div className="bg-white rounded-lg border p-8 shadow-sm">
          <EmptyState
            title="케이스를 선택하세요"
            description="좌측 목록에서 케이스를 선택하면 상세 정보가 표시됩니다."
            icon={<MessageSquare className="h-12 w-12 text-gray-400" />}
          />
        </div>
      );
    }

    if (detailQuery.isLoading) {
      return (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <LoadingSkeleton lines={8} />
        </div>
      );
    }

    if (detailQuery.error || !detailQuery.data) {
      return (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <ErrorState
            title="상세 정보 로드 실패"
            description="케이스 상세 정보를 불러올 수 없습니다."
            onRetry={() => detailQuery.refetch()}
          />
        </div>
      );
    }

    const detail = detailQuery.data;

    return (
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              케이스 상세 정보
            </h3>
            <span className="text-sm text-gray-500">
              {detail.vocId}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">상담일:</span>
              <span className="ml-2 font-medium">
                {formatLocalDate(detail.consultingDate)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">카테고리:</span>
              <span className="ml-2 font-medium">
                {detail.consultingCategory}
              </span>
            </div>
            <div>
              <span className="text-gray-500">연령대:</span>
              <span className="ml-2 font-medium">
                {detail.clientAge || '-'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">성별:</span>
              <span className="ml-2 font-medium">
                {detail.clientGender === 'M' ? '남성' : detail.clientGender === 'F' ? '여성' : '-'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 요약 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">요약</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {detail.summary || '요약 정보가 없습니다.'}
            </p>
          </div>

          {/* 전체 내용 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">전체 내용</h4>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed max-h-60 overflow-y-auto">
              {detail.fullContent || '내용이 없습니다.'}
            </div>
          </div>

          {/* 키워드 */}
          {detail.keywords && detail.keywords.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">키워드</h4>
              <div className="flex flex-wrap gap-2">
                {detail.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 추가 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            {detail.sentiment && (
              <div>
                <span className="text-gray-500 text-sm">감정:</span>
                <span className="ml-2 font-medium text-sm">
                  {detail.sentiment}
                </span>
              </div>
            )}
            {detail.duration && (
              <div>
                <span className="text-gray-500 text-sm">통화시간:</span>
                <span className="ml-2 font-medium text-sm">
                  {Math.floor(detail.duration / 60)}분 {detail.duration % 60}초
                </span>
              </div>
            )}
            {detail.channel && (
              <div>
                <span className="text-gray-500 text-sm">채널:</span>
                <span className="ml-2 font-medium text-sm">
                  {detail.channel}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={() => handleActionClick(detail.vocId)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="h-4 w-4 mr-2" />
            담당팀에 액션 아이템 전달
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담내용 상세</h1>
          <p className="text-sm text-gray-500 mt-1">
            마지막 업데이트: {formatCurrentTime()}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          총 {casesQuery.data?.totalCount || 0}건
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 좌측: 케이스 목록 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            최근 케이스 목록
          </h2>
          {renderCaseList()}
        </div>

        {/* 우측: 케이스 상세 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            케이스 상세
          </h2>
          {renderCaseDetail()}
        </div>
      </div>
    </div>
  );
};

interface CaseListItemProps {
  case: VocListItem;
  isSelected: boolean;
  onClick: () => void;
}

const CaseListItem: React.FC<CaseListItemProps> = ({ 
  case: vocCase, 
  isSelected, 
  onClick 
}) => {
  const getImportanceBadge = (category: string) => {
    // 간단한 중요도 로직 (실제로는 백엔드에서 제공)
    const highPriority = ['취소/환불', '결제문의'];
    if (highPriority.includes(category)) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">높음</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">보통</span>;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-lg border p-4 shadow-sm cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-blue-500 bg-blue-50"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getImportanceBadge(vocCase.consultingCategory)}
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {vocCase.consultingCategory}
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {formatLocalDate(vocCase.consultingDate)}
        </div>
      </div>

      <p className="text-sm text-gray-900 mb-2 line-clamp-2">
        {truncateText(vocCase.summary || '요약 정보가 없습니다.', 100)}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {vocCase.clientAge && (
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {vocCase.clientAge}
            </span>
          )}
          {vocCase.clientGender && (
            <span>
              {vocCase.clientGender === 'M' ? '남성' : '여성'}
            </span>
          )}
        </div>
        <span className="text-gray-400">
          ID: {vocCase.vocId.slice(-8)}
        </span>
      </div>
    </div>
  );
};
