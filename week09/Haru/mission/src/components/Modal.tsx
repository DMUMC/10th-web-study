import { useCartStore } from '../features/store/useCartStore';
import { useModalStore } from '../features/store/useModalStore';

export default function Modal() {
    const { closeModal } = useModalStore();
  const { clearCart } = useCartStore();

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl text-center border border-white/20">
        <h4 className="mb-4 text-gray-800 font-semibold">정말 삭제하시겠습니까?</h4>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { clearCart(); closeModal(); }}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            네
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200/80 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}