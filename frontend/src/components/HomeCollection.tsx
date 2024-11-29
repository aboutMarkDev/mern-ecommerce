import { Link } from "react-router-dom";
import { LatestType } from "../types/index.types";
import { formatPrice } from "../utils";
import { ArrowBigRightDash } from "lucide-react";
import { Button } from "./ui/button";

type HomeCollectionProps = {
  title: "Latest" | "Best";
  collection: LatestType[];
};

const HomeCollection = ({ title, collection }: HomeCollectionProps) => {
  return (
    <section className="flex flex-col gap-3 py-5">
      <h1 className="max-md:text-xl text-4xl font-bold">{title} Collections</h1>
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
            <h1 className="line-clamp-1 font-medium">{item.name}</h1>
            <h3 className="font-medium">{formatPrice(item.price)}</h3>
          </div>
        ))}
      </div>

      <Link to="/products" className="w-full max-w-[12rem] flex-center">
        <Button variant="link">
          Browse Collections
          <ArrowBigRightDash />
        </Button>
      </Link>
    </section>
  );
};

export default HomeCollection;
