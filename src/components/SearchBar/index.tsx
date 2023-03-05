import { removeRecent, selectSearch } from "@/features";
import { useMapDispatch, useMapSelector } from "@/redux/gmap/hooks";
import { styles } from "@/styles";
import { Button } from "antd";
import Input from "antd/es/input";
import Tooltip from "antd/es/tooltip";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import PlacesAutocomplete from "react-places-autocomplete";

export interface ISearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const [focused, setFocused] = useState(false);
  const dispatch = useMapDispatch();
  const { address, recent, coordinates } = useMapSelector(selectSearch);

  useEffect(() => {
    setFocused(false);
  }, [coordinates]);

  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        const filteredRecent = recent
          .filter(
            (value) => value.toLowerCase().indexOf(address.toLowerCase()) !== -1
          )
          .filter((value) => value !== address);
        const filteredSuggestions = suggestions.filter(
          (suggestion) => recent.indexOf(suggestion.description) === -1
        );
        return (
          <div className="relative">
            <Input
              size="large"
              allowClear
              suffix={
                <Tooltip title="Find Place on Map">
                  <Button
                    type="primary"
                    onClick={(e) => {
                      onSubmit();
                      e.currentTarget.blur();
                    }}
                    className={clsx(styles.center, "bg-slate-700")}
                    icon={<FaSearchLocation size={16} />}
                  />
                </Tooltip>
              }
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onSubmit();
                  e.currentTarget.blur();
                }
              }}
              className={clsx(styles.center, "font-semibold mt-5")}
              onFocus={() => setFocused(true)}
              {...getInputProps({
                placeholder: "Where are we going today?",
              })}
            />
            <div className="w-full mt-2 overflow-hidden rounded-lg absolute block flex-col items-start bg-gray-200 z-10 shadow-lg">
              {loading ? (
                <div className="px-4 py-2">Loading...</div>
              ) : (
                <>
                  {focused &&
                    filteredRecent.map((recent) => (
                      <div
                        className={clsx(
                          styles.center,
                          "relative transition delay-50 hover:bg-slate-300"
                        )}
                      >
                        <div
                          onClick={() => {
                            onChange(recent);
                          }}
                          className="w-full py-2 px-4"
                        >
                          {recent}
                        </div>
                        <div
                          onClick={() => {
                            dispatch(removeRecent(recent));
                          }}
                          className="absolute z-10 top-3 right-2 transition delay-50 opacity-25 hover:opacity-100"
                        >
                          <IoCloseCircle size={16} />
                        </div>
                      </div>
                    ))}
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className: "py-2 px-4 hover:bg-slate-300",
                      })}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};
