import { GMap, SearchBar } from "@/components";
import { styles } from "@/styles";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const SearchScreen: React.FC = () => {
  const [coordinates, setCoordinates] = useState<
    google.maps.LatLngLiteral | undefined
  >();
  const [address, setAddress] = useState<string>("");

  const handleSubmit = () => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoordinates(latLng))
      .catch((error) => console.error("Error", error));
  };

  const mapParams = useMemo(() => {
    return { coordinates, address };
  }, [coordinates]);

  useEffect(() => {
    console.log({ where: "SearchScreen", coordinates });
  }, [coordinates]);

  return (
    <div
      className={clsx(
        styles.screen,
        styles.center,
        "flex-col gap-24 bg-slate-800"
      )}
    >
      <p className="absolute font-mynerve text-[255px]">La Place</p>
      <div className="w-1/2">
        <SearchBar
          value={address}
          onChange={setAddress}
          onSubmit={handleSubmit}
        />
      </div>
      {coordinates && <GMap {...mapParams} />}
    </div>
  );
};

export default SearchScreen;
