import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaClock, FaParking } from 'react-icons/fa';

export const getAvailabilityColor = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return 'text-slate-500 dark:text-slate-400'; // Sin plazas o datos
  const percentageFree = (spotsFree / spotsTotal) * 100;
  const percentageFull = 100 - ((spotsFree / spotsTotal) * 100);

  if (percentageFree < 2) return 'border border-red-600 bg-red-600/30 hover:bg-red-700 text-white'; // Rojo para ninguna plaza libre
  if (percentageFree < 25) return 'border border-orange-600 bg-orange-600/30 hover:bg-orange-700 text-white'; // Naranja para pocas plazas
  if (percentageFree < 60) return 'border border-yellow-600 bg-yellow-600/30 hover:bg-yellow-700 text-white'; // Amarillo para disponibilidad media
  return 'border border-green-600 dark:bg-green-600/30 dark:hover:bg-green-700 text-white'; // Verde para alta disponibilidad
};

export const getAvailabilityIcon = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return <FaInfoCircle className="mr-2 flex-shrink-0 h-5 w-5" />;
  const percentageFree = (spotsFree / spotsTotal) * 100;

  if (percentageFree < 2) return <FaExclamationTriangle className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 25) return <FaClock className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 60) return <FaParking className="mr-2 flex-shrink-0 h-5 w-5" />;
  return <FaCheckCircle className="mr-2 flex-shrink-0 h-5 w-5" />;
};