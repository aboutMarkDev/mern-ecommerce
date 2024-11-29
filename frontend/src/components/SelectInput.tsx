import Select, { SingleValue } from "react-select";

interface IOption {
  value: string;
  label: string;
}

type SelectInputProps = {
  options: IOption[];
  value: SingleValue<IOption>;
  placeholder?: string;
  setValue: React.Dispatch<React.SetStateAction<SingleValue<IOption>>>;
};

const SelectInput = ({
  options,
  value,
  setValue,
  placeholder,
}: SelectInputProps) => {
  return (
    <Select
      value={value}
      className="text-sm"
      onChange={(option: SingleValue<IOption>) => setValue(option)}
      options={options}
      placeholder={placeholder}
      isClearable
      isSearchable
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

export default SelectInput;
