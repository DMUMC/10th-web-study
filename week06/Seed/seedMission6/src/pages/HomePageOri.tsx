import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpListOri.ts";

const HomePage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("타입");

    const {
        data, isFetching, hasNextPage, isPending, fetNextPage, isError } =
        useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

    const { ref, inView } = useInView()

    // const { data: lpList, isPending, isError } = useGetLpList({
    //     search,
    //     cursor: 0,
    //     order: PAGINATION_ORDER.desc,
    //     limit: 50,
    // });

    if (isPending) {
        return <div className="mt-20">Loading...</div>;
    }

    if (isError) {
        return <div className="mt-20">Error...</div>
    }

    return (
        <div className={"mt-20"}>
            {data?.pages?.map((page) => (
                <div
                    key={page.data.data}
                    onClick={() => navigate(`/lp/${lp.id}`)}
                    className="relative group w-full aspect-square overflow-hidden rounded-xl"
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
    )
};

export default HomePage;