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

      if(!accessToken){
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
      <h1>{data?.data.name}님의 페이지입니다.</h1>
      <img src={data?.data.avator as string} alt={"구글 로고"} />
      <h1>{data?.data.email}</h1>

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default MyPage