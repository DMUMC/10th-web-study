import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [search, setSearch] = useState("");


    const { data: lpList, isPending, isError } = useGetLpList({
        search,
        cursor: 0,
        order: PAGINATION_ORDER.desc,
        limit: 10,
    });


    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, [])
    const [isBtn, setIsBtn] = useState(false);
    // const handleLogout = async () => {
    //     await logout();
    //     navigate("/");
    // }

    return (
        <div className="relative">
            {/* <h1>{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar ?? "https://t1.daumcdn.net/brunch/service/user/5rH/image/LHUiJV1nog0BqnOJ8Mtj5UbNTjQ"} className="w-15 h-15" alt={"구글 로고"} />
            <h1>{data?.data?.email}</h1>
            
            <button className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90" onClick={handleLogout}>로그아웃</button> */}
            {!isBtn && (
                <>
                    <button

                        className="mt-40 ml-150 w-30 h-10 bg-black text-white rounded-md">오래된순</button>
                    <button
                        onClick={() => setIsBtn(true)} className="w-30 h-10  bg-white text-black rounded-md border-1">최신순</button>

                </>
            )}
            {isBtn && (
                <>
                    <button
                        onClick={() => setIsBtn(false)} className="mt-40 ml-150 w-30 h-10 bg-white text-black rounded-md border-1">오래된순</button>
                    <button
                        className="w-30 h-10  bg-black text-white rounded-md border-1">최신순</button>

                </>
            )}
            <div className={"mt-5 grid grid-cols-4 gap-4"}>
                {/* 검색: <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                {lpList?.data.map((lp) => (
                    <div
                        key={lp.id}
                        onClick={() => navigate(`/lp/${lp.id}`)}
                        className="relative group w-52 h-52 overflow-hidden rounded-xl"
                    >
                        <img src={lp.thumbnail} alt={lp.title} className="w-50 h-50" />
                        <div
                            className="
                                 absolute inset-0
                                 bg-black/60
                                 opacity-0
                                 group-hover:opacity-100
                                 transition-opacity
                                 duration-300
                                 flex flex-col justify-end
                                 p-4
                                 text-white
                                "
                        >
                            <h3 className="text-lg font-bold">{lp.title}</h3>
                            <p className="text-sm">{new Date(lp.updatedAt).toLocaleDateString()}</p>
                            <p className="text-sm">{lp.likes?.length ?? 0}</p>
                        </div>
                    </div>


                ))}


            </div>
            <button
                className="
                    fixed
                    bottom-20
                    right-20
                    w-16 h-16
                    rounded-full
                    bg-pink-400
                    text-white
                    text-3xl
                    shadow-2xl
                    hover:scale-110
                    transition-transform
                    duration-200
                "
                onClick={() => navigate(`/search`)}
            >
                +
            </button>
        </div>
    )
}

export default MyPage;