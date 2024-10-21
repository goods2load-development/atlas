import Spinner from '../ui/spinner';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';

import React, { useEffect, useRef, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.73061,
  lng: -73.935242,
};

const PlaceIdMap = ({
  placeId,
  onChangePlaceId,
}: {
  placeId?: string;
  onChangePlaceId: (placeId: string) => void;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: ['places'],
  });
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null,
  );
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [markerPosition, setMarkerPosition] = useState<null | any>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!place?.place_id) return;
    onChangePlaceId(place.place_id);
  }, [place?.place_id]);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    if (placeId) {
      const service = new google.maps.places.PlacesService(map);
      service.getDetails({ placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          setPlace(result);
          if (result.geometry?.location) {
            const location = result.geometry.location;
            setMarkerPosition(location.toJSON());
            map.panTo(location);
          }
        }
      });
    }
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    console.log({ places });
    if (places && places.length > 0) {
      const place = places[0];
      if (place) {
        setPlace(place);
        if (place.geometry?.location) {
          setMarkerPosition(place.geometry?.location?.toJSON());
        }
        if (mapRef.current && place.geometry?.location) {
          mapRef.current.panTo(place.geometry.location);
        }
      }
    }
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={handleLoad}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for places"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
                top: '10px',
                color: 'black',
              }}
            />
          </StandaloneSearchBox>
          {markerPosition && place && (
            <InfoWindow position={markerPosition}>
              <div className="text-black">
                <h4 className="font-bold">{place.name}</h4>
                <p style={{ margin: '5px 0' }}>Place ID: {place.place_id}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default PlaceIdMap;
