import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

// ─── Type Definitions ──────────────────────────────────────────────────────────

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

interface MovieDetails {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: Genre[];
    tagline: string;
    status: string;
    original_language: string;
    production_companies: ProductionCompany[];
    budget: number;
    revenue: number;
}

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatRuntime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
};

const formatNumber = (n: number): string =>
    n > 0 ? `$${n.toLocaleString()}` : "정보 없음";

const getRatingColor = (rating: number): string => {
    if (rating >= 8) return "#22c55e";
    if (rating >= 6) return "#eab308";
    return "#ef4444";
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function RatingRing({ score }: { score: number }) {
    const pct = score / 10;
    const r = 26;
    const circ = 2 * Math.PI * r;
    const color = getRatingColor(score);
    return (
        <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
            <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="36" cy="36" r={r} fill="none" stroke="#ffffff18" strokeWidth="5" />
                <circle
                    cx="36" cy="36" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeDasharray={`${circ * pct} ${circ}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                />
            </svg>
            <span className="absolute text-base font-bold" style={{ color }}>
                {score.toFixed(1)}
            </span>
        </div>
    );
}

function StatBadge({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-200">{value}</span>
        </div>
    );
}

function CastCard({ member }: { member: CastMember }) {
    return (
        <div className="flex flex-col items-center gap-2 w-28 shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 ring-2 ring-white/10">
                {member.profile_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-600">
                        👤
                    </div>
                )}
            </div>
            <div className="text-center">
                <p className="text-xs font-semibold text-gray-200 leading-tight">{member.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight line-clamp-2">{member.character}</p>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MovieDetailPage() {
    const { movieId, category } = useParams<{ movieId: string; category: string }>();
    const navigate = useNavigate();

    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    const HEADERS = { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` };

    useEffect(() => {
        if (!movieId) return;
        setIsPending(true);
        setIsError(false);

        const fetchAll = async () => {
            try {
                const [detailRes, creditRes] = await Promise.all([
                    axios.get<MovieDetails>(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
                        { headers: HEADERS }
                    ),
                    axios.get<Credits>(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
                        { headers: HEADERS }
                    ),
                ]);
                setDetails(detailRes.data);
                setCredits(creditRes.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchAll();
    }, [movieId]);

    // ── Loading ──
    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <LoadingSpinner />
                    <p className="text-gray-500 text-sm tracking-widest uppercase">불러오는 중...</p>
                </div>
            </div>
        );
    }

    // ── Error ──
    if (isError || !details) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950 text-white">
                <div className="text-6xl">🎬</div>
                <h2 className="text-2xl font-bold text-red-400">영화 정보를 불러올 수 없습니다</h2>
                <p className="text-gray-500">일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
                <button
                    onClick={() => navigate(`/movies/${category}`)}
                    className="mt-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-500"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const director = credits?.crew.find((c) => c.job === "Director");
    const topCast = credits?.cast.slice(0, 12) ?? [];
    const backdropUrl = details.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
        : null;

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* ── Hero backdrop ── */}
            <div className="relative h-[55vh] w-full overflow-hidden">
                {backdropUrl && (
                    <img
                        src={backdropUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-transparent to-transparent" />

                {/* back button */}
                <button
                    onClick={() => navigate(`/movies/${category}`)}
                    className="absolute top-5 left-5 flex items-center gap-2 rounded-full 
                        bg-black/50 backdrop-blur px-4 py-2 text-sm font-medium
                        border border-white/10 hover:bg-white/10 transition z-10"
                >
                    ← 목록으로
                </button>
            </div>

            {/* ── Content area ── */}
            <div className="relative mx-auto max-w-6xl px-6 lg:px-8 -mt-56 pb-20">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Poster */}
                    <div className="shrink-0">
                        <div className="w-44 md:w-56 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <img
                                src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
                                alt={`${details.title} 포스터`}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-2 md:pt-32">
                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {details.genres.map((g) => (
                                <span
                                    key={g.id}
                                    className="rounded-full border border-red-500/30 bg-red-500/10 
                                        px-3 py-0.5 text-xs font-medium text-red-400"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{details.title}</h1>
                        {details.original_title !== details.title && (
                            <p className="mt-1 text-gray-500 text-sm">{details.original_title}</p>
                        )}
                        {details.tagline && (
                            <p className="mt-2 text-gray-400 italic text-sm">"{details.tagline}"</p>
                        )}

                        {/* Rating + stats row */}
                        <div className="mt-5 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <RatingRing score={details.vote_average} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">관객 평점</p>
                                    <p className="text-xs text-gray-600">{details.vote_count.toLocaleString()}명 평가</p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden sm:block" />
                            <div className="flex gap-6 flex-wrap">
                                {details.runtime > 0 && (
                                    <StatBadge label="상영시간" value={formatRuntime(details.runtime)} />
                                )}
                                <StatBadge label="개봉일" value={details.release_date} />
                                {director && <StatBadge label="감독" value={director.name} />}
                                <StatBadge label="언어" value={details.original_language.toUpperCase()} />
                            </div>
                        </div>

                        {/* Overview */}
                        {details.overview && (
                            <div className="mt-6">
                                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-2">줄거리</h2>
                                <p className="text-gray-300 text-sm leading-7 max-w-2xl">{details.overview}</p>
                            </div>
                        )}

                        {/* Budget / Revenue */}
                        {(details.budget > 0 || details.revenue > 0) && (
                            <div className="mt-6 flex gap-6">
                                <StatBadge label="제작비" value={formatNumber(details.budget)} />
                                <StatBadge label="수익" value={formatNumber(details.revenue)} />
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Cast Section ── */}
                {topCast.length > 0 && (
                    <div className="mt-14">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-bold">출연진</h2>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
                            {topCast.map((member) => (
                                <CastCard key={`${member.id}-${member.order}`} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Crew Highlights ── */}
                {credits && credits.crew.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-bold">제작진</h2>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {credits.crew
                                .filter((c) =>
                                    ["Director", "Producer", "Screenplay", "Original Music Composer", "Director of Photography"].includes(c.job)
                                )
                                .slice(0, 8)
                                .map((member, i) => (
                                    <div
                                        key={`${member.id}-${i}`}
                                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                                    >
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{member.job}</p>
                                        <p className="text-sm font-semibold text-gray-200">{member.name}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* ── Production Companies ── */}
                {details.production_companies.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-sm uppercase tracking-widest text-gray-500">제작사</h2>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {details.production_companies.map((company) => (
                                <span
                                    key={company.id}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-400"
                                >
                                    {company.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}