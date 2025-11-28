import { useDispatch } from "react-redux";
import { closeModal } from "../features/modalSlice";
import { clearCart } from "../features/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex justify-center items-center"
        onClick={() => dispatch(closeModal())}
      >
        <div className="absolute inset-0 bg-gray-300/40 backdrop-blur-sm"></div>
        <section
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white h-70 w-100 rounded-lg flex flex-col justify-center items-center gap-10"
        >
          <h1 className="text-xl font-bold">정말 삭제하시겠습니까?</h1>
          <div className="flex flex-row gap-10">
            <button
              onClick={() => {
                dispatch(clearCart());
                dispatch(closeModal());
              }}
              className="w-15 h-10 bg-red-500 rounded-xl font-bold text-lg text-white"
            >
              네
            </button>
            <button
              onClick={() => dispatch(closeModal())}
              className="w-15 h-10 bg-gray-300 rounded-xl font-bold text-lg text-black"
            >
              아니요
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Modal;
