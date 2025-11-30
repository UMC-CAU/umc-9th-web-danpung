import { Minus, Plus } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { increase, decrease } from "../features/cartSlice";
import { useCartStore } from "../hooks/useCartStore";

const CountButton = ({ id }: { id: string }) => {
  // const dispatch = useDispatch();
  // const count = useSelector((state: any) => {
  //   const item = state.cart.items.find((item: any) => item.id === id);
  //   return item ? item.amount : 0;
  // });
  const count = useCartStore((state) => {
    const item = state.cartItems.find((i) => i.id === id);
    return item ? item.amount : 0;
  });
  const { increase, decrease } = useCartStore();
  return (
    <div>
      <div className="flex flex-row">
        <button
          onClick={() => decrease(id)}
          className="flex size-7 bg-blue-300 items-center justify-center rounded-sm"
        >
          <Minus size={12} />
        </button>
        <span className="flex size-7 border border-blue-300 rounded-sm mx-3 text-sm font-bold items-center justify-center">
          {count}
        </span>
        <button
          onClick={() => increase(id)}
          className="flex size-7 bg-blue-300 items-center justify-center rounded-sm"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

export default CountButton;
