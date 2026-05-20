type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 shadow-2xl">
        <p className="animate-pulse text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "데이터를 불러오지 못했습니다.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center text-white">
      <div className="w-full max-w-md rounded-3xl border border-red-400/30 bg-red-500/10 p-8 text-center shadow-2xl">
        <h2 className="text-xl font-bold text-red-300">오류 발생</h2>
        <p className="mt-3 text-sm text-gray-300">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-2xl bg-red-500 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-600"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}