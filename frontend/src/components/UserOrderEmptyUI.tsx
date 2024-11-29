import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UserOrderEmptyUI = ({
  message = "Your list is currently empty.",
}: {
  message?: string;
}) => {
  return (
    <div className="flex-center flex-col py-3">
      <div className="w-[10rem] h-[10rem]">
        <img
          src="/assets/empty-cart.gif"
          alt="no order"
          className="w-full h-full"
        />
      </div>
      <div className="flex-center flex-col gap-3">
        <div className="space-y-1 text-center">
          <h3 className="font-semibold">{message}</h3>
          <h5 className="text-sm text-gray-500">
            Start exploring our collections and great deals for you.
          </h5>
        </div>

        <Link to="/products">
          <Button size="sm" type="button">
            Browse Collections
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserOrderEmptyUI;
