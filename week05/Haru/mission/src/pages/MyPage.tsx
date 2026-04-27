import React, { useEffect, useState } from 'react'
import type { ResponseMyInfoDto } from '../types/auth'
import { getMyInfo } from '../apis/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'   

const MyPage = () => {
  
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {


     const token = localStorage.getItem('accessToken');
      if(!TaskPriorityChangeEvent){
        navigate("/login", {replace:true});
        return;
      }
        const getData = async () => {
            try {
                const response: ResponseMyInfoDto = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error("내 정보 불러오기 실패:", error);
            }
        }
        getData();
    }, [accessToken, navigate]);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
            navigate("/");
        }
    };

    return (
       <div>
           
            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #ccc' }}>
                <span>마이페이지</span>
                <button onClick={() => { logout(); navigate('/'); }}>로그아웃</button>
            </header>

          
            <div>
                Mypage
            </div>
        </div>
    )
}

export default MyPage