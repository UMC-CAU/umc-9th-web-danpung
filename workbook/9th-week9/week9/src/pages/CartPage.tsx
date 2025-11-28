import RouteLayout from "../layout/RouteLayout";
import CountButton from "../components/CountButton";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modalSlice";
import Modal from "../components/Modal";
const CartPage = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const total = useSelector((state: any) => state.cart.total);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.modal.isOpen);

  return (
    <div>
      <RouteLayout />
      <main className="flex flex-col items-center mt-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-row gap-4 mb-10 items-center "
          >
            <img src={item.img} className="size-20 rounded-full object-fit" />
            <div className="flex flex-col items-center bg-gray-100 rounded-xl p-3 gap-y-1">
              <h2 className="font-bold">{item.title}</h2>
              <span>{item.singer}</span>
            </div>

            <div className="flex flex-col items-center bg-gray-100 rounded-xl p-3 gap-y-1">
              <p className="font-bold">{item.price * item.amount}원</p>
              <span>1개 : {item.price}원</span>
            </div>
            <div className="flex w-24 justify-center items-center">
              <CountButton id={item.id} />
            </div>
          </div>
        ))}
      </main>
      <footer className="bottom-6 left-0 w-full flex justify-center items-center">
        <div className=" flex flex-col items-center gap-2">
          <button
            onClick={() => {
              dispatch(openModal());
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-full cursor-pointer shadow-lg"
          >
            전체 삭제
          </button>
          <h1 className="text-2xl font-bold">총 합계: {total}원</h1>
        </div>
      </footer>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default CartPage;
