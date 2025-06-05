import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt, FaMapMarker } from "react-icons/fa";
import { LuCircleParking } from "react-icons/lu";
import { HiLocationMarker } from "react-icons/hi";
import { GiPositionMarker } from "react-icons/gi";

import { getAllParkings } from "../../services/ParkingService";

// Configuración para el icono por defecto de Leaflet (soluciona problemas de visualización del icono)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Función para crear un icono personalizado usando L.DivIcon
// Esta función se puede usar para crear iconos personalizados basados en el estado del parking
const createCustomDivIcon = (parking, isSelected) => {
  // const iconColor = parking.totalSpots > 100 ? "text-teal-600" : "text-red-600";
  const iconColor = isSelected ? "text-yellow-700" : "text-teal-700";
  const shadow = isSelected ? "drop-shadow-2xl" : "drop-shadow-lg";

  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <GiPositionMarker className={`${iconColor} ${shadow} text-4xl`} />
    ),
    className: "bg-transparent border-none", // Para evitar estilos por defecto de L.DivIcon
    iconSize: [35, 35],
    iconAnchor: [20, 35],
    popupAnchor: [0, -35],
  });
};

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       // Cuando se hace clic en el mapa, se intenta localizar al usuario
//       map.locate();
//     },
//     locationfound(e) {
//       // Cuando se encuentra la ubicación
//       setPosition(e.latlng); // Actualiza la posición para el marcador
//       map.flyTo(e.latlng, map.getZoom()); // Centra el mapa en la ubicación del usuario
//     },
//     // locationerror(e) {
//     //   console.error("Error de geolocalización:", e.message);
//     //   alert(
//     //     `Error al obtener la ubicación: ${e.message}. Asegúrate de haber concedido los permisos.`
//     //   );
//     // },
//   });

//   // Si la posición no se ha determinado, no renderiza nada (o un mensaje de carga)
//   if (position === null) {
//     return null;
//   }

//   // Cuando la posición se determina, muestra un marcador y un popup
//   return (
//     <Marker position={position}>
//       <Popup>¡Estás aquí!</Popup>
//     </Marker>
//   );
// }

const MapView = ({ onMarkerClick }) => {
  // Recibe onMarkerClick desde Layout
  const [parkings, setParkings] = useState([]);
  const [selectedParkingId, setSelectedParkingId] = useState(null);
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
        zoomControl={false}
        className="h-full w-full"
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

{/* <TileLayer
  attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Ejemplo de un mapa oscuro
/> */}

{/* <TileLayer
  attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  maxZoom={20}
/> */}

{/* <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Base map: <a href="https://www.mediawiki.org/wiki/Maps#Production_maps_cluster">Wikimedia maps</a>'
  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
  maxZoom={19}
/> */}

<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  maxZoom={19}
/>

        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            icon={createCustomDivIcon(parking, selectedParkingId === parking.id)} // Usa el icono personalizado
            position={[parking.latitude, parking.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedParkingId(parking.id); // Actualiza el seleccionado
                onMarkerClick(parking.id); // Llama a la función pasada por Layout
              },
            }}
          >
            <Popup className="custom-popup-dark dark:custom-popup-dark">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-200">{parking.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {parking.address}
                  <br />
                  <span className="font-semibold">Plazas totales:</span> {parking.totalSpots}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="topright" />

        {/* <LocationMarker /> */}
      </MapContainer>
    </main>
  );
};
export default MapView;
