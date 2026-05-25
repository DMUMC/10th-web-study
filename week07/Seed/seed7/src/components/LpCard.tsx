// LpCard.tsx
import { useNavigate } from "react-router-dom";
import { Lp } from "../types/lp";
// interface Lp {
//   id: number;
//   title: string;
//   thumbnail: string;
//   updatedAt: string;
//   likes?: unknown[];
// }

interface LpCardProps {
  lp: Lp;
}

export function LpCard({ lp }: LpCardProps) {
  const navigate = useNavigate();

  return (
    <div
      key={lp.id}
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="relative group w-full aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-black/80 via-black/30 to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          flex flex-col justify-end
          p-4
          text-white
        "
      >
        <h3 className="text-base font-bold leading-tight line-clamp-2">{lp.title}</h3>
        <p className="text-xs mt-1 text-gray-300">
          {new Date(lp.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-xs mt-0.5">❤️ {lp.likes?.length ?? 0}</p>
      </div>
    </div>
  );
}

// LpCardSkeleton: same size, pulse shimmer animation
export function LpCardSkeleton() {
  return (
    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 animate-pulse relative">
      {/* shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.4s_infinite]" />
      {/* bottom bar placeholder */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse" />
        <div className="h-2 bg-gray-300 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

// LpCardSkeletonList: renders `count` skeleton cards
interface LpCardSkeletonListProps {
  count?: number;
}

export function LpCardSkeletonList({ count = 10 }: LpCardSkeletonListProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <LpCardSkeleton key={i} />
      ))}
    </>
  );
}
