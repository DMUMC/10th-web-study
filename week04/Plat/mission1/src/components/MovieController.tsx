type Props = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MovieController({ page, setPage, setError, setLoading } : Props) {
    return (
        <div className="flex items-center justify-center gap-6 mt-5">
            <button 
                className="bg-blue-400 text-white px-4 py-3 rounded-lg shadow-md
                hover:bg-red-400 transition-all duration-300 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed"
                disabled={page === 1} 
                onClick={() : void => setPage((prev) : number => prev - 1)}>{`<`} 
            </button>
            <span className="text-lg font-semibold">{page} 페이지</span>
            <button 
                className="bg-blue-400 text-white px-4 py-3 rounded-lg shadow-md
                hover:bg-red-400 transition-all duration-300 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed"
                onClick={() : void => setPage((prev) : number => prev + 1)}> {`>`}</button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors" onClick={() => setError(true)}>
                오류창 전환
            </button>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition-colors" onClick={() => setLoading(true)}>
                로딩 상태로 전환
            </button>
        </div>
    );
};