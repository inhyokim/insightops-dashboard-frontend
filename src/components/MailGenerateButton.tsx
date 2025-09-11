import React, { useState } from 'react';
import { useMailGenerate } from '../hooks/useMailGenerate';

interface MailGenerateButtonProps {
  categoryId: string;
  className?: string;
  onMailGenerated?: (mailData: {
    subject: string;
    content: string;
    categoryId: string;
    success: boolean;
    message: string;
  }) => void;
}

export const MailGenerateButton: React.FC<MailGenerateButtonProps> = ({
  categoryId,
  className = '',
  onMailGenerated
}) => {
  const { generateMail, isGenerating, error } = useMailGenerate();
  const [showPreview, setShowPreview] = useState(false);
  const [mailContent, setMailContent] = useState<{
    subject: string;
    content: string;
  } | null>(null);

  const handleGenerateMail = async () => {
    try {
      const result = await generateMail(categoryId);
      
      if (result.success) {
        setMailContent({
          subject: result.subject,
          content: result.content
        });
        setShowPreview(true);
        onMailGenerated?.(result);
      } else {
        alert(`메일 생성 실패: ${result.message}`);
      }
    } catch (err) {
      console.error('메일 생성 오류:', err);
      alert('메일 생성 중 오류가 발생했습니다.');
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setMailContent(null);
  };

  const handleSendMail = () => {
    // TODO: 메일 발송 로직 구현
    alert('메일 발송 기능은 추후 구현 예정입니다.');
    handleClosePreview();
  };

  return (
    <>
      <button
        onClick={handleGenerateMail}
        disabled={isGenerating || !categoryId}
        className={`inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors ${className}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            메일 생성 중...
          </>
        ) : (
          '메일 작성'
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          오류: {error}
        </div>
      )}

      {/* 메일 미리보기 모달 */}
      {showPreview && mailContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">메일 미리보기</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={mailContent.subject}
                  onChange={(e) => setMailContent({ ...mailContent, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  value={mailContent.content}
                  onChange={(e) => setMailContent({ ...mailContent, content: e.target.value })}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleClosePreview}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSendMail}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                메일 발송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
