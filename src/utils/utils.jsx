import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaClock, FaParking } from 'react-icons/fa';
import { LiaInfoCircleSolid, LiaExclamationTriangleSolid, LiaClockSolid, LiaParkingSolid, LiaCheckCircleSolid    } from "react-icons/lia";

export const getAvailabilityColor = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return 'text-slate-500 dark:text-slate-400'; // Sin plazas o datos
  const percentageFree = (spotsFree / spotsTotal) * 100;
  const percentageFull = 100 - ((spotsFree / spotsTotal) * 100);

  if (percentageFree <= 2) return 'border border-red-500/50 bg-red-600 hover:bg-red-700 dark:bg-red-600/30 dark:hover:bg-red-700 text-slate-100'; // Rojo para ninguna plaza libre
  if (percentageFree < 25) return 'border border-orange-500/50 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600/30 dark:hover:bg-orange-700 text-slate-100'; // Naranja para pocas plazas
  if (percentageFree < 60) return 'border border-yellow-500/50 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600/30 dark:hover:bg-yellow-700 text-slate-100'; // Amarillo para disponibilidad media
  return 'border border-green-500/50 bg-green-600 hover:bg-green-700 dark:bg-green-600/30 dark:hover:bg-green-700 text-slate-100'; // Verde para alta disponibilidad
};

export const getAvailabilityIcon = (spotsFree, spotsTotal) => {
  if (spotsTotal === 0) return <LiaInfoCircleSolid className="mr-2 flex-shrink-0 h-5 w-5" />;
  const percentageFree = (spotsFree / spotsTotal) * 100;

  if (percentageFree <= 2) return <LiaExclamationTriangleSolid className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 25) return <LiaClockSolid className="mr-2 flex-shrink-0 h-5 w-5" />;
  if (percentageFree < 60) return <LiaParkingSolid className="mr-2 flex-shrink-0 h-5 w-5" />;
  return <LiaCheckCircleSolid className="mr-2 flex-shrink-0 h-5 w-5" />;
};