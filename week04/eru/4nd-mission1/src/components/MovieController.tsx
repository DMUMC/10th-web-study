export default function MovieController({ page, setPage } : { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
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
        </div>
    );
};