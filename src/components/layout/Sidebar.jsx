import React, { useState, useEffect } from "react";
import SearchBar from "../ui/Searchbar";
// import ParkingList from '../parking/ParkingList';
import { FaMapMarkerAlt, FaLayerGroup, FaParking } from "react-icons/fa";

import { getParkingDetails } from "../../services/ParkingService";

const Sidebar = ({ selectedParkingId }) => {
  // Recibe selectedParkingId
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingDetails, setParkingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Lógica de búsqueda (futura implementación)
    console.log("Buscando:", term);
    // Por ahora, si se busca, limpiamos los detalles del parking seleccionado
    if (term) {
      setParkingDetails(null);
      setImageError(false);
    }
  };

  useEffect(() => {
    if (selectedParkingId) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        setParkingDetails(null); // Limpia detalles anteriores
        setImageError(false); // Resetea el estado de error de imagen
        try {
          const data = await getParkingDetails(selectedParkingId);
          setParkingDetails(data);
        } catch (err) {
          console.error("Error fetching parking details:", err);
          setError("No se pudieron cargar los detalles del parking.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    } else {
      setParkingDetails(null); // Si no hay ID seleccionado, no mostrar detalles
      setImageError(false);
    }
  }, [selectedParkingId]); // Se ejecuta cuando selectedParkingId cambia

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = parkingDetails ? `/${parkingDetails.id}.png` : null;

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 dark:bg-slate-800 p-6 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
      <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 pt-2 pb-2 z-10">
        {/* <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
          {parkingDetails ? "Detalle del Parking" : "Buscar Parkings"}
        </h2> */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Introduce ubicación o nombre..."
        />
      </div>

      {isLoading && (
        <p className="text-slate-600 dark:text-slate-400 mt-4">
          Cargando detalles...
        </p>
      )}
      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}

      {parkingDetails && !isLoading && !error && (
        <div className="mt-4 text-slate-700 dark:text-slate-300">
          {!imageError && imageUrl && (
            <img
              src={imageUrl}
              alt={`Imagen de ${parkingDetails.name}`}
              className="w-full h-auto max-h-48 object-cover rounded-lg mb-4 shadow-md"
              onError={handleImageError} // Manejador para cuando la imagen no carga
            />
          )}
          {imageError && (
            <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-lg mb-4 text-slate-500 dark:text-slate-400 text-sm">
              Imagen no disponible
            </div>
          )}
          <h3 className="text-lg font-bold text-sky-700 dark:text-sky-500 mb-2">
            {parkingDetails.name}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start text-left">
              <FaMapMarkerAlt className="text-sky-600 dark:text-sky-400 mt-0.5 mr-2 flex-shrink-0 h-4 w-4" />
              <div>
                {/* <span className="font-semibold">Dirección: </span> */}
                <span>{parkingDetails.address}</span>
              </div>
            </div>
            <div className="flex items-center text-left">
              <FaLayerGroup className="text-sky-600 dark:text-sky-400 mr-2 flex-shrink-0 h-4 w-4" />
              <div>
                <span className="font-semibold">{parkingDetails.numLevels}</span>
                <span> Plantas</span>
              </div>
            </div>
            <div className="flex items-center text-left">
              <FaParking className="text-sky-600 dark:text-sky-400 mr-2 flex-shrink-0 h-4 w-4" />
              <div>
                <span className="font-semibold">{parkingDetails.totalSpots}</span>
                <span> Plazas Totales</span>
              </div>
            </div>
          </div>

          <h4 className="text-md font-semibold mt-4 mb-2 border-t pt-3 border-slate-300 dark:border-slate-600 text-left">
            Disponibilidad por Planta:
          </h4>
          {parkingDetails.levelsInfo && parkingDetails.levelsInfo.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {parkingDetails.levelsInfo.map((level) => (
                <li
                  key={level.levelId || level.levelName}
                  className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-left"
                >
                  <span className="font-medium">{level.levelName}:</span>
                  <br />
                  {level.spotsFree} plazas libres de {level.spotsTotal}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-left">
              No hay información detallada de plantas disponible.
            </p>
          )}
        </div>
      )}

      {!parkingDetails && !isLoading && !error && !searchTerm && (
        <p className="text-slate-500 dark:text-slate-400 mt-4">
          Selecciona un parking en el mapa para ver sus detalles, o utiliza la
          barra de búsqueda.
        </p>
      )}
      {/* Mensaje para cuando hay un término de búsqueda pero aún no hay resultados */}
      {!parkingDetails && searchTerm && (
        <p className="text-slate-600 dark:text-slate-400 mt-4">
          Resultados para: "{searchTerm}" (funcionalidad de lista de búsqueda
          pendiente).
        </p>
      )}
    </aside>
  );
};

export default Sidebar;
