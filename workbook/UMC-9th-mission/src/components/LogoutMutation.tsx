import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../api/auth';
import { useToken } from '../Context/TokenContext';

export const useLogout = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { logout: contextLogout } = useToken();

  return useMutation({
    mutationFn: logoutApi, // 서버 로그아웃 호출
    onSuccess: () => {
      // 1. Context 상태 초기화
      contextLogout();

      // 2. React Query 캐시 초기화
      qc.clear();

      // 3. 홈으로 이동
      navigate('/');
    },
    onError: () => {
      alert('로그아웃 실패');
    },
  });
};
