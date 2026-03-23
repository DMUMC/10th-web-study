import { useTheme } from "../context/ThemeContext";

function ThemeBox() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white">
      <div className="w-[420px] rounded-2xl p-8 shadow-xl bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {darkMode ? "다크 모드" : "라이트 모드"}
        </h1>

        <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
          useContext를 활용한 전역 테마 관리 예제입니다.
        </p>

        <div className="flex justify-center">
          <button
            onClick={toggleTheme}
            className="px-5 py-3 rounded-xl font-semibold bg-black text-white hover:opacity-80 dark:bg-yellow-400 dark:text-black"
          >
            {darkMode ? "라이트 모드로 변경" : "다크 모드로 변경"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemeBox;