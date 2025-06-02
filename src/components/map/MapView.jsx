import React from "react";
// react-leaflet y leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  // Placeholder para el mapa
  return (
    <main className="flex-1 bg-gray-300 p-4">
      <h2 className="text-xl font-semibold">Mapa interactivo</h2>
      {
        <MapContainer center={[43.26, -2.93]} zoom={14} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[43.26, -2.93]}>
            <Popup>
              Parking de ejemplo. <br /> Aquí la info que necesitemos.
            </Popup>
          </Marker>
        </MapContainer>
        }
      <div className="w-full h-full bg-gray-400 flex items-center justify-center">
        <p>Contenedor del Mapa</p>
      </div>
    </main>
  );
};
export default MapView;
