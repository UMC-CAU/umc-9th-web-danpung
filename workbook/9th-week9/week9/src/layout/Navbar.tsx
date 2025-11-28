import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
const Navbar = () => {
  const amount = useSelector((state: any) => state.cart.amount);
  return (
    <>
      <div className="flex flex-row h-16 bg-blue-900 items-center text-white fixed top-0 left-0 w-full z-10">
        <h1 className="flex-1 pl-50">쇼핑 카트</h1>
        <div className="flex flex-row gap-4">
          <ShoppingCart size={24} />
          <span className="mr-50">{amount}개</span>
        </div>
      </div>
      <div className="h-16" aria-hidden />
    </>
  );
};

export default Navbar;
