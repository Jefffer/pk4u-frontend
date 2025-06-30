import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import logoMarker from "../../../public/logo-transparent.png";

import ReactDOMServer from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";

import { useTranslation } from "react-i18next";

// Configuración para el icono por defecto de Leaflet (soluciona problemas de visualización del icono)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Función para crear un icono personalizado del logo
const createLogoIcon = (isSelected) => {
  const size = isSelected ? 45 : 30;
  return new L.Icon({
    iconUrl: logoMarker,
    iconSize: [size * 0.8, size],
    iconAnchor: [size / 2, size], // El "pico" del marcador en la base
    popupAnchor: [0, -size],
    className: "bg-transparent border-none",
  });
};

// Función para crear un icono personalizado usando L.DivIcon
// Esta función se puede usar para crear iconos personalizados basados en el estado del parking
const createCustomDivIcon = (parking, isSelected) => {
  const iconColor = isSelected ? "text-teal-700" : "text-teal-500";
  const shadow = isSelected ? "drop-shadow-xl" : "drop-shadow-md";
  const iconSize = isSelected ? "text-5xl" : "text-4xl";

  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <GiPositionMarker className={`${iconColor} ${shadow} ${iconSize}`} />
    ),
    className: "bg-transparent border-none", // Para evitar estilos por defecto de L.DivIcon
    iconSize: [isSelected ? 48 : 36, isSelected ? 48 : 36],
    iconAnchor: [isSelected ? 24 : 18, isSelected ? 48 : 36],
    popupAnchor: [0, isSelected ? -48 : -36],
  });
};

const MapView = ({ parkings, onMarkerClick, selectedParkingId }) => {
  const { t } = useTranslation();
  const bilbaoCoords = [43.2629126, -2.9350689];

  // Referencias a los marcadores
  const markerRefs = useRef({});

  // Efecto para abrir el popup del marcador seleccionado
  useEffect(() => {
    if (selectedParkingId && markerRefs.current[selectedParkingId]) {
      markerRefs.current[selectedParkingId].openPopup();
    }
    // Opcional: cerrar popups de otros marcadores
    Object.entries(markerRefs.current).forEach(([id, marker]) => {
      if (id !== String(selectedParkingId)) {
        marker.closePopup();
      }
    });
  }, [selectedParkingId]);

  return (
    <main className="h-full w-full bg-gray-300 dark:bg-gray-700 relative">
      <MapContainer
        center={bilbaoCoords}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution={t(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
          )}
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            icon={createLogoIcon(selectedParkingId === parking.id)}
            position={[parking.latitude, parking.longitude]}
            eventHandlers={{
              click: () => {
                onMarkerClick(parking.id);
              },
              mouseover: (event) => {
                event.target.openPopup();
              },
              mouseout: (event) => {
                // Solo cerrar si NO es el seleccionado
                if (selectedParkingId !== parking.id) {
                  event.target.closePopup();
                }
              },
            }}
            ref={(ref) => {
              if (ref) markerRefs.current[parking.id] = ref;
            }}
          >
            <Popup className="custom-popup-dark dark:custom-popup-dark">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-200">
                  {parking.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {parking.address}
                  <br />
                  <span className="font-semibold">{t("Plazas totales")}:</span>{" "}
                  {parking.totalSpots}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="topright" />
      </MapContainer>
    </main>
  );
};

export default MapView;
