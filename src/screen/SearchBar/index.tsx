import { styles } from "@/styles";
import { AutoComplete } from "antd";
import clsx from "clsx";
import { AiFillCloseCircle } from "react-icons/ai";

const SearchBar: React.FC = () => {
  return (
    <div className={clsx(styles.screen, styles.center, "bg-[#293736]")}>
      <div className="w-1/2">
        <AutoComplete
          className="w-full placeholder-slate-800"
          clearIcon={<AiFillCloseCircle />}
          placeholder="Where are we going today?"
        />
      </div>
    </div>
  );
};

export default SearchBar;
