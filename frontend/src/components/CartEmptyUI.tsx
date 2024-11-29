import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CartEmptyUI = () => {
  return (
    <section className="flex-center flex-col gap-2 h-[500px] w-full">
      <div className="w-full max-w-[200px]">
        <img
          src="/assets/empty-cart.gif"
          alt="empty-cart"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold -mt-2">Cart is currently empty.</h1>
      <Button variant="link">
        <Link to="/products" className="text-gray-500">
          Browse the collection to add products to your cart.
        </Link>
      </Button>
    </section>
  );
};

export default CartEmptyUI;
