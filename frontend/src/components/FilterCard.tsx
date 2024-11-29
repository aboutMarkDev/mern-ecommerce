type FilterCartProp = {
  list: string[];
  listStore: string[];
  title: string;
  onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterCard = ({ list, listStore, title, onFilter }: FilterCartProp) => {
  return (
    <section className="border rounded-md p-3 space-y-2 shadow">
      <h1 className="font-semibold">{title}</h1>
      <ul className="space-y-1">
        {list.map((item) => (
          <li className="flex gap-1 items-center group" key={item}>
            <input
              type="checkbox"
              name={item}
              value={item}
              checked={listStore.includes(item)}
              id={item}
              className="cursor-pointer h-[15px] w-[15px]"
              onChange={onFilter}
            />
            <label htmlFor={item} className="text-sm font-medium">
              {item}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterCard;
