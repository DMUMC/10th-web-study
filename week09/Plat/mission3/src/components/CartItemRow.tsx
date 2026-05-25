import type { CartItem } from '../store/useCartStore';

type CartItemRowProps = {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) => (
  <article className="group grid grid-cols-[96px_1fr_auto] items-center gap-5 border-b border-slate-200 px-4 py-7 sm:grid-cols-[128px_1fr_180px] sm:gap-6 sm:px-8">
    <img
      src={item.img}
      alt={`${item.title} album cover`}
      className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
    />

    <div className="min-w-0">
      <h2 className="break-keep text-2xl font-extrabold leading-tight text-black sm:text-3xl">
        {item.title}
      </h2>
      <p className="mt-1 break-keep text-lg font-semibold leading-tight text-slate-500 sm:text-2xl">
        {item.singer}
      </p>
      <p className="mt-1 text-2xl font-extrabold leading-none text-slate-800 sm:text-3xl">
        ${item.price}
      </p>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="mt-3 text-sm font-semibold text-slate-500 opacity-0 underline-offset-4 transition-opacity hover:text-slate-800 hover:underline focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 group-hover:opacity-100"
      >
        삭제
      </button>
    </div>

    <div className="flex justify-end">
      <div className="grid h-12 grid-cols-3 overflow-hidden rounded-md border border-slate-300 bg-slate-200 text-xl font-semibold text-slate-800">
        <button
          type="button"
          aria-label={`${item.title} 수량 감소`}
          onClick={() => onDecrease(item.id)}
          className="h-12 w-12 bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 sm:w-14"
        >
          -
        </button>
        <span className="flex h-12 w-14 items-center justify-center bg-white text-xl sm:w-16">
          {item.amount}
        </span>
        <button
          type="button"
          aria-label={`${item.title} 수량 증가`}
          onClick={() => onIncrease(item.id)}
          className="h-12 w-12 bg-slate-300 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 sm:w-14"
        >
          +
        </button>
      </div>
    </div>
  </article>
);

export default CartItemRow;
