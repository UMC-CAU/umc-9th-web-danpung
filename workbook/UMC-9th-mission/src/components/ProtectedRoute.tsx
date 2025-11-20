import { Navigate, useLocation } from 'react-router-dom'; //보호 루트
import type { ReactNode } from 'react';
import { useToken } from '../Context/TokenContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    alert('로그인이 필요한 서비스입니다! 로그인을 해주세요.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
