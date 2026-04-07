export default function ApiError() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md w-full p-6 rounded-2xl bg-gray-900 border border-red-500/30 shadow-xl text-center">
                
                <div className="text-red-400 text-3xl mb-3">⚠️</div>
                
                <h2 className="text-lg font-semibold text-white mb-2">
                오류가 발생했습니다
                </h2>
                
                <p className="text-sm text-gray-400 mb-4">
                영화 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                </p>

                <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors"
                >
                다시 시도
                </button>
            </div>
        </div>
    );
}