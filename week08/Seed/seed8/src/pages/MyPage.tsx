// import { useEffect, useState } from "react";
// import { getMyInfo } from "../apis/auth";
// import { ResponseMyInfoDto } from "../types/auth";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import useGetLpList from "../hooks/queries/useGetLpList.ts";
// import { PAGINATION_ORDER } from "../enums/common.ts";

// const MyPage = () => {
//     const navigate = useNavigate();
//     const { logout } = useAuth();
//     const [data, setData] = useState<ResponseMyInfoDto | null>(null);
//     const [search, setSearch] = useState("");


//     const { data: lpList, isPending, isError } = useGetLpList({
//         search,
//         cursor: 0,
//         order: PAGINATION_ORDER.desc,
//         limit: 10,
//     });


//     useEffect(() => {
//         const getData = async () => {
//             const response = await getMyInfo();
//             console.log(response);

//             setData(response);
//         }
//         getData();
//     }, [])
//     const [isBtn, setIsBtn] = useState(false);
//     // const handleLogout = async () => {
//     //     await logout();
//     //     navigate("/");
//     // }

//     return (
//         <div className="relative">
//             {/* <h1>{data?.data?.name}님 환영합니다.</h1>
//             <img src={data?.data?.avatar ?? "https://t1.daumcdn.net/brunch/service/user/5rH/image/LHUiJV1nog0BqnOJ8Mtj5UbNTjQ"} className="w-15 h-15" alt={"구글 로고"} />
//             <h1>{data?.data?.email}</h1>

//             <button className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90" onClick={handleLogout}>로그아웃</button> */}
//             {!isBtn && (
//                 <>
//                     <button

//                         className="mt-40 ml-150 w-30 h-10 bg-black text-white rounded-md">오래된순</button>
//                     <button
//                         onClick={() => setIsBtn(true)} className="w-30 h-10  bg-white text-black rounded-md border-1">최신순</button>

//                 </>
//             )}
//             {isBtn && (
//                 <>
//                     <button
//                         onClick={() => setIsBtn(false)} className="mt-40 ml-150 w-30 h-10 bg-white text-black rounded-md border-1">오래된순</button>
//                     <button
//                         className="w-30 h-10  bg-black text-white rounded-md border-1">최신순</button>

//                 </>
//             )}
//             <div className={"mt-5 grid grid-cols-4 gap-4"}>
//                 {/* 검색: <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
//                 {lpList?.data.map((lp) => (
//                     <div
//                         key={lp.id}
//                         onClick={() => navigate(`/lp/${lp.id}`)}
//                         className="relative group w-52 h-52 overflow-hidden rounded-xl"
//                     >
//                         <img src={lp.thumbnail} alt={lp.title} className="w-50 h-50" />
//                         <div
//                             className="
//                                  absolute inset-0
//                                  bg-black/60
//                                  opacity-0
//                                  group-hover:opacity-100
//                                  transition-opacity
//                                  duration-300
//                                  flex flex-col justify-end
//                                  p-4
//                                  text-white
//                                 "
//                         >
//                             <h3 className="text-lg font-bold">{lp.title}</h3>
//                             <p className="text-sm">{new Date(lp.updatedAt).toLocaleDateString()}</p>
//                             <p className="text-sm">{lp.likes?.length ?? 0}</p>
//                         </div>
//                     </div>


//                 ))}


//             </div>
//             <button
//                 className="
//                     fixed
//                     bottom-20
//                     right-20
//                     w-16 h-16
//                     rounded-full
//                     bg-pink-400
//                     text-white
//                     text-3xl
//                     shadow-2xl
//                     hover:scale-110
//                     transition-transform
//                     duration-200
//                 "
//                 onClick={() => navigate(`/search`)}
//             >
//                 +
//             </button>
//         </div>
//     )
// }

// export default MyPage;

// MainPage.tsx  (메인 페이지)
// - useInfiniteQuery  queryKey: ['lps', sort]
// - getNextPageParam → nextCursor
// - react-intersection-observer 로 바닥 감지 → fetchNextPage()
// - 초기 로딩(isPending): 상단에 SkeletonList
// - 추가 로딩(isFetchingNextPage): 하단에 SkeletonList

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useInfiniteLpList from "../hooks/queries/useInfiniteLpList";
import { LpCard, LpCardSkeletonList } from "../components/LpCard";
import record from "../images/record.png";
import profile from "../images/profile.png";
import useCreateLp from "../hooks/mutations/useCreateLp";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo, patchMyInfo } from "../apis/auth";

