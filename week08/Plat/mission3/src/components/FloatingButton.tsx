type FloatingButtonProps = {
  onClick: () => void;
};

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="LP 작성 모달 열기"
      className="
        fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full
        bg-purple-500 text-3xl font-light text-white shadow-2xl shadow-purple-500/30
        transition-transform hover:scale-110 hover:bg-purple-600
      "
    >
      +
    </button>
  );
}
