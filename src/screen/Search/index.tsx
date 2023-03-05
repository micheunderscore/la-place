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
import { useDebounce } from "rooks";

const SearchScreen: React.FC = () => {
  const { address, coordinates } = useMapSelector(selectSearch);
  const dispatch = useMapDispatch();

  const handleSubmit = () => {
    if (!address) return;
    dispatch(getLatLngByAddress(address));
  };

  const setStyleProperties = (
    x: number,
    y: number,
    magnitude: number,
    target: EventTarget & HTMLDivElement
  ) => {
    target?.style.setProperty("--mouse-x", `${x * magnitude}px`);
    target?.style.setProperty("--mouse-y", `${y * magnitude}px`);
  };

  const setDebounced = useDebounce(setStyleProperties, 500);

  const handleCursorMove = (props: {
    click?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    touch?: React.TouchEvent<HTMLDivElement>;
  }) => {
    const { click, touch } = props;

    // XOR Gate (Both click and touch can't exist/not exist at the same time)
    if (
      (click === undefined || touch === undefined) &&
      !(click === undefined && touch === undefined)
    ) {
      const { currentTarget: target } = touch ?? click ?? {};
      const rect = target?.getBoundingClientRect(),
        x =
          (touch?.touches?.[0].clientX ?? click?.clientX ?? 0) -
          (rect?.left ?? 0),
        y =
          (touch?.touches?.[0].clientY ?? click?.clientY ?? 0) -
          (rect?.left ?? 0);

      setDebounced(x, y, click ? 0.5 : 2, target);
    }
  };

  const mapParams = useMemo(() => {
    return { coordinates, address };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return (
    <div
      id="background"
      className={clsx(
        styles.screen,
        styles.center,
        "flex-col overflow-y-scroll overflow-x-hidden"
      )}
      onTouchMove={(touch) => handleCursorMove({ touch })}
      onMouseMove={(click) => handleCursorMove({ click })}
    >
      <p
        className={clsx(
          styles.center,
          "bg-white px-4 rounded-2xl",
          "font-['Tilt Neon'] text-[100px]",
          "transition ease-in-out duration-50",
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
      {!coordinates && (
        <p className="flex w-5/6 md:w-1/2 justify-evenly animate-bounce text-white text-lg">
          <p>^ ^ ^</p>
          <p>Search a place and find it on a map using this search bar!</p>
          <p>^ ^ ^</p>
        </p>
      )}
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
