import { useMapSelector } from "@/redux/gmap/hooks";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { FaMapPin } from "react-icons/fa";
import { selectSearch } from "./gmapSlice";

export interface IGMapProps {
  coordinates?: google.maps.LatLngLiteral;
  address?: string;
}

export const GMap: React.FC<IGMapProps> = ({
  coordinates,
  address = "Marker",
}) => {
  const search = useMapSelector(selectSearch);

  console.log({ search });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 4.210484,
    lng: 101.975766,
  });

  const AnyReactComponent = ({ lat = 0, lng = 0, text = "" }) => (
    <div className="text-black text-lg whitespace-nowrap flex flex-col items-center justify-center gap-2 -translate-x-full -translate-y-full">
      <div className="p-2 bg-white rounded-lg shadow-lg">{text}</div>
      <FaMapPin size={64} className="text-red-500" />
    </div>
  );

  useEffect(() => {
    if (coordinates) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
      }}
      center={center}
      zoom={15}
    >
      <AnyReactComponent lat={center.lat} lng={center.lng} text={address} />
    </GoogleMapReact>
  );
};
