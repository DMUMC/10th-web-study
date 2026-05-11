import { useState } from "react";

export default function CommentInputBox() {
  const [comment, setComment] = useState("");

  const isInvalid = comment.trim().length === 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <label htmlFor="comment" className="text-sm font-semibold text-gray-200">
        댓글 작성
      </label>

      <textarea
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="댓글을 입력해주세요."
        maxLength={300}
        className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
      />

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          댓글은 1자 이상 300자 이하로 입력해주세요.
        </p>

        <span className="text-xs text-gray-500">{comment.length}/300</span>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          disabled={isInvalid}
          className="rounded-2xl bg-purple-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
}