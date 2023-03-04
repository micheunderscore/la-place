import { removeRecent, selectSearch } from "@/features";
import { useMapDispatch, useMapSelector } from "@/redux/gmap/hooks";
import Search from "antd/es/input/Search";
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
            <Search
              size="large"
              allowClear
              enterButton={
                <FaSearchLocation
                  onClick={(e) => {
                    onSubmit();
                    e.currentTarget.blur();
                  }}
                />
              }
              className="flex items-center justify-center mt-5"
              onFocus={() => setFocused(true)}
              {...getInputProps({
                placeholder: "Where are we going today?",
              })}
            />
            <div className="w-full mt-2 overflow-hidden rounded-lg absolute block flex-col items-start bg-gray-200 z-10 shadow-lg">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {focused &&
                    filteredRecent.map((recent) => (
                      <div
                        onClick={() => {
                          onChange(recent);
                          console.log(`clicked ${recent}`);
                        }}
                        className="flex w-full justify-between items-center py-2 px-4 hover:bg-slate-300"
                      >
                        {recent}
                        <div>
                          <IoCloseCircle
                            size={16}
                            onClick={() => dispatch(removeRecent)}
                          />
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
