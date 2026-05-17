import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import useGetLp from "../hooks/queries/useGetLp.ts";


function LpDetailPage() {
    const { lpId } = useParams();

    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [search, setSearch] = useState("")
    const { data: lp, isPending, isError } = useGetLp(Number(lpId));;

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, [])


    return (
        <div className="mt-40 w-220 h-200 flex items-center justify-center flex-col
        ">
            <div className="w-full flex items-center">
                <h1>{lp?.data?.title}</h1>
                <button className="ml-30 w-15 h-10 border-1 rounded-md">수정</button>
                <button className="mt-5 mb-5 w-15 h-10 border-1 rounded-md">삭제</button>
            </div>
            <div className="relative w-120 h-120 pt-10 pb-10 flex justify-center items-center bg-pink-200">
                <div className="absolute rounded-[50%] w-20 h-20 bg-white border-2 border-gray-300"></div>
                <img src={lp?.data?.thumbnail} alt={lp?.data?.title} className="w-100 h-100 rounded-[50%]" />
            </div>
            <p className="mt-5">{lp?.data?.content}</p>

            <div className="mt-10 mb-10">
                ❤️ {lp?.data?.likes?.length}
            </div>
        </div>
    )

}

export default LpDetailPage;