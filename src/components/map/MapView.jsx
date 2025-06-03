import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { getAllParkings } from "../../services/ParkingService";

// Configuración para el icono por defecto de Leaflet (soluciona problemas de visualización del icono)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

const MapView = ({ onMarkerClick }) => {
  // Recibe onMarkerClick desde Layout
  const [parkings, setParkings] = useState([]);
  const bilbaoCoords = [43.2629126, -2.9350689]; // Centro de Bilbao

  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const data = await getAllParkings();
        setParkings(data);
      } catch (error) {
        console.error("Error fetching parkings:", error);
        // manejar el error??
      }
    };
    fetchParkings();
  }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente

  return (
    <main className="h-full w-full bg-gray-300 dark:bg-gray-700 relative">
    {/* <main className="flex-1 bg-gray-300 dark:bg-gray-700 relative"> */}
      {/* <h2 className="text-xl font-semibold">Mapa interactivo</h2> */}

      <MapContainer
        center={bilbaoCoords}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            position={[parking.latitude, parking.longitude]}
            eventHandlers={{
              click: () => {
                onMarkerClick(parking.id); // Llama a la función pasada por Layout
              },
            }}
          >
            <Popup>
              <b>{parking.name}</b>
              <br />
              {parking.address}
              <br />
              Plazas Totales: {parking.totalSpots}
              {/* <br />
              Plantas: {parking.numLevels} */}
            </Popup>
          </Marker>
        ))}

        {/* <LocationMarker /> */}
      </MapContainer>

      {/* <div className="w-full h-full bg-gray-400 flex items-center justify-center">
        <p>Contenedor del Mapa</p>
      </div> */}
    </main>
  );
};
export default MapView;
