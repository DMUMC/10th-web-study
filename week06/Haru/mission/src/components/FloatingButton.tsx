import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
   
    navigate("/create"); 
  };

  return (
    <button
      onClick={handleNavigate}
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#FF007A] text-white rounded-full shadow-lg shadow-[#FF007A]/40 flex items-center justify-center text-3xl font-bold hover:scale-110 transition-transform active:scale-95 z-[100] cursor-pointer"
      aria-label="add button"
    >
      +
    </button>
  );
};

export default FloatingButton;