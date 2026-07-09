"use client";

import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { StaticImageData } from "next/image";
import LocationControl from "./LocationControl";

import "leaflet/dist/leaflet.css";
import style from "./Map.module.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const getImageUrl = (image: string | StaticImageData): string => typeof image === "string" ? image : image.src;

export const defaultIcon = L.icon({
  iconRetinaUrl: getImageUrl(markerIcon2x),
  iconUrl: getImageUrl(markerIcon),
  shadowUrl: getImageUrl(markerShadow),

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MarkerData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  data: any[];
}

interface MapProps {
  markers?: MarkerData[];
}

const FitBounds = ({ markers = [] }: { markers?: MarkerData[] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!markers.length) return;

    const bounds = L.latLngBounds(
      markers.map((m) => [m.lat, m.lng] as L.LatLngTuple)
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [markers, map]);

  return null;
};

const LabelMarker = React.memo(({ marker }: { marker: MarkerData }) => {
  const icon = useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div class="${style.markerLabel}">
          <span class="${style.badge} ${style[`badge-${marker.status}`]}"></span>
          ${marker.name}
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, -2],
    });
  }, [marker.id, marker.name, marker.status]);

  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={icon}
      interactive={false}
    />
  );
});
LabelMarker.displayName = "LabelMarker";

const currentLocationIcon  = L.divIcon({
  className: "",
  html: `<div class="${style.currentLocationIndicator}"><div class="${style.pulse}"></div><div class="dot"></div></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const Map = ({ markers = [] }: MapProps) => {

  const [currentLocation, setCurrentLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  
  const LocateMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location =  {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(location);
    }, (error) => {
      console.log(error);
    });
  }
  
  return (
    <MapContainer
      center={[0, 0]}
      zoom={10}
      style={{height: "100%", width: "100%", borderRadius: "inherit"}}
      attributionControl={false}
    >
      <LocationControl onLocate={LocateMe} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds markers={markers} />
      {markers.map((marker) => (
        <React.Fragment key={marker.id}>
          <Marker
            position={[marker.lat, marker.lng]}
            icon={defaultIcon}
          >
            <Tooltip
              direction="top"
              offset={[-15, -15]}
            >
              {marker.name}
            </Tooltip>
          </Marker>
          <LabelMarker marker={marker} />
        </React.Fragment>
      ))}
      {currentLocation && (
        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={currentLocationIcon} />
      )}
    </MapContainer>
  );
}

export default Map;
