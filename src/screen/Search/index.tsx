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
        "flex-col bg-slate-800 overflow-y-scroll overflow-x-hidden"
      )}
    >
      <p
        className={clsx(
          "font-['Tilt Neon'] flex items-center justify-center bg-white px-4 rounded-2xl text-[100px] transition ease-in-out duration-50",
          coordinates ? "scale-[1] my-2" : "scale-[1] md:scale-[2] my-24"
        )}
      >
        La
        <img
          src={process.env.PUBLIC_URL + "/logo.svg"}
          alt="logo"
          className="ml-4 w-24 h-24 text-white"
        />
        lace
      </p>
      <div className="w-5/6 md:w-1/2 mb-5">
        <SearchBar
          value={address}
          onChange={(value) => dispatch(searchAddress(value))}
          onSubmit={handleSubmit}
        />
      </div>
      <div
        className={clsx(
          "flex w-full h-full transition ease-in-out duration-300 delay-100",
          coordinates ? "translate-y-0" : "translate-y-full"
        )}
      >
        {coordinates && <GMap {...mapParams} />}
      </div>
    </div>
  );
};

export default SearchScreen;
