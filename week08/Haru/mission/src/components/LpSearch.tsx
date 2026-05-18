import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function LpSearch({ onSearchChange }: { onSearchChange: (val: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 300);

  React.useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        placeholder="원하는 LP 제목을 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-gray-900 text-white placeholder-gray-500 text-sm pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-[#FF007A] transition-colors"
      />
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.603z" />
        </svg>
      </div>
    </div>
  );
}