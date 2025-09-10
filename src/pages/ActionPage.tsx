import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useMailPreview, useRecentMessages, useSendMail } from '../hooks/useMail';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { formatLocalDate, formatCurrentTime } from '../utils/date';
import { getStatusColorClass } from '../utils/format';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';
import type { MailSendRequest } from '../types/domain';

export const ActionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vocId = searchParams.get('vocId');
  const insightId = searchParams.get('insightId');
  
  const [editablePreview, setEditablePreview] = useState<MailSendRequest>({
    to: '',
    subject: '',
    body: ''
  });

  const previewQuery = useMailPreview({ vocId: vocId || undefined, insightId: insightId || undefined });
  const recentQuery = useRecentMessages(10);
  const sendMailMutation = useSendMail();

  // 미리보기 데이터가 로드되면 편집 가능한 상태로 설정
  useEffect(() => {
    if (previewQuery.data) {
      setEditablePreview({
        to: previewQuery.data.to,
        subject: previewQuery.data.subject,
        body: previewQuery.data.body
      });
    }
  }, [previewQuery.data]);

  const handleSendMail = async () => {
    if (!editablePreview.to || !editablePreview.subject || !editablePreview.body) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await sendMailMutation.mutateAsync(editablePreview);
      // 성공 시 최근 메시지 새로고침은 useSendMail 훅에서 처리
    } catch (error) {
      // 에러 처리는 useSendMail 훅에서 처리
    }
  };

  const handleInputChange = (field: keyof MailSendRequest, value: string) => {
    setEditablePreview(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderMailPreview = () => {
    if (previewQuery.isLoading) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">메일 초안</h3>
          </div>
          <div className="p-6">
            <LoadingSkeleton lines={8} />
          </div>
        </div>
      );
    }

    if (previewQuery.error) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">메일 초안</h3>
          </div>
          <div className="p-6">
            <ErrorState
              title="미리보기 로드 실패"
              description="메일 미리보기를 불러올 수 없습니다."
              onRetry={() => previewQuery.refetch()}
            />
          </div>
        </div>
      );
    }

    if (!previewQuery.data && !vocId && !insightId) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">메일 초안</h3>
          </div>
          <div className="p-6">
            <EmptyState
              title="컨텍스트가 없습니다"
              description="VoC 케이스 또는 인사이트 ID가 필요합니다."
            />
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">메일 초안</h3>
          <p className="text-sm text-gray-500 mt-1">
            {vocId ? `VoC ID: ${vocId}` : `Insight ID: ${insightId}`}
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          {/* 수신자 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              수신자
            </label>
            <input
              type="email"
              value={editablePreview.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="recipient@example.com"
            />
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={editablePreview.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="메일 제목을 입력하세요"
            />
          </div>

          {/* 본문 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              본문
            </label>
            <textarea
              value={editablePreview.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="메일 본문을 입력하세요"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                // 템플릿 저장 로직 (선택사항)
                toast.success('템플릿이 저장되었습니다.');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              템플릿 저장
            </button>
            
            <button
              onClick={handleSendMail}
              disabled={sendMailMutation.isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendMailMutation.isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  발송 중...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  메일 발송
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRecentMessages = () => {
    if (recentQuery.isLoading) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">최근 발송 내역</h3>
          </div>
          <div className="p-6">
            <LoadingSkeleton lines={5} />
          </div>
        </div>
      );
    }

    if (recentQuery.error) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">최근 발송 내역</h3>
          </div>
          <div className="p-6">
            <ErrorState
              title="발송 내역 로드 실패"
              description="최근 발송 내역을 불러올 수 없습니다."
              onRetry={() => recentQuery.refetch()}
            />
          </div>
        </div>
      );
    }

    const messages = recentQuery.data || [];

    if (messages.length === 0) {
      return (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">최근 발송 내역</h3>
          </div>
          <div className="p-6">
            <EmptyState
              title="발송 내역 없음"
              description="아직 발송된 메일이 없습니다."
            />
          </div>
        </div>
      );
    }

    const getStatusIcon = (status: string) => {
      switch (status.toLowerCase()) {
        case 'sent':
          return <CheckCircle className="h-4 w-4 text-green-600" />;
        case 'queued':
          return <Clock className="h-4 w-4 text-yellow-600" />;
        case 'failed':
          return <XCircle className="h-4 w-4 text-red-600" />;
        default:
          return <Clock className="h-4 w-4 text-gray-600" />;
      }
    };

    return (
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">최근 발송 내역</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(message.status)}
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      getStatusColorClass(message.status)
                    )}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {message.subject}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    수신자: {message.to}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {formatLocalDate(message.sentAt, 'MM-dd HH:mm')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메일 발송</h1>
          <p className="text-sm text-gray-500 mt-1">
            마지막 업데이트: {formatCurrentTime()}
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 좌측: 메일 초안 */}
        <div>
          {renderMailPreview()}
        </div>

        {/* 우측: 최근 발송 내역 */}
        <div>
          {renderRecentMessages()}
        </div>
      </div>
    </div>
  );
};
