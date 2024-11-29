import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductById } from "../../lib/react-query/queries";
import { formatPrice } from "../../utils";
import { useEffect, useState } from "react";
import { useProductsContext } from "../../context/Products";
import { toast } from "react-toastify";
import { deliveryOptions } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import QuantityInput from "../../components/QuantityInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

const ViewProduct = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("pid");
  const navigate = useNavigate();

  const { data: product, isPending: isProductLoading } = useGetProductById(
    productId || ""
  );
  const { cart, setCart } = useProductsContext();

  //Local state for storing variations
  const [variationStore, setVariationStore] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);
  //Local state for selecting size
  const [selectedSize, setSelectedSize] = useState<string | "">();
  //local state for quantity
  const [quantity, setQuantity] = useState<number>(1);

  //Set the Variation to the first object value in product variations.
  useEffect(() => {
    setVariationStore(product?.variations[0] || null);
  }, [product]);

  //Handle Change of Variation
  const handleChangeVariation = (variationName: string) => {
    product.variations.map((item: { name: string; imageUrl: string }) => {
      if (item.name === variationName) {
        setVariationStore(item);
      }
    });
  };

  //Handles Add to cart
  const addToCart = () => {
    // Finds if the product in the cart with the same name and size exists
    const productInCart = cart.find(
      (item) => item.name === variationStore?.name && item.size === selectedSize
    );

    //FIRST: Check if the product size array has an object value.
    //SECOND: If it does, check also if the user selects a size. Otherwise, proceed to adding the product to the cart.

    /*BUG: PRODUCTS WITH NO SIZES ADDED EVERYTIME AS A UNIQUE PRODUCT IN CART EVEN IF IT HAVE THE SAME VARIATION NAME.*/
    try {
      if (product?.size.length > 0 && !selectedSize) {
        toast.error("Please select size");
      } else {
        if (productInCart) {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.name === variationStore?.name && item.size === selectedSize
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item
            )
          );
          toast.success("Product quantity increases");
        } else {
          setCart([
            ...cart,
            {
              // The id should be from the product itself. For referencing in database...
              //Should I include the real id of the product for referencing in database?
              cartProductId: uuidv4(), //Change to cartProductId this id is unique in cart only.
              productId: product.id,
              name: variationStore?.name || "",
              imageUrl: variationStore?.imageUrl || "",
              price: product.price,
              size: selectedSize || "",
              quantity: quantity,
              deliveryOption: deliveryOptions[0],
            },
          ]);
          toast.success("Added to the cart.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isProductLoading ? (
    <div className="flex-center gap-1 flex-grow">
      <Loader2 className="animate-spin" width={30} height={30} />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  ) : (
    <main className="w-full pd-main_container">
      {/* Back to Collection Button */}
      <div className="flex-shrink-0">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
      </div>
      {/* <section className="flex items-start gap-3 max-lg:flex-col max-lg:px-3 flex-shrink-0 justify-end"> */}
      {/* Product Image */}
      <section className="image-viewer overflow-hidden flex-shrink-0">
        <img
          src={variationStore?.imageUrl || ""}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </section>
      {/* </section> */}

      {/* Product Details */}
      <section className="pd-details_container">
        {/* Product Name, Description, and Price. */}
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold">
            {variationStore?.name || ""}
          </h1>
          <p className="text-sm text-gray-500 text-balance">
            {product.description ||
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis dolorum, impedit qui dolorem, ut aperiam placeat magni, error numquam eum eveniet omnis et ducimus facilis quae eaque doloribus nobis harum!"}
          </p>
          <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
        </section>

        {/* Only display if product variations has more than 1 element or value */}
        {product.variations.length > 1 && (
          <section className="flex gap-3 flex-wrap">
            {product.variations.map(
              (item: { name: string; imageUrl: string }) => {
                const currentVariation =
                  variationStore?.imageUrl === item.imageUrl;

                return (
                  <div
                    className={`${
                      currentVariation && "ring-2 ring-[#202020]"
                    } pd-details_var`}
                    key={item.name}
                    onClick={() => handleChangeVariation(item.name)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                );
              }
            )}
          </section>
        )}

        {/* Render this if the size array not empty */}
        {product.size.length > 0 && (
          <section className="w-full max-w-[500px] space-y-3">
            {/* For Size Title and Guide */}
            <section className="font-semibold text-lg flex-between">
              <h3>Select Size</h3>
              <h3 className="text-gray-500">Size Guide</h3>
            </section>

            {/* Size Selections */}
            <section className="flex gap-3 flex-wrap">
              {product.size.map((item: string) => (
                <div
                  key={item}
                  className={`${
                    selectedSize === item && "ring-2 ring-[#202020]"
                  } pd-details_sizes`}
                  onClick={() => setSelectedSize(item)}
                >
                  {item}
                </div>
              ))}
            </section>
          </section>
        )}

        {/* Setting Quantity for adding the product to the cart*/}
        <section className="w-full flex items-center gap-1 overflow-hidden py-3">
          <h1 className="font-medium">Quantity:</h1>
          <div className="flex gap-2 items-center">
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          </div>
        </section>

        <Button
          size="lg"
          className="rounded-full"
          type="button"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </section>
    </main>
  );
};

export default ViewProduct;
