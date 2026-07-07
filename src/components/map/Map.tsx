"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface MapProps {
  markers?: {
    id: number;
    name: string;
    lat: number;
    lng: number;
    data: any[];
  }[];
}

const Map: React.FC<MapProps> = (props) => {

  const { markers } = props;
  const [center, setCenter] = React.useState<[number, number]>([28.6139, 77.2090]);

  /** If markers are available, update the center */
  React.useEffect(() => {
    if (markers && markers.length > 0) {
      const firstMarker = markers[0];
      setCenter([firstMarker.lat, firstMarker.lng]);
    }
  }, [markers]);

  const FitBounds: React.FC<any> = (props) => {
    const { markers } = props;
    const map = useMap();
    React.useEffect(() => {
      if (!markers.length) return;
      const bounds = L.latLngBounds(
        markers.map((marker: any) => [marker.lat, marker.lng])
      );
      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }, [markers, map]);
    return null;
  }

  const labelIcon = (location: any) =>
    L.divIcon({
      className: "",
      html: `
      <div class='markerLabel'>
        <span class="badge badge-${location.status}"></span>
        ${location.name}
      </div>
    `,
      iconSize: [0, 0],
      iconAnchor: [0, -2],
    });

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds markers={markers} />
        {markers && markers.map((marker) => {
          return (
            <Marker
              key={marker.id + 'label'}
              position={[marker.lat, marker.lng]}
              icon={labelIcon(marker)}
            >
            </Marker>
          )
        })}
      </MapContainer>
    </>
  );
}

export default Map;