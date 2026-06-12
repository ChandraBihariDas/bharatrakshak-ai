"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

const incidents = [
  {
    title: "Flood Alert",
    location: "Assam",
    lat: 26.2006,
    lng: 92.9376,
  },
  {
    title: "Cyclone Warning",
    location: "Odisha",
    lat: 20.9517,
    lng: 85.0985,
  },
  {
    title: "Heatwave",
    location: "Rajasthan",
    lat: 27.0238,
    lng: 74.2179,
  },
  {
    title: "Landslide",
    location: "Sikkim",
    lat: 27.533,
    lng: 88.5122,
  },
  {
    title: "Responder Team",
    location: "Delhi",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    title: "SOS Request",
    location: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
  },
];

const icon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
});

export function IndiaOperationsMap() {
  return (
    <MapContainer
      center={[22.5, 79]}
      zoom={5}
      className="h-[650px] w-full"
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents.map((item) => (
        <Marker
          key={item.title}
          position={[item.lat, item.lng]}
          icon={icon}
        >
          <Popup>
            <div>
              <div className="font-semibold">
                {item.title}
              </div>

              <div>{item.location}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}