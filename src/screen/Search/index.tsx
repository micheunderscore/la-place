import { SearchBar } from "@/components";
import {
  getLatLngByAddress,
  GMap,
  searchAddress,
  selectSearch,
} from "@/features";
import { useMapDispatch, useMapSelector } from "@/redux/gmap/hooks";
import { styles } from "@/styles";
import clsx from "clsx";
import { useMemo } from "react";

const SearchScreen: React.FC = () => {
  const { address, coordinates } = useMapSelector(selectSearch);
  const dispatch = useMapDispatch();

  const handleSubmit = () => {
    if (!address) return;
    dispatch(getLatLngByAddress(address));
  };

  const mapParams = useMemo(() => {
    return { coordinates, address };
  }, [coordinates]);

  return (
    <div
      className={clsx(
        styles.screen,
        styles.center,
        "flex-col gap-24 bg-slate-800 overflow-y-scroll"
      )}
    >
      <p className="absolute font-mynerve text-[255px]">La Place</p>
      <div className="w-1/2">
        <SearchBar
          value={address}
          onChange={(value) => dispatch(searchAddress(value))}
          onSubmit={handleSubmit}
        />
      </div>
      {coordinates && <GMap {...mapParams} />}
    </div>
  );
};

export default SearchScreen;
