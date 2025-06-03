import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaClock, FaParking } from 'react-icons/fa';

export const getAvailabilityColor = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return 'text-slate-500 dark:text-slate-400'; // Sin plazas o datos
  const percentageFree = (spotsFree / spotsTotal) * 100;
  const percentageFull = 100 - ((spotsFree / spotsTotal) * 100);

  if (percentageFree === 0) return 'bg-red-500 hover:bg-red-600 text-white'; // Rojo para ninguna plaza libre
  if (percentageFree < 25) return 'bg-orange-500 hover:bg-orange-600 text-white'; // Naranja para pocas plazas
  if (percentageFree < 60) return 'bg-yellow-500 hover:bg-yellow-600 text-slate-800'; // Amarillo para disponibilidad media
  return 'bg-green-500 hover:bg-green-600 text-white'; // Verde para alta disponibilidad
};

export const getAvailabilityIcon = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return <FaInfoCircle className="mr-2 flex-shrink-0 h-5 w-5" />;
  const percentageFree = (spotsFree / spotsTotal) * 100;

  if (percentageFree === 0) return <FaExclamationTriangle className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 25) return <FaClock className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 60) return <FaParking className="mr-2 flex-shrink-0 h-5 w-5" />;
  return <FaCheckCircle className="mr-2 flex-shrink-0 h-5 w-5" />;
};