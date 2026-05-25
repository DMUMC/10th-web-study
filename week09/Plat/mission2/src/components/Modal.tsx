import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';
import type { AppDispatch } from '../store/store';

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
      <section
        aria-modal="true"
        aria-labelledby="delete-cart-title"
        role="dialog"
        className="w-full max-w-[212px] rounded-md bg-white px-5 py-6 text-center shadow-xl"
      >
        <h2 id="delete-cart-title" className="text-base font-extrabold text-black">
          정말 삭제하시겠습니까?
        </h2>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            네
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
