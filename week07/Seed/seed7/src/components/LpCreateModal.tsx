import { useState, useRef } from "react";
import { usePostLp } from "../hooks/diverse/usePostLp";

interface LpCreateModalProps {
  onClose: () => void;
}

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: postLp, isPending } = usePostLp(onClose);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!lpName.trim() || !lpContent.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    postLp({
      title: lpName,
      content: lpContent,
      thumbnail: imagePreview || "https://picsum.photos/400",
      tags: tags,
      published: true
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-2xl p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

        <h2 className="text-xl font-bold mb-6 text-center text-[#FF007A]">새 LP 등록</h2>

        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-48 h-48 mx-auto bg-[#2a2a2a] rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#FF007A] transition-colors"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-sm">LP 커버 사진 선택</span>
            )}
          </div>
          <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />

          <input
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF007A] text-white"
            placeholder="LP Name"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
          />

          <textarea
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF007A] h-24 resize-none text-white"
            placeholder="LP Content"
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
          />

          <div className="flex gap-2">
            <input
              className="flex-1 bg-[#2a2a2a] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF007A] text-white"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-[#FF007A] px-4 rounded-xl font-bold hover:bg-[#ff1a87] text-white"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-[#333] text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600">
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-[#FF007A] ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full bg-[#FF007A] py-4 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-gray-700"
          >
            {isPending ? "등록 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpCreateModal;