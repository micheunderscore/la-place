import AutoComplete from "antd/es/auto-complete";
import { AiFillCloseCircle } from "react-icons/ai";

export interface ISearchBarProps {}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" },
  ];

  return (
    <AutoComplete
      className="w-full placeholder-slate-800"
      clearIcon={<AiFillCloseCircle />}
      placeholder="Where are we going today?"
      options={options}
      filterOption={(input, option) =>
        option!.value.toUpperCase().indexOf(input.toUpperCase()) !== -1
      }
    />
  );
};
