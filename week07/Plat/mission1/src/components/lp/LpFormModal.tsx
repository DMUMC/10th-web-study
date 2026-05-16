import { useEffect, useState, type ChangeEvent } from "react";

export type LpFormValues = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

type LpFormModalProps = {
  isOpen: boolean;
  title: string;
  submitLabel: string;
  initialValues?: Partial<LpFormValues>;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: LpFormValues) => void | Promise<void>;
};

const defaultValues: LpFormValues = {
  title: "",
  content: "",
  thumbnail: "",
  tags: [],
  published: true,
};

const getInitialValues = (
  initialValues?: Partial<LpFormValues>
): LpFormValues => ({
  ...defaultValues,
  ...initialValues,
  tags: initialValues?.tags ?? [],
});

export default function LpFormModal({
  isOpen,
  title,
  submitLabel,
  initialValues,
  isSubmitting = false,
  onClose,
  onSubmit,
}: LpFormModalProps) {
  const [values, setValues] = useState<LpFormValues>(() =>
    getInitialValues(initialValues)
  );
  const [tagInput, setTagInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const nextTag = tagInput.trim();

    if (!nextTag || values.tags.includes(nextTag)) {
      setTagInput("");
      return;
    }

    setValues((prev) => ({
      ...prev,
      tags: [...prev.tags, nextTag],
    }));
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("이미지 파일만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const thumbnail = reader.result;

      if (typeof thumbnail !== "string") return;

      setValues((prev) => ({
        ...prev,
        thumbnail,
      }));
      setFileName(file.name);
      setFileError("");
    };

    reader.onerror = () => {
      setFileError("이미지를 읽지 못했습니다.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    await onSubmit({
      ...values,
      title: values.title.trim(),
      content: values.content.trim(),
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
      published: true,
    });
  };

  const isInvalid =
    isSubmitting ||
    values.title.trim().length === 0 ||
    values.content.trim().length === 0 ||
    values.thumbnail.trim().length === 0;

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
    >
      <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-gray-950 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-2xl text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="lp-title"
              className="text-sm font-semibold text-gray-200"
            >
              제목
            </label>
            <input
              id="lp-title"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="LP 제목을 입력해주세요."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="lp-content"
              className="text-sm font-semibold text-gray-200"
            >
              내용
            </label>
            <textarea
              id="lp-content"
              value={values.content}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  content: event.target.value,
                }))
              }
              placeholder="LP 내용을 입력해주세요."
              className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="lp-thumbnail"
              className="text-sm font-semibold text-gray-200"
            >
              LP 사진
            </label>
            <input
              id="lp-thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-600"
            />

            {fileName && (
              <p className="mt-2 text-xs text-gray-400">{fileName}</p>
            )}

            {fileError && (
              <p className="mt-2 text-xs text-red-400">{fileError}</p>
            )}

            {values.thumbnail && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img
                  src={values.thumbnail}
                  alt="LP 미리보기"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="lp-tag"
              className="text-sm font-semibold text-gray-200"
            >
              태그
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="lp-tag"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="태그를 입력해주세요."
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="shrink-0 rounded-2xl bg-purple-500 px-5 py-3 text-sm font-semibold transition-colors hover:bg-purple-600"
              >
                추가
              </button>
            </div>

            {values.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {values.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-gray-100"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      aria-label={`${tag} 태그 삭제`}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10"
          >
            취소
          </button>
          <button
            type="button"
            disabled={isInvalid}
            onClick={handleSubmit}
            className="rounded-2xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
          >
            {isSubmitting ? "저장 중..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
