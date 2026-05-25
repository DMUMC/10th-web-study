import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItemRow from './components/CartItemRow';
import Header from './components/Header';
import {
  calculateTotals,
  clearCart,
  decrease,
  increase,
  removeItem,
} from './store/cartSlice';
import type { AppDispatch, RootState } from './store/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, amount, total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header amount={amount} />

      <main className="mx-auto w-full max-w-[1180px]">
        {cartItems.length === 0 ? (
          <section className="flex min-h-[420px] items-center justify-center px-6 text-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">장바구니가 비어 있습니다.</h2>
              <p className="mt-3 text-lg font-semibold text-slate-500">
                전체 수량과 총 금액이 0으로 초기화되었습니다.
              </p>
            </div>
          </section>
        ) : (
          <section aria-label="음반 장바구니 목록" className="pt-6">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={(id) => dispatch(increase(id))}
                onDecrease={(id) => dispatch(decrease(id))}
                onRemove={(id) => dispatch(removeItem(id))}
              />
            ))}
          </section>
        )}

        <footer className="px-4 py-10 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 border-t border-slate-200 pt-10">
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="rounded-md border border-black bg-white px-8 py-5 text-lg font-semibold text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              전체 삭제
            </button>

            <div className="grid w-full grid-cols-1 gap-3 text-xl font-extrabold text-slate-900 sm:grid-cols-2">
              <div className="flex items-center justify-between border-b border-slate-200 py-3">
                <span>총 수량</span>
                <span>{amount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 py-3">
                <span>총 금액</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
