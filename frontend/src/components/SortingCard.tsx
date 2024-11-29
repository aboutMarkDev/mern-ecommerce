import Select, { SingleValue } from "react-select";

interface IOption {
  value: string;
  label: string;
}

type SortingCardProps = {
  sortOptions: IOption[];
  selectedOption: SingleValue<IOption>;
  setSelectedOption: React.Dispatch<React.SetStateAction<SingleValue<IOption>>>;
};

const SortingCard = ({
  sortOptions,
  selectedOption,
  setSelectedOption,
}: SortingCardProps) => {
  return (
    <Select
      value={selectedOption}
      onChange={(option: SingleValue<IOption>) => setSelectedOption(option)}
      options={sortOptions}
      isClearable
      isSearchable
      placeholder="Sort by"
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary25: "lightGray",
          primary50: "silver",
          primary: "black",
        },
      })}
    />
  );
};

export default SortingCard;