export default function MyPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [modal, setModal] = useState(false);
    const { accessToken } = useAuth();


    //사용자 정보 수정
    const [editName, setEditName] = useState("");
    const [editBio, setEditBio] = useState("");
    const [profModal, setProfModal] = useState(false);





    const [dataa, setDataa] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setDataa(response);
        }
        getData();
    }, [])



    // 바닥 감지 ref (react-intersection-observer)
    const { ref: bottomRef, inView } = useInView({ threshold: 0 });

    const {
        data,
        isPending,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        isError,
    } = useInfiniteLpList({ order, search, limit: 12 });

    // 바닥이 보이면 다음 페이지 요청
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // pages를 flat하게 펼쳐 단일 배열로
    const lpItems =
        data?.pages.flatMap(
            (page) => page.data.data.data ?? []
        ) ?? [];
    console.log(lpItems);


    const [thumbnail, setThumbnail] = useState<string | null>(null);


    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed) return; //빈 값 방지
        if (tags.includes(trimmed)) {
            alert("이미 추가된 태그입니다.");
            return; //중복 방지
        }


        setTags([...tags, trimmed]); // 새 태그 추가
        setTagInput("");
    }
    const handleRemoveTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    //AddLp
    const [lpName, setLpName] = useState("");
    const [lpContent, setLpContent] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const { mutate: createLp, isPending: isCreating } = useCreateLp();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnail(URL.createObjectURL(file));
        }
    };
    const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnail(URL.createObjectURL(file));
        }
    };


    return (
        <div className="min-h-screen bg-white-950 text-white">
            {/* ── 콘텐츠 ── */}
            <main className="px-6 py-8 max-w-6xl mx-auto">
                {isError && (
                    <p className="text-red-400 text-center py-20">
                        데이터를 불러오는 중 오류가 발생했습니다.
                    </p>
                )}

                <div className="text-black flex ml-100 mb-20">
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden bg-40"
                            onChange={handleProfileImgChange}
                        />
                        <img
                            src={thumbnail ?? profile}
                            className="w-40 h-40 rounded-full object-cover hover:opacity-80 transition-opacity"
                        />
                    </label>
                    <div className="flex flex-col mt-4 ml-4">
                        <div className="flex flex-row">
                            <div
                                className="w-50 h-10 mb-2 pl-2 flex items-center text-lg">{dataa?.data.name}</div>
                            <span
                                className="cursor-pointer flex items-center justify-center
                                 ml-4 rounded-lg border-1 h-10 w-10"
                                onClick={() => {
                                    setEditName(dataa?.data.name ?? "");
                                    setEditBio(dataa?.data.bio ?? "");
                                    setProfModal(true);
                                }}
                            > 설정 </span>
                        </div>
                        <div
                            className="w-62 h-8 mb-2 pl-2 flex items-center text-lg">
                            {dataa?.data?.bio ?? "상세설명"}</div>
                        <div
                            className="w-50 h-10 ml-2 flex items-center text-lg" >
                            {dataa?.data.email}</div>
                    </div>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* 초기 로딩: 상단에 스켈레톤 */}
                    {isPending && <LpCardSkeletonList count={12} />}

                    {/* 실제 데이터 */}
                    {!isPending &&
                        lpItems.map((lp) => <LpCard key={lp.id} lp={lp} />)}

                    {/* 추가 로딩: 하단에 스켈레톤 */}
                    {isFetchingNextPage && <LpCardSkeletonList count={4} />}
                </div>

                {/* 바닥 감지 트리거 (invisible) */}
                <div ref={bottomRef} className="h-10" />

                {/* 마지막 페이지 안내 */}
                {!hasNextPage && !isPending && lpItems.length > 0 && (
                    <p className="text-center text-zinc-500 text-sm mt-6">
                        모든 LP를 불러왔습니다 🎶
                    </p>
                )}

                {/* 검색 결과 없음 */}
                {!isPending && lpItems.length === 0 && !isError && (
                    <p className="text-center text-zinc-500 text-sm mt-20">
                        검색 결과가 없습니다.
                    </p>
                )}
            </main>

            {/* ── FAB ── */}
            <button
                onClick={() => {
                    setModal(true)
                }}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-2xl shadow-xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
            >
                +
            </button>
            {modal && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            // onClick={() => setModal(false)}
                            className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                            {/* 여기까지 모달 창 밖에 배경 어둡게 하는 부분 */}

                            {/* 이제 흰 모달창 */}
                            <div
                                className="bg-white rounded-[5%] w-120 h-170 flex flex-col items-center">

                                {/* 모달 창 안 내용 */}
                                {/* <div className="mt-6 flex justify-center gap-2"> */}

                                {/* 닫기 버튼 */}
                                <button onClick={() => setModal(false)}
                                    className="mt-6 ml-90 font-bold text-lg text-black hover:text-gray-500 w-5 h-5">
                                    X
                                </button>
                                {/* 레코드 이미지 */}
                                <label className="mt-8 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <img
                                        src={thumbnail ?? record}
                                        className="w-50 h-50 rounded-full object-cover hover:opacity-80 transition-opacity"
                                    />
                                </label>
                                <input type="text"
                                    value={lpName}
                                    onChange={(e) => {
                                        setLpName(e.target.value)
                                    }}
                                    placeholder="LP Name" className="rounded-lg mt-10 pl-2 w-100 h-10 text-black border-1" />
                                <input type="text"
                                    value={lpContent}
                                    onChange={(e) => {
                                        setLpContent(e.target.value)
                                    }}
                                    placeholder="LP Content" className="rounded-lg mt-5 pl-2 w-100 h-10 text-black border-1" />
                                <div className="flex justify-center items-center text-black mt-5">
                                    <input type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="LP Tag" className="border-1 rounded-lg mr-5 pl-2 w-80 h-10 " />
                                    <button
                                        onClick={handleAddTag}
                                        className="border-1 rounded-lg w-15 h-10 bg-blue-600 text-white font-semibold">
                                        Add
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 w-100 mt-5 px-1 max-h-20 overflow-y-auto">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-1 bg-zinc-100 text-zinc-800 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-zinc-200"
                                        >
                                            #{tag}
                                            <button
                                                onClick={() => handleRemoveTag(index)}
                                                className="text-zinc-400 hover:text-red-500 font-bold ml-1 text-[10px]"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))}
                                </div>



                                {/*추가 버튼 */}
                                <button
                                    onClick={() => {
                                        if (!lpName.trim()) return alert("LP 이름을 입력해주세요.");
                                        if (!lpContent.trim()) return alert("LP 내용을 입력해주세요.");
                                        if (tags.length === 0) return alert("태그를 최소 1개 입력해주세요."); // ← 추가

                                        // 1. FormData 객체 생성
                                        const formData = new FormData();

                                        // 2. 기본 필드 추가
                                        formData.append("title", lpName);
                                        formData.append("content", lpContent);
                                        formData.append("published", "true"); // FormData는 문자열로 저장됩니다.

                                        // 3. 파일이 존재할 때만 추가
                                        if (thumbnailFile) {
                                            formData.append("thumbnail", thumbnailFile);
                                        }

                                        // 4. 배열(tags) 처리 (서버가 원하는 관습에 따라 다름)
                                        // 보통 아래처럼 하나씩 append하거나 JSON.stringify()로 묶어 보냅니다.
                                        tags.forEach((tag) => {
                                            formData.append("tags", tag);
                                        });

                                        // 5. mutate에 formData 그대로 전달
                                        createLp(
                                            {
                                                title: lpName,
                                                content: lpContent,
                                                published: true,
                                                thumbnailFile,   // File 객체 그대로 전달
                                                tags,
                                            },
                                            {
                                                onSuccess: () => {
                                                    setModal(false);
                                                    setLpName("");
                                                    setLpContent("");
                                                    setThumbnail(null);
                                                    setThumbnailFile(null);
                                                    setTags([]);
                                                },
                                                onError: (error: any) => {
                                                    console.error("상세 오류:", error.response?.data);
                                                    alert("LP 생성 실패: " + JSON.stringify(error.response?.data));
                                                }
                                            }
                                        );
                                    }}

                                    className="mt-8 w-80 h-12 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                    Add Lp
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            )
            }
            {profModal && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
                        <div className="w-100 h-140 z-10 bg-pink-100 rounded-lg flex flex-col justify-center items-center">
                            <div className="text-black cursor-pointer ml-60"
                                onClick={() => {
                                    setProfModal(false);
                                }}>X</div>
                            <label className="cursor-pointer z-10">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden bg-40"
                                    onChange={handleProfileImgChange}
                                />
                                <img
                                    src={thumbnail ?? profile}
                                    className="w-40 h-40 rounded-full object-cover hover:opacity-80 transition-opacity"
                                />
                            </label>
                            <div className="flex flex-col mt-6 ml-4">
                                <div className="flex flex-row">
                                    <input type="text" value={editName}
                                        onChange={(e) => {
                                            setEditName(e.target.value)
                                        }}
                                        placeholder="이름"
                                        className="rounded-lg border-1 border-black text-black w-50 h-10 mb-2 pl-2 flex items-center" />
                                </div>
                                <input type="text" value={editBio}
                                    onChange={(e) => {
                                        setEditBio(e.target.value)
                                    }}
                                    placeholder="상세설명"
                                    className="rounded-lg border-1 border-black text-black w-62 h-8 mb-2 pl-2 flex items-center" />
                                <div
                                    className="w-50 h-10 flex items-center text-black" >
                                    {dataa?.data.email}</div>
                            </div>
                            <button onClick={async () => {
                                try {
                                    await patchMyInfo({
                                        name: editName,
                                        bio: editBio
                                    });
                                    setDataa((prev) =>
                                        prev ? {
                                            ...prev, data: {
                                                ...prev.data,
                                                name: editName,
                                                bio: editBio
                                            }
                                        }
                                            : prev);
                                    setProfModal(false);
                                } catch (e) {
                                    alert("저장 실패");
                                }
                            }} className="mt-6 w-50 h-10 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                            ></button>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
}
