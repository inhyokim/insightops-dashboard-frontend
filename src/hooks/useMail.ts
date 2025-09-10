import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMailPreview, getRecentMessages, sendMail } from '../api/dashboard';
import type { MailSendRequest } from '../types/domain';
import toast from 'react-hot-toast';

export const useMailPreview = (params: { vocId?: string; insightId?: string }) => {
  return useQuery({
    queryKey: ['mail-preview', params],
    queryFn: () => getMailPreview(params),
    staleTime: 60_000,
    enabled: !!(params.vocId || params.insightId)
  });
};

export const useRecentMessages = (limit = 10) => {
  return useQuery({
    queryKey: ['recent-messages', limit],
    queryFn: () => getRecentMessages(limit),
    staleTime: 30_000
  });
};

export const useSendMail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MailSendRequest) => sendMail(data),
    onSuccess: (result) => {
      toast.success('메일이 성공적으로 발송되었습니다.');
      // 최근 메시지 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['recent-messages'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '메일 발송에 실패했습니다.');
    }
  });
};
