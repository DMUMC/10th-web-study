interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#FF007A] rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:scale-110 active:scale-95 transition-transform z-50"
    >
      +
    </button>
  );
};

export default FloatingButton;