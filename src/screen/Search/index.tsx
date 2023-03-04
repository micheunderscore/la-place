import { SearchBar } from "@/components/SearchBar";
import { styles } from "@/styles";
import clsx from "clsx";

const SearchScreen: React.FC = () => {
  return (
    <div className={clsx(styles.screen, styles.center, "bg-slate-800")}>
      <div className="w-1/2">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchScreen;
