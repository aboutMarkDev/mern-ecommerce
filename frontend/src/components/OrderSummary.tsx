import { useEffect, useState } from "react";
import { useProductsContext } from "../context/Products";
import { formatPrice } from "../utils";
import { useUserContext } from "../context/User";
import { usePlaceOrder } from "../lib/react-query/queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const paymentMethod = ["Stripe", "Paypal", "PayLater", "COD"];

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <section className="flex-between">
      <h3 className="font-medium">{label}</h3>
      <h3>{value}</h3>
    </section>
  );
};

const OrderSummary = ({ address }: { address: string }) => {
  const { cart, setCart } = useProductsContext();
  const { user, checkUserAuth } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: placeOrder, isPending: isPlacingOrder } =
    usePlaceOrder();

  const [subTotal, setSubTotal] = useState<string | "">("");
  const [shipFee, setShipFee] = useState<string | "">("");
  const [totalBeforeTax, setTotalBeforeTax] = useState<string | "">("");
  const [estimatedTax, setEstimatedTax] = useState<string | "">("");
  const [total, setTotal] = useState<string | "">("");

  // Utils
  // Calculates subtotal
  const getSubtotal = () => {
    let subtotal = 0;
    cart.map((product) => {
      subtotal += parseInt(product.price) * product.quantity;
    });
    setSubTotal(String(subtotal));
    return subtotal;
  };

  // Calculates total shipping fee
  const getShippingFee = () => {
    let totalShipping = 0;
    cart.map((product) => {
      totalShipping += product.deliveryOption.fee;
    });
    setShipFee(String(totalShipping));
    return totalShipping;
  };

  // Calculate total before tax
  const getTotalBeforeTax = () => {
    let totalBeforeTax = 0;
    totalBeforeTax += getSubtotal() + getShippingFee();
    setTotalBeforeTax(String(totalBeforeTax));
    return totalBeforeTax;
  };

  // Calculates Tax
  const getEstimatedTax = () => {
    let estimatedTax = 0;
    estimatedTax += getTotalBeforeTax() * 0.1;
    setEstimatedTax(String(estimatedTax));
    return estimatedTax;
  };

  // Calculates total
  const getTotalFee = () => {
    let total = 0;
    total += getTotalBeforeTax() + getEstimatedTax();
    setTotal(String(total));
  };

  useEffect(() => {
    getSubtotal();
    getShippingFee();
    getTotalBeforeTax();
    getEstimatedTax();
    getTotalFee();
  }, [cart]);

  // Place order here...
  const handlePlaceOrder = async () => {
    try {
      const isUserLoggedIn = await checkUserAuth();

      const orderDetails = {
        userId: user.id,
        total,
        address,
        cart: cart.map((item) => {
          return {
            id: item.productId,
            name: item.name,
            imageUrl: item.imageUrl,
            price: item.price,
            size: item.size,
            quantity: item.quantity,
            deliveryOption: {
              date: item.deliveryOption.date,
              fee: item.deliveryOption.fee,
            },
          };
        }),
      };

      if (isUserLoggedIn) {
        await placeOrder(orderDetails);

        setCart([]);
        navigate("/confirmation");
      } else {
        toast.error("User must log in first.");
      }
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "An unknown error occurred";

      // Use the errorMessage in toast
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-[400px] max-lg:mx-auto border rounded-lg shadow-sm p-5 space-y-3">
      <h1 className="font-semibold">Order Summary</h1>

      <section className="space-y-1">
        <Row label={`Items (${cart.length}):`} value={formatPrice(subTotal)} />
        <Row label="Shipping Fee:" value={formatPrice(shipFee)} />
        <Row label="Total before tax:" value={formatPrice(totalBeforeTax)} />
        <Row label="Estimated tax (10%):" value={formatPrice(estimatedTax)} />
      </section>
      <hr />
      <Row label="Total fee:" value={formatPrice(total)} />

      <section className="flex flex-col gap-3">
        <h3>Payment Method:</h3>
        {/* Stripe/Paypal Integration here... */}
        <div className="w-full flex gap-3">
          {paymentMethod.map((item) => (
            <div
              key={item}
              className="w-full max-w-[300px] h-[40px] border rounded-md flex-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex-center">
        <Button
          className="space-x-1 w-full"
          size="lg"
          type="button"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Loading...</p>
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </section>
    </div>
  );
};

export default OrderSummary;
