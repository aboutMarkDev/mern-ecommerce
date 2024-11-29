import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type QuantityInputProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const QuantityInput = ({ quantity, setQuantity }: QuantityInputProps) => {
  return (
    <>
      {/* If the quantity is greater than 1 it can perform decrement, otherwise do nothing. */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-full"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
      >
        <Minus width={18} height={18} />
      </Button>
      <Input
        type="number"
        min={1}
        max={99}
        value={quantity}
        className="text-center input-quantity w-[3rem]"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      {/* If the quantity is lower than 99 it can perform increment, otherwise do nothing. */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-full"
        onClick={() => {
          if (quantity < 99) {
            setQuantity(quantity + 1);
          }
        }}
      >
        <Plus width={18} height={18} />
      </Button>
    </>
  );
};

export default QuantityInput;
