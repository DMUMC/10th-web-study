import { Link } from "react-router-dom";

type FloatingButtonProps = {
  to?: string;
};

export default function FloatingButton({ to = "/lp/create" }: FloatingButtonProps) {
  return (
    <Link
      to={to}
      aria-label="LP 생성 페이지로 이동"
      className="
        fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full
        bg-purple-500 text-3xl font-light text-white shadow-2xl shadow-purple-500/30
        transition-transform hover:scale-110 hover:bg-purple-600
      "
    >
      +
    </Link>
  );
}