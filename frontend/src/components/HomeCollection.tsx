import { Link } from "react-router-dom";
import { LatestType } from "../types/index.types";
import { formatPrice } from "../utils";

type HomeCollectionProps = {
  title: "Latest" | "Best";
  collection: LatestType[];
};

const HomeCollection = ({ title, collection }: HomeCollectionProps) => {
  return (
    <section className="flex flex-col gap-3 py-5">
      <h1 className="text-4xl font-semibold">{title} Collections</h1>
      <div className="flex-center max-xl:flex-wrap gap-3">
        {collection?.map((item) => (
          <div
            className="flex flex-col w-full max-w-[300px] h-[350px] overflow-hidden"
            key={item.id}
          >
            <div className="border rounded-md w-full max-w-[280px] h-[300px]">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="line-clamp-1 font-semibold">{item.name}</h1>
            <h3 className="font-semibold">{formatPrice(item.price)}</h3>
          </div>
        ))}
      </div>
      <Link
        to="/products"
        className="font-medium flex items-center w-full max-w-[175px] group"
      >
        <p className="group-hover:underline">Browse Collections</p>
        <img
          src="/assets/icons/arrow-small-left.svg"
          alt="icon"
          width={24}
          height={24}
          className="rotate-180 group-hover:translate-x-1 group-hover:transition group-hover:duration-200"
        />
      </Link>
    </section>
  );
};

export default HomeCollection;
