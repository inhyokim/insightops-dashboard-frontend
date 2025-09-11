import { useState } from 'react';
import { generateMailByCategory } from '../api/dashboard';

export interface MailGenerateResponse {
  subject: string;
  content: string;
  categoryId: string;
  success: boolean;
  message: string;
}

export const useMailGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mailData, setMailData] = useState<MailGenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMail = async (categoryId: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await generateMailByCategory(categoryId);
      setMailData(response);
      
      if (!response.success) {
        setError(response.message || '메일 생성에 실패했습니다.');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '메일 생성 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearMailData = () => {
    setMailData(null);
    setError(null);
  };

  return {
    generateMail,
    clearMailData,
    isGenerating,
    mailData,
    error
  };
};
