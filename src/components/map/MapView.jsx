import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      // Cuando se hace clic en el mapa, se intenta localizar al usuario
      map.locate();
    },
    locationfound(e) {
      // Cuando se encuentra la ubicación
      setPosition(e.latlng); // Actualiza la posición para el marcador
      map.flyTo(e.latlng, map.getZoom()); // Centra el mapa en la ubicación del usuario
    },
    // locationerror(e) {
    //   console.error("Error de geolocalización:", e.message);
    //   alert(
    //     `Error al obtener la ubicación: ${e.message}. Asegúrate de haber concedido los permisos.`
    //   );
    // },
  });

  // Si la posición no se ha determinado, no renderiza nada (o un mensaje de carga)
  if (position === null) {
    return null;
  }

  // Cuando la posición se determina, muestra un marcador y un popup
  return (
    <Marker position={position}>
      <Popup>¡Estás aquí!</Popup>
    </Marker>
  );
}

const MapView = () => {
  // Placeholder para el mapa
  return (
    <main className="flex-1 bg-gray-300 dark:bg-gray-700 relative">
      {/* <h2 className="text-xl font-semibold">Mapa interactivo</h2> */}
      {
        <MapContainer
          center={[43.26, -2.93]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[43.26, -2.93]}>
            <Popup>
              Parking de ejemplo. <br /> Aquí la info que necesitemos.
            </Popup>
          </Marker>

          {/* <LocationMarker /> */}
        </MapContainer>
      }
      {/* <div className="w-full h-full bg-gray-400 flex items-center justify-center">
        <p>Contenedor del Mapa</p>
      </div> */}
    </main>
  );
};
export default MapView;
