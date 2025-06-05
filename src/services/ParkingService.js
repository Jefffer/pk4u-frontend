const API_BASE_URL = "http://localhost:8080/api/v1";

const bilbaoParkingsData = [
  {
    id: "p1",
    name: "Centro Comercial Zubiarte",
    address: "Leizaola Lehendakariaren Kalea, 2, Abando, 48011 Bilbao, Bizkaia",
    coordinates: {
      latitude: 43.26783598009229,
      longitude: -2.9402014500976663,
    },
    numLevels: 2,
    totalSpots: 200, // 100 plazas/planta * 2 plantas
    levelsInfo: [
      {
        levelName: "Planta -1",
        levelId: "zub_p-1",
        spotsTotal: 100,
        spotsFree: Math.floor(Math.random() * 100) + 1,
      },
      {
        levelName: "Planta -2",
        levelId: "zub_p-2",
        spotsTotal: 100,
        spotsFree: Math.floor(Math.random() * 100) + 1,
      },
    ],
  },
  {
    id: "p2",
    name: "Parking Low Cost Garaje Centro Bilbao",
    address: "Zankoeta Kalea, 5, Basurtu-Zorrotza, 48013 Bilbao, Bizkaia",
    coordinates: {
      latitude: 43.25845716817154, 
      longitude: -2.9472678770983896,
    },
    numLevels: 3,
    totalSpots: 210, // 70 plazas/planta * 3 plantas
    levelsInfo: [
      {
        levelName: "Planta 0",
        levelId: "lc_p0",
        spotsTotal: 70,
        spotsFree: Math.floor(Math.random() * 70) + 1,
      },
      {
        levelName: "Planta 1",
        levelId: "lc_p1",
        spotsTotal: 70,
        spotsFree: Math.floor(Math.random() * 70) + 1,
      },
      {
        levelName: "Planta 2",
        levelId: "lc_p2",
        spotsTotal: 70,
        spotsFree: Math.floor(Math.random() * 70) + 1,
      },
    ],
  },
  {
    id: "p3",
    name: "Parking PARKIA - Arenal. Bilbao",
    address: "Areatzako Pasealekua, 1, Ibaiondo, 48005 Bilbao, Bizkaia",
    coordinates: { latitude: 43.26264474357679, longitude: -2.922281107878985 },
    numLevels: 3,
    totalSpots: 90, // 30 plazas/planta * 3 plantas
    levelsInfo: [
      {
        levelName: "Planta 0",
        levelId: "parkia_p0",
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
      {
        levelName: "Planta -1",
        levelId: "parkia_p-1",
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
      {
        levelName: "Planta -2",
        levelId: "parkia_p-2",
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
    ],
  },
];

export const getAllParkings = async () => {
  // Ejemplo de datos simulados
  // Reemplazar con fetch(`${API_BASE_URL}/parkings`) cuando el backend esté listo
  // console.log("Fetching all parkings (simulated)");
  console.log("Fetching all Bilbao parkings (simulated from ParkingService)");
  return new Promise(resolve => setTimeout(() => resolve(
    bilbaoParkingsData.map(p => ({
      id: p.id,
      name: p.name,
      address: p.address, // Añadido por si es útil en el popup o en la lista
      latitude: p.coordinates.latitude,
      longitude: p.coordinates.longitude,
      totalSpots: p.totalSpots,
      numLevels: p.numLevels,
    }))
  ), 0)); // Simula un pequeño retardo de red
};

export const getParkingDetails = async (parkingId) => {
  console.log(`Fetching details for parking ${parkingId} (simulated from ParkingService)`);
  return new Promise((resolve, reject) => setTimeout(() => {
    const parking = bilbaoParkingsData.find(p => p.id === parkingId);
    if (parking) {
      // Podrías re-simular los `spotsFree` aquí si quieres que cambien cada vez que se abre el detalle
      const detailedParking = {
        ...parking,
        levelsInfo: parking.levelsInfo.map(level => ({
            ...level,
            // spotsFree: Math.floor(Math.random() * level.spotsTotal) + 1 // Descomenta para re-simular
        }))
      };
      resolve(detailedParking);
    } else {
      reject(new Error('Parking not found'));
    }
  }, 0)); // Simula un pequeño retardo de red
};

// Endpoint para actualizar el estado de una plaza (simulado por el backend en el TFM)
// El frontend lo consumiría para obtener el estado, no para actualizarlo directamente por el usuario.
// Esta función es más para ilustrar la interacción con los datos que vendrían del backend.
export const getSpotStatus = async (spotId) => {
  // En una implementación real, esto podría ser parte de getParkingDetails o un endpoint específico si fuera necesario.
  // El RF-010 "Provisión de Estado de Ocupación Dinámico de Parking" y RNF-001 "Actualización Automática y Periódica en Frontend"
  // implican que el frontend consultará periódicamente el estado.
  console.log(`Fetching status for spot ${spotId} (simulated)`);
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ id: spotId, occupied: Math.random() > 0.5 }),
      200
    )
  );
};
