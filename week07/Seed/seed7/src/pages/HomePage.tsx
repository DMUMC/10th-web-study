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
import useCreateLp from "../hooks/mutations/useCreateLp";
import useDebounce from "../hooks/useDebounce";

export default function MainPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState(false);

  // 바닥 감지 ref (react-intersection-observer)
  const { ref: bottomRef, inView } = useInView({ threshold: 0 });
  const debouncedQuery = useDebounce(searchInput, 300);
  const {
    data,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteLpList({
    order,
    search: debouncedQuery,
    limit: 12,
  });
  // 바닥이 보이면 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // pages를 flat하게 펼쳐 단일 배열로
  const lpItems =
    data?.pages.flatMap((page) => page.data.data ?? []) ?? [];

  const handleSearch = () => {
    setSearch(searchInput);
  };
  // 상단 useState에 추가
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
      setThumbnailFile(file);                        // ← File 저장
      setThumbnail(URL.createObjectURL(file));       // ← 미리보기
    }
  };

  return (
    <div className="min-h-screen bg-white-950 text-white">

      {/* ── 콘텐츠 ── */}
      {/* 검색 영역 */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="LP 제목 검색"
          className="border border-zinc-300 rounded-lg px-3 py-2 text-black w-full"
        />
      </div>

      <main className="px-6 py-8 max-w-6xl mx-auto">
        {isError && (
          <p className="text-red-400 text-center py-20">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}

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



                <button
                  onClick={() => {
                    if (!lpName.trim()) return alert("LP 이름을 입력해주세요.");
                    if (!lpContent.trim()) return alert("LP 내용을 입력해주세요.");
                    if (tags.length === 0) return alert("태그를 최소 1개 입력해주세요."); // ← 추가

                    const formData = new FormData();

                    formData.append("title", lpName);
                    formData.append("content", lpContent);
                    formData.append("published", "true");

                    if (thumbnailFile) {
                      formData.append("thumbnail", thumbnailFile);
                    }

                    tags.forEach((tag) => {
                      formData.append("tags", tag);
                    });

                    createLp(
                      {
                        title: lpName,
                        content: lpContent,
                        published: true,
                        thumbnailFile,
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
    </div >
  );
}
