import { useEffect, useState } from "react";
import Subscribe from "../../components/Subscribe";
import { useProductsContext } from "../../context/Products";
import { useGetAllProducts } from "../../lib/react-query/queries";
import { LatestType, ProductCollectionType } from "../../types/index.types";
import HomeCollection from "../../components/HomeCollection";
import { Loader2 } from "lucide-react";

const Home = () => {
  // This bestCollection stores the constant value of best product collections.
  const { bestCollection } = useProductsContext();

  const { data: products, isPending: isProductsLoading } = useGetAllProducts();

  // Local state for storing latest collections
  const [latest, setLatest] = useState<LatestType[]>([]);

  // Func to add the latest 5 products to the latest state.
  const addToLatest = () => {
    const latestFive = products?.slice(-5).reverse();
    setLatest(
      latestFive?.map((item: ProductCollectionType) => {
        return {
          id: item._id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
        };
      })
    );
  };
  // The array dependencies in products is for when the products were changed (e.g., delete a product or add) it will be added automatically to latest state.
  useEffect(() => {
    addToLatest();
  }, [products]);

  return isProductsLoading ? (
    <div className="flex-center gap-1 flex-grow">
      <Loader2 className="animate-spin" width={30} height={30} />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  ) : (
    <section className="flex flex-col gap-10 px-3 w-full">
      <video
        autoPlay
        muted
        loop
        className="w-full h-full max-h-[700px] flex-center"
      >
        <source
          src="https://res.cloudinary.com/ddswa5j4j/video/upload/v1728810133/hero-promo-video_gf7teh.mp4"
          type="video/mp4"
          className="aspect-video"
        />
      </video>

      <HomeCollection title="Latest" collection={latest} />

      <HomeCollection title="Best" collection={bestCollection} />

      <Subscribe />
    </section>
  );
};

export default Home;
