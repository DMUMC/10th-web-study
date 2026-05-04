import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { LOCAL_STORAGE_KEY } from '../constans/key'; 

const GoogleCallback = () => {
  const navigate = useNavigate();

  const { setAccessToken, setRefreshToken } = useAuth(); 

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');


    if (accessToken && refreshToken) {
   
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);


      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
   
    
      navigate('/my', { replace: true }); 
    } else {
      
      navigate('/login');
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">로그인 처리 중...</h2>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
};

export default GoogleCallback;