import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("타입");
    const { data: lpList, isPending, isError } = useGetLpList({
        search,
        cursor: 0,
        order: PAGINATION_ORDER.desc,
        limit: 10,
    });

    if (isPending) {
        return <div className="mt-20">Loading...</div>;
    }

    if (isError) {
        return <div className="mt-20">Error...</div>
    }

    return (
        <div className={"mt-20"}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            {lpList?.data.map((lp) => (
                <>
                    <div
                        key={lp.id}
                        onClick={() => navigate(`/lp/${lp.id}`)}
                        className="relative group w-50 h-50 overflow-hidden rounded-xl"
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


                </>
            ))}
        </div>
    )
};

export default HomePage;