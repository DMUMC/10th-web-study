import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

function Modal() {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 text-center w-80">
        <h4 className="mb-6 text-lg font-semibold text-gray-800">정말 삭제하시겠습니까?</h4>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }} 
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            네
          </button>
          <button 
            onClick={() => dispatch(closeModal())} 
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;