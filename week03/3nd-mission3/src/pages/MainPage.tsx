import { Link } from "react-router-dom";

export default function MainPage() {
  const categories = [
    {
      title: "Popular",
      path: "/movies/popular",
      description: "지금 가장 많이 찾는 영화를 확인해보세요.",
    },
    {
      title: "Top Rated",
      path: "/movies/top_rated",
      description: "높은 평점을 받은 작품들을 모아봤어요.",
    },
    {
      title: "Upcoming",
      path: "/movies/upcoming",
      description: "곧 개봉할 기대작들을 미리 만나보세요.",
    },
    {
      title: "Now Playing",
      path: "/movies/now_playing",
      description: "현재 상영 중인 영화를 빠르게 찾아보세요.",
    },
  ];

  const featuredCategories = [
    {
        title: "Popular",
        description: "현재 사용자들이 가장 많이 찾는 영화 목록을 확인할 수 있습니다.",
    },
    {
        title: "Top Rated",
        description: "평점이 높은 영화들을 중심으로 작품을 탐색할 수 있습니다.",
    },
    {
        title: "Upcoming",
        description: "곧 공개될 영화들을 미리 확인하고 기대작을 찾아볼 수 있습니다.",
    },
    {
        title: "Now Playing",
        description: "현재 상영 중인 영화를 빠르게 확인할 수 있습니다.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
              Movie Explorer
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              원하는 영화를
              <span className="text-red-400"> 더 빠르고 직관적으로 </span>
              탐색해보세요
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
              인기 영화, 평점 높은 영화, 개봉 예정작, 현재 상영작까지
              카테고리별로 정리된 페이지를 통해 원하는 영화를 쉽게 찾을 수 있습니다.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/movies/popular"
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-500"
              >
                인기 영화 보기
              </Link>

              <Link
                to="/movies/top_rated"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                평점 높은 영화 보기
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
                {featuredCategories.map((category) => (
                    <div
                    key={category.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    >
                    <p className="text-sm text-gray-400">Category</p>
                    <h3 className="mt-2 text-2xl font-bold">{category.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-300">
                        {category.description}
                    </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse Categories</h2>
          <p className="mt-2 text-gray-400">
            원하는 카테고리를 선택해서 영화 목록 페이지로 바로 이동할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-lg font-bold text-red-400">
                {category.title.charAt(0)}
              </div>

              <h3 className="text-xl font-semibold transition group-hover:text-red-400">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {category.description}
              </p>

              <div className="mt-6 text-sm font-medium text-red-400">
                이동하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-red-400">Why Use This Page</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                영화 탐색을 더 단순하고 빠르게
              </h2>
            </div>

            <div className="rounded-2xl bg-black/30 p-6">
              <h3 className="text-lg font-semibold">빠른 카테고리 이동</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                홈 화면에서 바로 원하는 카테고리로 이동할 수 있어 탐색 흐름이 자연스럽습니다.
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 p-6">
              <h3 className="text-lg font-semibold">직관적인 구성</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                복잡한 설명 없이 주요 영화 분류를 한눈에 확인할 수 있도록 구성했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}