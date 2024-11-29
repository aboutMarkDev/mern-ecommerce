import { ProductCollectionType } from "../types/index.types";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";

type CollectionGridListProp = {
  products: ProductCollectionType[];
};

const CollectionGridList = ({ products }: CollectionGridListProp) => {
  return (
    <section className="flex-center flex-wrap gap-3 w-full max-w-7xl">
      {products?.map((product) => (
        <div
          key={product._id}
          className="border rounded-md w-full max-w-[300px] h-[300px] group overflow-hidden shadow-md"
        >
          <Link
            to={`/view?pid=${product._id}`}
            className="flex flex-col w-full h-full"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain w-full h-[80%] flex-1 group-hover:scale-125 duration-200 delay-75"
            />
            <div className="border-t px-3 py-1 max-md:text-sm font-medium z-20 bg-white">
              <h1 className="line-clamp-1">{product.name}</h1>
              <h1 className="">{formatPrice(product.price)}</h1>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default CollectionGridList;
