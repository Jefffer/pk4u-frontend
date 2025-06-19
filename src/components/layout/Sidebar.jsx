import React, { useState, useEffect } from "react";
import SearchBar from "../ui/Searchbar";
import SpotMatrixPopup from "../parking/SpotMatrixPopup";
import { getParkingSpotsForLevel } from "../../services/ParkingService";
// import ParkingList from '../parking/ParkingList';

import {
  FaMapMarkerAlt,
  FaLayerGroup,
  FaBuilding,
  FaCar,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaMapMarkerSolid, LiaCarSolid, LiaCarSideSolid, LiaLayerGroupSolid, LiaEuroSignSolid } from "react-icons/lia";
import { TbCar } from "react-icons/tb";

import { motion } from "framer-motion";
import { getParkingDetails } from "../../services/ParkingService";
import {
  getAvailabilityColor,
  getAvailabilityIcon,
} from "../../utils/utils.jsx";

const Sidebar = ({ selectedParkingId, searchInputRef, onAnimationComplete  }) => {
  // Recibe selectedParkingId
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingDetails, setParkingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Para el Popup de la matriz de plazas
  const [isSpotPopupOpen, setIsSpotPopupOpen] = useState(false);
  const [currentLevelDataForPopup, setCurrentLevelDataForPopup] =
    useState(null);
  const [currentParkingNameForPopup, setCurrentParkingNameForPopup] =
    useState("");

  const handlePlantClick = async (levelInfo) => {
    if (!parkingDetails) return;

    setCurrentParkingNameForPopup(parkingDetails.name); // Guardar nombre del parking para el popup

    // --- IMPORTANTE: Obtener datos de las plazas para la planta seleccionada ---
    // Esto depende de cómo tu API sirva estos datos.
    // Opción 1: Si getParkingDetails ya trae todas las plazas de todas las plantas
    // podrías filtrar aquí.
    // Opción 2: Llamar a un nuevo endpoint o al existente GET /parkings/{parkingId}/spots
    // y luego filtrar por levelInfo.levelId o levelInfo.levelName.

    // Simulando la llamada a un servicio que obtiene las plazas por planta:
    // Deberías implementar esta lógica en ParkingService.js
    // Por ejemplo, podría llamar a /api/v1/parkings/{parkingDetails.id}/spots
    // y luego filtrar las plazas que pertenecen a levelInfo.levelId o levelName
    setIsLoading(true); // Podrías usar un loader específico para el popup
    try {
      // Debes asegurarte que `getParkingSpotsForLevel` exista en tu ParkingService
      // y que devuelva un objeto como { levelName: "...", spotsList: [{spotNumber:1, occupied:true}, ...] }
      // El `levelInfo.levelId` o algún identificador único de la planta sería necesario aquí.
      const spotsData = await getParkingSpotsForLevel(
        parkingDetails.id,
        levelInfo.levelId || levelInfo.levelName
      );

      setCurrentLevelDataForPopup({
        levelName: levelInfo.levelName,
        spotsTotal: levelInfo.spotsTotal, // Ya lo tienes
        spotsFree: levelInfo.spotsFree, // Ya lo tienes
        spotsList: spotsData.spots, // Asumiendo que spotsData.spots es el array de plazas individuales
        // con su estado 'occupied'.
      });
      setIsSpotPopupOpen(true);
    } catch (err) {
      console.error("Error fetching spots for level:", err);
      // Aquí podrías mostrar un error específico para el popup
      setError("No se pudieron cargar las plazas de la planta."); // O un estado de error diferente
    } finally {
      setIsLoading(false);
    }
  };

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

  const imageUrl = "/p1.png";
  // const imageUrl = parkingDetails ? `/${parkingDetails.id}.png` : null;

  // Variantes de animación para el Sidebar
  const sidebarVariants = {
    hidden: {
      x: "-100%", // Inicia fuera de la pantalla a la izquierda
      opacity: 0,
      transition: {
        type: "tween", // Usar tween para un desvanecimiento más controlado
        duration: 0.3, // Duración más corta para la salida
        ease: "easeIn",
      },
    },
    visible: {
      x: 0, // Termina en su posición normal
      opacity: 1,
      transition: {
        type: "spring", // Usar spring para una entrada más "agradable y moderna"
        stiffness: 100,
        damping: 20,
        // duration: 0.4 // Spring no usa duration directamente así, pero ayuda a ajustar la sensación
      },
    },
  };

  // --- Efecto para bloquear/desbloquear el scroll del body ---
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    if (isSpotPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow || ""; // Restaura o quita el estilo
    }

    // Cleanup function para restaurar el scroll si el componente se desmonta
    return () => {
      document.body.style.overflow = originalBodyOverflow || "";
    };
  }, [isSpotPopupOpen]); // Se ejecuta cuando isSpotPopupOpen cambia
  // --- FIN DEL EFECTO ---

  const closeSpotPopup = () => {
    setIsSpotPopupOpen(false);
  };

  // if (!selectedParkingId) return null; // Oculta el sidebar si no hay parking seleccionado

  return (
    <motion.aside // Usar motion.aside
      variants={sidebarVariants} // Aplicar las variantes
      initial="hidden" // Estado inicial de la animación
      animate="visible" // Estado al que animar cuando aparece
      exit="hidden" // Estado al que animar cuando desaparece
      onAnimationComplete={(definition) => {
        if (definition === "visible" && typeof onAnimationComplete === 'function') {
          onAnimationComplete();
        }
      }}
      className="absolute top-0 left-0 h-full z-[1000]
                 w-full md:w-1/3 lg:w-1/4 
                 bg-slate-100 dark:bg-slate-900  
                 bg-opacity-90 dark:bg-opacity-90 
                 p-6 border-r border-slate-200 dark:border-slate-700 shadow-lg 
                 overflow-y-auto subtle-scrollbar" // Para scroll si el contenido es largo
    >
      {/* <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 dark:bg-slate-800 p-6 border-r border-slate-200 dark:border-slate-700 overflow-y-auto"> */}
      <div className="bg-transparent pt-2 pb-2 z-10">
        {/* <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
          {parkingDetails ? "Detalle del Parking" : "Buscar Parkings"}
        </h2> */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Introduce ubicación o nombre..."
          ref={searchInputRef} // Asignamos el ref al SearchBar
        />
      </div>

      {isLoading && (
        <p className="text-slate-600 dark:text-slate-400 mt-4">
          Cargando detalles...
        </p>
      )}
      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}

      {parkingDetails && !isLoading && !error && (
        <div className="mt-6 space-y-5">
          {/* Imagen del Parking */}
          {!imageError && imageUrl && (
            <img
              src={imageUrl}
              alt={`Imagen de ${parkingDetails.name}`}
              className="w-full h-auto max-h-48 object-cover rounded-lg mb-4 shadow-lg border border-slate-200 dark:border-slate-700"
              onError={handleImageError}
            />
          )}
          {imageError && (
            <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center rounded-lg mb-4 text-slate-500 dark:text-slate-400 text-sm shadow">
              <FaBuilding className="w-10 h-10 mb-2 text-slate-400 dark:text-slate-500" />
              <span>Imagen no disponible</span>
            </div>
          )}

          {/* Nombre del Parking */}
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 text-left">
            {parkingDetails.name}
          </h3>

          {/* Detalles del Parking */}
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
              <LiaMapMarkerSolid className="text-teal-500 dark:text-teal-400 mr-3 flex-shrink-0 h-5 w-5" />
              <div className="text-left">
                {/* <span className="font-semibold text-slate-800 dark:text-slate-100">Dirección:</span> */}
                <p>{parkingDetails.address}</p>
              </div>
            </div>            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
                <LiaLayerGroupSolid className="text-teal-500 dark:text-teal-400 mr-2 flex-shrink-0 h-5 w-5" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {parkingDetails.numLevels}
                  </span>
                  <span className="ml-1">Plantas</span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
                <LiaCarSideSolid className="text-teal-500 dark:text-teal-400 mr-2 flex-shrink-0 h-5 w-5" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {parkingDetails.totalSpots}
                  </span>
                  <span className="ml-1">Plazas Totales</span>
                </div>
              </div>
              
            </div>
            {/* bloque para mostrar el precio */}
            {parkingDetails.price !== undefined && (
              <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
                <LiaEuroSignSolid className="text-teal-500 dark:text-teal-400 mr-3 flex-shrink-0 h-5 w-5" />
                <div className="text-left">
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    Precio:{" "}
                  </span>
                  {parkingDetails.price.toFixed(2)} €/hora
                </div>
              </div>
            )}
          </div>

          <h4 className="text-lg font-semibold mt-6 mb-3 border-t border-slate-200 dark:border-slate-700 pt-4 text-left text-slate-800 dark:text-slate-100">
            Disponibilidad por Planta
          </h4>
          {parkingDetails.levelsInfo && parkingDetails.levelsInfo.length > 0 ? (
            <ul className="space-y-3">
              {parkingDetails.levelsInfo.map((level) => {
                const colorClass = getAvailabilityColor(
                  level.spotsFree,
                  level.spotsTotal
                );
                const IconComponent = getAvailabilityIcon(
                  level.spotsFree,
                  level.spotsTotal
                );

                // Calcula el porcentaje para la barra de progreso
                const percentageFull =
                  level.spotsTotal > 0
                    ? Math.round(
                        100 - (level.spotsFree / level.spotsTotal) * 100
                      )
                    : 0;

                return (
                  <li
                    key={level.levelId || level.levelName}
                    onClick={() => handlePlantClick(level)} // Implementaremos esto después
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${colorClass} flex flex-col`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        {React.cloneElement(IconComponent, {
                          className: "mr-2 flex-shrink-0 h-5 w-5",
                        })}
                        <span className="font-semibold text-md">
                          {level.levelName}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {level.spotsFree} / {level.spotsTotal} libres
                      </span>
                    </div>
                    {/* Barra de progreso */}
                    <div className="w-full bg-white/30 dark:bg-black/30 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          percentageFull >= 98
                            ? "bg-red-300"
                            : percentageFull > 75
                            ? "bg-orange-300"
                            : percentageFull > 40
                            ? "bg-yellow-300"
                            : "bg-green-300"
                        }`}
                        style={{ width: `${percentageFull}%` }}
                      ></div>
                    </div>
                    <span className="block text-xs font-bold mt-1">
                      {percentageFull}% OCUPADO
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-left text-slate-500 dark:text-slate-400">
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

      {/* {!parkingDetails && !isLoading && !error && (
        <div className="text-center mt-10 text-slate-500 dark:text-slate-400">
          <p>Selecciona un parking en el mapa para ver sus detalles.</p>
        </div>
      )} */}

      {/* Renderizar el Popup */}
      <SpotMatrixPopup
        isOpen={isSpotPopupOpen}
        onClose={closeSpotPopup}
        levelData={currentLevelDataForPopup}
        parkingName={currentParkingNameForPopup}
        levelName={currentLevelDataForPopup?.levelName}
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        } // Pasar el tema actual
      />
    </motion.aside>
  );
};

export default Sidebar;
