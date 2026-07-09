'use client';

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface Props {
  onLocate: (latlng: L.LatLng) => void;
}

const LocationControl = ({ onLocate }: Props) => {

  const map = useMap();

  useEffect(() => {
    const handleLocationFound = (e: L.LocationEvent) => {
      onLocate(e.latlng);
    };

    map.on("locationfound", handleLocationFound);

    return () => {
      map.off("locationfound", handleLocationFound);
    };
  }, [map, onLocate]);

  useEffect(() => {
    const LocateLeafletControl = L.Control.extend({
      onAdd() {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        const button = L.DomUtil.create("a", "", container);
        button.href = "#";
        button.title = "Show my location";
        button.setAttribute("role", "button");
        button.style.width = "30px";
        button.style.height = "30px";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.cursor = "pointer";
        button.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/>
          </svg>
        `;
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.on(button, "click", (e) => {
          L.DomEvent.preventDefault(e);
          map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: true,
          });
        });
        return container;
      },
    });

    const control = new LocateLeafletControl({
      position: "topleft",
    });

    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map, onLocate]);
  return null;
};

export default LocationControl;
