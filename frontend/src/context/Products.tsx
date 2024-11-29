import { createContext, useContext, useState } from "react";
import { bestCollectionConstant } from "../constants";
import { CartType, LatestType } from "../types/index.types";

type ProductsContextType = {
  bestCollection: LatestType[];
  cart: CartType[];
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
};

const initialState = {
  bestCollection: bestCollectionConstant,
  cart: [],
  setCart: () => {},
};

const ProductsContext = createContext<ProductsContextType>(initialState);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const bestCollection: LatestType[] = bestCollectionConstant;
  const [cart, setCart] = useState<CartType[]>([]);

  const value = {
    bestCollection,
    cart,
    setCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

export const useProductsContext = () => useContext(ProductsContext);
