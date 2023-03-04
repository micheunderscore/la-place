import Search from "antd/es/input/Search";
import { FaSearchLocation } from "react-icons/fa";
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
  const handleChange = (newAddress: string) => onChange(newAddress);

  return (
    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <Search
            size="large"
            allowClear
            enterButton={<FaSearchLocation onClick={onSubmit} />}
            className="flex items-center justify-center"
            {...getInputProps({
              placeholder: "Where are we going today?",
            })}
          />
          <div className="w-full mt-2 overflow-hidden rounded-lg absolute block flex-col items-start bg-gray-200">
            {suggestions.map((suggestion) => (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: "py-2 px-4 hover:bg-slate-300",
                })}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
