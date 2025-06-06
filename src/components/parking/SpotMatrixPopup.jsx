// src/components/ui/SpotMatrixPopup.jsx
import React, { useEffect, useRef } from 'react';
import { FaTimes, FaCar, FaRegCircle, FaTimesCircle } from "react-icons/fa";
import { CiParking1 } from "react-icons/ci";
import { TbParkingCircleFilled } from "react-icons/tb";

const SpotMatrixPopup = ({
  isOpen,
  onClose,
  levelData,
  parkingName,
  levelName,
  theme,
}) => {
    const popupContentRef = useRef(null); // Referencia al contenido del modal

  if (!isOpen || !levelData) return null;

  // Manejador para cerrar al hacer clic fuera
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Asumimos que levelData.spots es un array de objetos:
  // [{ spotNumber: 'A1', occupied: true }, { spotNumber: 'A2', occupied: false }, ...]
  // O si solo tienes el número total y las ocupadas, necesitarás generarlos o adaptar la lógica.
  // Por ahora, basémonos en la estructura que mencionaste: "mostrará 30 unidades junto con su respectivo numero de plaza"
  // y que "vendrá desde base de datos a través del API, la información especifica de cada plaza".

  // Ejemplo de cómo podrías estructurar 'spots' si recibes todos los detalles:
  // const spots = levelData.spots || []; // Asegúrate que esto venga del API

  // Si solo tienes spotsTotal y spotsFree (como en Sidebar), y necesitas mostrar cada plaza individualmente:
  // Esta parte es CRUCIAL y depende de cómo tu API entregue los datos de CADA PLAZA.
  // Si tu API en GET /parkings/{id}/spots (Figura 5) devuelve un array de plazas con su estado,
  // entonces `levelData.spots` debería ser ese array filtrado por la planta actual.

  // *** Placeholder: Necesitarás obtener los datos de cada plaza para esta planta ***
  // Esto es una simulación si tu API no da el detalle plaza por plaza aún.
  // Idealmente, tu API debería dar algo como:
  // levelData = { levelName: "Planta -1", spots: [{id: "s1", spotNumber: 1, occupied: true}, {id: "s2", spotNumber: 2, occupied: false}, ...] }

  const spots =
    levelData.spotsList ||
    Array.from({ length: levelData.spotsTotal || 0 }, (_, i) => ({
      spotNumber: i + 1,
      // Simulación de ocupación si no viene del API por plaza
      occupied: i < levelData.spotsTotal - levelData.spotsFree,
    }));

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[1200] p-4 transition-opacity duration-300 ease-in-out
                  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  bg-slate-900/20 dark:bg-black/20 backdrop-blur-sm`} onClick={handleClickOutside}>
      <div
      ref={popupContentRef}
      // El evento onClick aquí evitará que los clics DENTRO del modal propaguen al overlay y cierren el modal
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100/80 dark:bg-slate-900/80 p-6 rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl transform transition-all duration-300 ease-in-out ${theme} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Cabecera del Popup */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-teal-600 dark:text-teal-400">
              {parkingName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {levelName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Cerrar popup"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Matriz de Plazas */}
        {spots.length > 0 ? (
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[60vh] overflow-y-auto subtle-scrollbar pr-2">
            {spots.map((spot, index) => (
              <div
                key={spot.id || index} // Usar spot.id si está disponible
                title={`Plaza ${spot.spotNumber}: ${
                  spot.occupied ? "Ocupada" : "Libre"
                }`}
                className={`p-2 aspect-square rounded-md flex flex-col items-center justify-center transition-all duration-200 ease-in-out
                            ${
                              spot.occupied
                                ? "bg-rose-500 dark:bg-rose-700/80 text-white dark:text-rose-200 shadow-md"
                                : "bg-teal-500 dark:bg-teal-600/80 text-white dark:text-teal-100 shadow-md hover:bg-teal-600 dark:hover:bg-teal-700"
                            }
                            border ${
                              spot.occupied
                                ? "border-rose-600 dark:border-rose-600"
                                : "border-teal-600 dark:border-teal-600"
                            }`}
              >
                {spot.occupied ? (
                  <FaCar className="w-5 h-5 md:w-6 md:h-6 mb-0.5 opacity-90" />
                ) : (
                  <TbParkingCircleFilled className="w-5 h-5 md:w-6 md:h-6 mb-0.5 opacity-90" /> // Icono para libre
                )}
                <span className="text-xs md:text-sm font-medium block truncate">
                  {spot.spotNumber}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            No hay información de plazas disponible para esta planta.
          </p>
        )}

        {/* Pie del Popup */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-transparent hover:bg-slate-300 dark:hover:bg-slate-700 text-black dark:text-white rounded-lg transition-colors focus:outline-none"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotMatrixPopup;
