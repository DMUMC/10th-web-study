import React, { useEffect, useState } from 'react'
import type { ResponseMyInfoDto } from '../types/auth'
import { getMyInfo } from '../apis/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/login", { replace: true });
            return;
        }

        const getData = async () => {
            try {
                const response: ResponseMyInfoDto = await getMyInfo();
                setData(response);
            } catch (error) {
                console.error("내 정보 불러오기 실패:", error);
            }
        }
        getData();
    }, [accessToken, navigate]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">마이페이지</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                {data ? (
                    <div className="text-gray-700 dark:text-gray-200">
                        <p className="text-lg">안녕하세요, <span className="font-semibold">{data.data.email}</span>님!</p>
                       
                    </div>
                ) : (
                    <p className="text-gray-500">정보를 불러오는 중...</p>
                )}
            </div>
        </div>
    )
}

export default MyPage