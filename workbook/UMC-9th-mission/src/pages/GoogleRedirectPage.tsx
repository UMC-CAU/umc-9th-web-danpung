import { useEffect } from 'react'; //구글 로그인
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToken } from '../Context/TokenContext';

const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useToken();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      login(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
    } else {
      alert('로그인 실패');
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return <p>로그인 중...</p>;
};

export default GoogleRedirectPage;
