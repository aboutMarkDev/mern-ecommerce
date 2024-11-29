import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../lib/react-query/queries";
import FilterCard from "../../components/FilterCard";
import { category, subCategory } from "../../constants";
import SortingCard from "../../components/SortingCard";
import CollectionGridList from "../../components/CollectionGridList";
import { SingleValue } from "react-select";
import { ProductCollectionType } from "../../types/index.types";
import { Loader2 } from "lucide-react";

interface IOption {
  value: string;
  label: string;
}

const ProductsCollection = () => {
  const { data: products, isPending: isProductsLoading } = useGetAllProducts();

  //Local state for rendering and filtering
  const [productsCollection, setProductsCollection] = useState<
    ProductCollectionType[]
  >([]);

  //For Showing or Hiding Filter Cards.
  const [show, setShow] = useState<boolean>(false);

  //state for storing selected value in category and subcategory
  const [categoryStore, setCategoryStore] = useState<string[]>([]);
  const [subCategoryStore, setSubCategoryStore] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] =
    useState<SingleValue<IOption>>(null);

  //sorting values and labels
  const sortOptions: IOption[] = [
    { value: "Relevant", label: "Relevant" },
    { value: "Low", label: "Low to High" },
    { value: "High", label: "High to Low" },
  ];

  useEffect(() => {
    setProductsCollection(products);
  }, [products]);

  useEffect(() => {
    filter();
  }, [categoryStore, subCategoryStore]);

  useEffect(() => {
    sortProductsByPrice();
  }, [selectedOption?.value]);

  //Filtering Function
  const filter = () => {
    let pdCollectionCopy = products?.slice();

    if (categoryStore.length > 0) {
      pdCollectionCopy = pdCollectionCopy.filter(
        (item: ProductCollectionType) => categoryStore.includes(item.category)
      );
    }

    if (subCategoryStore.length > 0) {
      pdCollectionCopy = pdCollectionCopy.filter(
        (item: ProductCollectionType) =>
          subCategoryStore.includes(item.subCategory)
      );
    }

    setProductsCollection(pdCollectionCopy);
  };

  //Event handler for storing category and subcategory values in store.
  const handleStoringCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCategoryStore([...categoryStore, value]);
    } else {
      setCategoryStore(categoryStore.filter((cat) => cat !== value));
    }
  };
  const handleStoringSubcategories = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    if (checked) {
      setSubCategoryStore([...subCategoryStore, value]);
    } else {
      setSubCategoryStore(subCategoryStore.filter((cat) => cat !== value));
    }
  };

  //Event handler for sorting products by price
  const sortProductsByPrice = () => {
    let pcCopy = productsCollection.slice();

    switch (selectedOption?.value) {
      case "Low":
        return setProductsCollection(
          pcCopy.sort((a, b) => parseInt(a.price) - parseInt(b.price))
        );

      case "High":
        return setProductsCollection(
          pcCopy.sort((a, b) => parseInt(b.price) - parseInt(a.price))
        );

      default:
        return filter();
    }
  };

  return isProductsLoading ? (
    <div className="flex-center gap-1 flex-grow">
      <Loader2 className="animate-spin" width={30} height={30} />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  ) : (
    <main className="w-full flex gap-5 px-5 max-lg:flex-col">
      {/* Filtering Container */}
      <aside className="w-full max-w-[300px] px-5">
        {/* Filter Title and Button for Showing or Hiding Filter Cards */}
        <section className="flex items-center gap-1">
          <h1 className="text-lg font-bold">Filters</h1>
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="lg:hidden"
          >
            <img
              src={
                show
                  ? "/assets/icons/angle-small-down.svg"
                  : "/assets/icons/angle-small-right.svg"
              }
              alt="show-icon"
              width={24}
              height={24}
            />
          </button>
        </section>

        {/* Filtering Cards */}
        <section className={`${!show && "hidden"} lg:block py-5 space-y-3`}>
          <FilterCard
            list={category}
            listStore={categoryStore}
            title="Categories"
            onFilter={handleStoringCategories}
          />
          <FilterCard
            list={subCategory}
            listStore={subCategoryStore}
            title="Subcategories"
            onFilter={handleStoringSubcategories}
          />
        </section>
      </aside>

      <section className="w-full space-y-5">
        {/* Title and Sorting Card */}
        <section className="flex-between">
          <h1 className="max-sm:text-2xl text-3xl uppercase font-bold">
            Products Collections
          </h1>

          {/* Sort Card */}
          <aside className="w-full max-w-[200px]">
            <SortingCard
              sortOptions={sortOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </aside>
        </section>

        {/* Products Grid List */}
        <CollectionGridList products={productsCollection} />
      </section>
    </main>
  );
};

export default ProductsCollection;
