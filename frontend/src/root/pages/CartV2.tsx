import { useEffect, useState } from "react";
import CartEmptyUI from "../../components/CartEmptyUI";
import { useProductsContext } from "../../context/Products";
import { formatPrice } from "../../utils";
import { CartType, CDeliveryOptionType } from "../../types/index.types";
import QuantityInput from "../../components/QuantityInput";
import OrderSummary from "../../components/OrderSummary";
import { deliveryOptions } from "../../constants";
import { useUserContext } from "@/context/User";
import AddNewAddress from "@/components/AddNewAddress";
import SelectAddress from "@/components/SelectAddress";
import ShippingInfo from "@/components/ShippingInfo";

const CartV2 = () => {
  const { cart, setCart } = useProductsContext();

  const { user, checkUserAuth } = useUserContext();

  // For Cart Items
  const [editingProductId, setEditingProductId] = useState<string>("");
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);

  // For Shipping Address
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [isAddressEditing, setIsAddressEditing] = useState<boolean>(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const loggedIn = await checkUserAuth();

      if (loggedIn) {
        setIsLoggedIn(true);
      }
    };

    isUserLoggedIn();

    setCurrentAddress(user?.shippingAddress[0] || "");
  }, []);

  // For Editing the quantity of specific item in the cart.
  const handleUpdateBtn = (item: CartType) => {
    setEditingProductId(item.cartProductId);
    setUpdatedQuantity(item.quantity);
  };

  // For Saving new quantity for specific item in the cart.
  const handleSaveBtn = (itemId: string) => {
    setCart(
      cart.map((item) =>
        item.cartProductId === itemId
          ? {
              ...item,
              quantity: updatedQuantity,
            }
          : item
      )
    );
    setEditingProductId("");
  };

  // For Deleting Item in the Cart
  const handleDeleteBtn = (itemId: string) => {
    setCart(cart.filter((item) => item.cartProductId !== itemId));
  };

  // For Changing Delivery Dates
  const handleChangeDeliveryOption = (
    itemId: string,
    option: CDeliveryOptionType
  ) => {
    setCart(
      cart.map((item) =>
        item.cartProductId === itemId
          ? { ...item, deliveryOption: option }
          : item
      )
    );
  };

  // If cart has a value render the Cart, otherwise render the EmptyCartUI component.
  return cart.length > 0 ? (
    <main className="w-full flex flex-col gap-5">
      {/* Checks if user is logged in. If so, render Shipping Info Component */}
      {isLoggedIn && (
        <section className="px-5 w-full max-w-lg">
          <div className="border p-3 rounded-md shadow-sm flex flex-col gap-2">
            {/* Checks if user is on Selecting Shipping Address meaning user clicks the shipping address button */}
            {isAddressEditing ? (
              // Checks if user clicks the Add New Address, if so, render the Add New Address form.
              isAddingAddress ? (
                <AddNewAddress setIsAddingAddress={setIsAddingAddress} />
              ) : (
                <SelectAddress
                  currentAddress={currentAddress}
                  setCurrentAddress={setCurrentAddress}
                  setIsAddingAddress={setIsAddingAddress}
                  setIsAddressEditing={setIsAddressEditing}
                />
              )
            ) : (
              <ShippingInfo
                currentAddress={currentAddress}
                setIsAddressEditing={setIsAddressEditing}
              />
            )}
          </div>
        </section>
      )}

      <section className="cart-container">
        {/* Cart items */}
        <section className="w-full">
          <h1 className="font-bold text-lg">Review your Cart</h1>

          <section className="space-y-3 p-3">
            {cart.map((item) => (
              <div key={item.cartProductId} className="cart-product_container">
                <h1 className="text-lg font-bold">
                  Delivery Date: {item.deliveryOption.date}
                </h1>

                <section className="cart-product_details max-md:flex-col max-md:items-center">
                  <div className="cart-product_img">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-1 w-full py-3">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    {item.size && (
                      <p className="font-medium">Size: {item.size}</p>
                    )}
                    <p className="font-semibold">{formatPrice(item.price)}</p>

                    <section className="flex gap-3">
                      {editingProductId === item.cartProductId ? (
                        <div className="flex gap-2 items-center h-10">
                          <p>Quantity:</p>
                          <QuantityInput
                            quantity={updatedQuantity}
                            setQuantity={setUpdatedQuantity}
                          />
                          <button
                            className="text-green-500 hover:text-green-700"
                            type="button"
                            onClick={() => handleSaveBtn(item.cartProductId)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 h-10">
                          <p>Quantity: {item.quantity}</p>
                          <button
                            type="button"
                            onClick={() => handleUpdateBtn(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      <button
                        className="text-red-500 hover:text-red-700"
                        type="button"
                        onClick={() => handleDeleteBtn(item.cartProductId)}
                      >
                        Delete
                      </button>
                    </section>
                  </div>

                  <div className="space-y-1 w-full py-3">
                    <h1 className="font-semibold">Choose Delivery Date:</h1>
                    <div className="cart-deliveryOption_container">
                      {deliveryOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex gap-1 items-center"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            className="h-5 w-5"
                            checked={item.deliveryOption.value === option.value}
                            onChange={() =>
                              handleChangeDeliveryOption(
                                item.cartProductId,
                                option
                              )
                            }
                          />
                          <div>
                            <label htmlFor="">{option.date}</label>
                            <p className="text-sm text-gray-500">
                              {option.fee === 0
                                ? "FREE Shipping"
                                : `${formatPrice(
                                    String(option.fee)
                                  )} - Shipping`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </section>
        </section>

        {/* Order Summary Calculations */}
        <aside className="w-full lg:max-w-[400px] overflow-hidden">
          <OrderSummary address={currentAddress} />
        </aside>
      </section>
    </main>
  ) : (
    <CartEmptyUI />
  );
};

export default CartV2;
