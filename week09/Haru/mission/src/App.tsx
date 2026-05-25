import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {type RootState } from './store';
import { 
  increase, 
  decrease, 
  removeItem, 
  clearCart, 
  calculateTotals 
} from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((store: RootState) => store.cart);

 
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">장바구니</h1>
      
    
      <div className="max-w-2xl mx-auto space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
            <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h2 className="font-bold">{item.title}</h2>
              <p className="text-gray-600">{item.singer}</p>
              <p className="text-blue-600 font-semibold">${item.price}</p>
              
              
              <div className="mt-2 flex gap-2">
                <button onClick={() => dispatch(increase(item.id))} className="px-2 bg-gray-200">+</button>
                <span>{item.amount}</span>
                <button onClick={() => dispatch(decrease(item.id))} className="px-2 bg-gray-200">-</button>
                <button onClick={() => dispatch(removeItem(item.id))} className="text-red-500 text-sm ml-4">삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>

   
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow rounded text-center">
        <h2 className="text-xl">총 수량: {amount}</h2>
        <h2 className="text-xl font-bold">총 금액: ${total}</h2>
        <button 
          onClick={() => dispatch(clearCart())} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          장바구니 비우기
        </button>
      </div>
    </div>
  );
}

export default App;