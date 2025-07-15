import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../ui/Searchbar";
import SpotMatrixPopup from "../parking/SpotMatrixPopup";
import {
  FaBuilding,
} from "react-icons/fa";
import {
  LiaMapMarkerSolid,
  LiaCarSideSolid,
  LiaLayerGroupSolid,
  LiaArrowLeftSolid,
  LiaMoneyBillWaveAltSolid,
} from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAvailabilityColor,
  getAvailabilityIcon,
} from "../../utils/utils.jsx";

const Sidebar = ({
  selectedParkingId,
  parkingDetails, // Recibe los detalles del parking ya cargados
  isLoading, // Recibe el estado de carga
  error, // Recibe el estado de error
  searchInputRef,
  onAnimationComplete,
  getSpotsForLevel, // Recibe la función para obtener plazas por nivel
  parkings, // recibir la lista de parkings
  onParkingSelect, // manejar la selección
  onSearch,
  searchResults,
  isSearching,
  searchTerm, // Término de búsqueda actual
  onClearSelection, // Función para limpiar la selección
  cameFromSearch,
}) => {
  // Para traducción
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  // Para el Popup de la matriz de plazas
  const [isSpotPopupOpen, setIsSpotPopupOpen] = useState(false);
  const [currentLevelDataForPopup, setCurrentLevelDataForPopup] =
    useState(null);
  const [currentParkingNameForPopup, setCurrentParkingNameForPopup] =
    useState("");
  const [activeLevelIdentifier, setActiveLevelIdentifier] = useState(null);

  // --- SINCRONIZACIÓN Y DEBOUNCING DE LA BÚSQUEDA ---
  // Estado local para el valor del input del buscador
  const [localInputValue, setLocalInputValue] = useState("");

  // Sincroniza el input con el término de búsqueda del hook.
  // Esto asegura que si volvemos atrás, el input muestre la búsqueda anterior.
  useEffect(() => {
    setLocalInputValue(searchTerm);
  }, [searchTerm]);

  // Efecto para realizar la búsqueda con debounce.
  useEffect(() => {
    const handler = setTimeout(() => {
      // Solo busca si el valor del input es diferente al término ya buscado.
      // Esto evita búsquedas redundantes al navegar atrás.
      if (localInputValue !== searchTerm) {
        onSearch(localInputValue);
      }
    }, 500); // debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localInputValue, searchTerm, onSearch]);

  const handleSearchChange = (e) => {
    setLocalInputValue(e.target.value);
  };
  // --- FIN DE LÓGICA DE BÚSQUEDA ---

  const handlePlantClick = useCallback(
    async (levelInfo) => {
      if (!parkingDetails) return;

      setCurrentParkingNameForPopup(parkingDetails.name); // Guardar nombre del parking para el popup
      setActiveLevelIdentifier(levelInfo.levelId || levelInfo.levelName);

      try {
        // Llama a la función getSpotsForLevel recibida por props
        const spotsData = await getSpotsForLevel(
          parkingDetails.id,
          levelInfo.levelId || levelInfo.levelName
        );

        setCurrentLevelDataForPopup({
          levelName: levelInfo.levelName,
          spotsTotal: levelInfo.spotsTotal,
          spotsFree: levelInfo.spotsFree,
          spotsList: spotsData.spots,
        });
        setIsSpotPopupOpen(true);
      } catch (err) {
        console.error("Error fetching spots for level:", err);

        // setError("No se pudieron cargar las plazas de la planta.");
      }
    },
    [parkingDetails, getSpotsForLevel]
  );

  // --- useEffect para actualizar la matriz de plazas si el popup está abierto y los parkingDetails cambian
  useEffect(() => {
    if (isSpotPopupOpen && parkingDetails && activeLevelIdentifier) {
      const updatePopupSpots = async () => {
        try {
          const spotsData = await getSpotsForLevel(
            parkingDetails.id,
            activeLevelIdentifier
          );
          // Encuentra el levelInfo más reciente de los parkingDetails actualizados
          const latestLevelInfo = parkingDetails.levelsInfo?.find(
            (level) =>
              (level.levelId || level.levelName) === activeLevelIdentifier
          );

          if (latestLevelInfo) {
            setCurrentLevelDataForPopup({
              levelName: latestLevelInfo.levelName,
              spotsTotal: latestLevelInfo.spotsTotal,
              spotsFree: latestLevelInfo.spotsFree,
              spotsList: spotsData.spots, // Actualiza solo la lista de spots
            });
          }
        } catch (err) {
          console.error("Error updating popup spots:", err);
        }
      };
      updatePopupSpots();
    }
  }, [
    isSpotPopupOpen,
    parkingDetails,
    activeLevelIdentifier,
    getSpotsForLevel,
  ]);

  useEffect(() => {
    // Si parkingDetails cambia a null (por ejemplo, al no haber un parking seleccionado)
    // o si hay un error al cargar, reseteamos el estado de imagen.
    if (!parkingDetails || error) {
      setImageError(false);
    }
  }, [parkingDetails, error]);

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
        if (
          definition === "visible" &&
          typeof onAnimationComplete === "function"
        ) {
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
      <div className="bg-transparent pt-2 pb-2 z-10 flex items-center gap-2">
        <AnimatePresence>
          {parkingDetails && (
            <motion.button
              key="back-to-results"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={onClearSelection}
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              title={t("Volver a los resultados")}
              aria-label={t("Volver a los resultados")}
            >
              <LiaArrowLeftSolid className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            initial={false}
            animate={{
              marginLeft: cameFromSearch && parkingDetails ? 0 : 0,
              x: cameFromSearch && parkingDetails ? 0 : 0,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex-1"
          >
            <SearchBar
              ref={searchInputRef}
              placeholder={t("Introduce ubicación o nombre...")}
              value={localInputValue}
              onChange={handleSearchChange}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- LÓGICA DE VISUALIZACIÓN --- */}
      {/* Muestra "Cargando..." mientras se busca */}
      {isSearching && (
        <p className="text-slate-600 dark:text-slate-400 mt-4">Buscando...</p>
      )}

      {/* Muestra los resultados si hay un término de búsqueda válido y no se está cargando */}
      {searchTerm.length >= 3 && !isSearching && !parkingDetails && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 text-left border-b border-slate-200 dark:border-slate-700 pb-2">
            {searchResults.length > 0
              ? "Resultados de la Búsqueda"
              : "Sin Resultados"}
          </h3>
          {searchResults.length > 0 ? (
            <ul className="space-y-3">
              {searchResults.map((parking) => (
                <li
                  key={parking.id}
                  onClick={() => onParkingSelect(parking.id, true)}
                  className="p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 hover:shadow-lg transform hover:-translate-y-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col text-left">
                    <h4 className="font-semibold text-md text-teal-600 dark:text-teal-400 mb-2">
                      {parking.name}
                    </h4>
                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <p className="flex items-start">
                        <LiaMapMarkerSolid className="mr-2 mt-0.5 flex-shrink-0 h-4 w-4" />
                        <span>{parking.address}</span>
                      </p>
                      <p className="flex items-center">
                        <LiaCarSideSolid className="mr-2 flex-shrink-0 h-4 w-4" />
                        <span>
                          {t("{{total}} Plazas Totales", {
                            total: parking.totalSpots,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              No se encuentra información. Busca nuevamente.
            </p>
          )}
        </div>
      )}

      {/* Muestra los detalles del parking si hay uno seleccionado */}
      {parkingDetails && !isLoading && !error && (
        <div className="w-full">
          <div className="mt-6 space-y-5">
            {/* Imagen del Parking */}
            {!imageError && imageUrl && (
              <img
                src={imageUrl}
                alt={t("Imagen de {{name}}", { name: parkingDetails.name })}
                className="w-full h-auto max-h-48 object-cover rounded-lg mb-4 shadow-lg border border-slate-200 dark:border-slate-700"
                onError={handleImageError}
              />
            )}
            {imageError && (
              <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center rounded-lg mb-4 text-slate-500 dark:text-slate-400 text-sm shadow">
                <FaBuilding className="w-10 h-10 mb-2 text-slate-400 dark:text-slate-500" />
                <span>{t("Imagen no disponible")}</span>
              </div>
            )}

            {/* Nombre del Parking */}
            <h3 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100 mb-3 pb-2 text-left border-b border-slate-200 dark:border-slate-700">
              {parkingDetails.name}
            </h3>

            {/* Detalles del Parking */}
            <div className="space-y-3 text-xs tracking-wide text-slate-700 dark:text-slate-300">
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
                    <span className="ml-1">{t("Plantas")}</span>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
                  <LiaCarSideSolid className="text-teal-500 dark:text-teal-400 mr-2 flex-shrink-0 h-5 w-5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {parkingDetails.totalSpots}
                    </span>
                    <span className="ml-1">{t("Plazas Totales")}</span>
                  </div>
                </div>
              </div>
              {/* bloque para mostrar el precio */}
              {parkingDetails.price !== undefined && (
                <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm">
                  <LiaMoneyBillWaveAltSolid className="text-teal-500 dark:text-teal-400 mr-3 flex-shrink-0 h-5 w-5" />
                  <div className="text-left">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {t("Precio")}:{" "}
                    </span>
                    {t("{{price}} €/hour", {
                      price: parkingDetails.price.toFixed(2),
                    })}
                  </div>
                </div>
              )}
            </div>

            <h4 className="text-base font-semibold mt-6 mb-3 border-t border-slate-200 dark:border-slate-700 pt-4 text-left text-slate-800 dark:text-slate-100">
              {t("Disponibilidad por Planta")}
            </h4>
            {parkingDetails.levelsInfo &&
            parkingDetails.levelsInfo.length > 0 ? (
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
                      onClick={() => handlePlantClick(level)}
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
                          {t("{{free}} / {{total}} libres", {
                            free: level.spotsFree,
                            total: level.spotsTotal,
                          })}
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
                      <span className="block text-xs font-semibold tracking-wider mt-1">
                        {t("{{percentage}}% OCUPADO", {
                          percentage: percentageFull,
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("No hay información de niveles disponible.")}
              </p>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <p className="text-slate-600 dark:text-slate-400 mt-4">
          {t("Cargando detalles...")}
        </p>
      )}
      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
      {/* {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>} */}

      {/* Muestra la lista general de parkings si no hay búsqueda ni parking seleccionado */}
      {!parkingDetails && !isLoading && !error && searchTerm.length < 3 && (
        // <p className="text-slate-500 dark:text-slate-400 mt-4">
        //   {t(
        //     "Selecciona un parking en el mapa para ver sus detalles, o utiliza la barra de búsqueda."
        //   )}
        // </p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 text-left border-b border-slate-200 dark:border-slate-700 pb-2">
            {t("Parkings Disponibles")}
          </h3>
          <ul className="space-y-3">
            {parkings.map((parking) => (
              <li
                key={parking.id}
                onClick={() => onParkingSelect(parking.id)}
                className="p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 hover:shadow-lg transform hover:-translate-y-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col text-left">
                  <h4 className="font-semibold text-md text-teal-600 dark:text-teal-400 mb-2">
                    {parking.name}
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="flex items-start">
                      <LiaMapMarkerSolid className="mr-2 mt-0.5 flex-shrink-0 h-4 w-4" />
                      <span>{parking.address}</span>
                    </p>
                    <p className="flex items-center">
                      <LiaCarSideSolid className="mr-2 flex-shrink-0 h-4 w-4" />
                      <span>
                        {t("{{total}} Plazas Totales", {
                          total: parking.totalSpots,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

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
