import "./App.css";
import bar from "./img/bar.png";
import useSidebar from "./hooks/useSidebar";

function App() {
  const {
    isOpen,
    open,
    close,
  } = useSidebar();

  return (
    <div className="relative overflow-hidden">
      <div
        className={`
          flex flex-row items-center gap-2
          transition-all duration-500 ease-in-out
          cursor-pointer p-4
          ${isOpen ? "ml-[210px]" : "ml-10"}
        `}
        onClick={open}
      >
        <img
          src={bar}
          className="bg-black w-8 h-8"
        />
        네비게이션 바
      </div>

      <div
        onClick={close}
        className={`
          fixed inset-0 bg-black/30
          transition-opacity duration-500
          ${isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"}
        `}
      />

      <div
        className={`
          fixed top-0 left-0
          w-52 h-screen
          bg-pink-300
          flex flex-col items-center
          pt-[30px]
          transition-transform duration-500 ease-in-out
          z-50
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >
        <div>사이드바를 열었습니다.</div>

        <button
          className="mt-auto mb-10"
          onClick={close}
        >
          사이드바 닫기
        </button>
      </div>

      <div className="p-10 space-y-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>
            긴 콘텐츠 테스트 {i}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;