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
    price: 1.5,
    levelsInfo: [
      {
        levelName: "Planta -1",
        levelId: -1,
        spotsTotal: 100,
        spotsFree: Math.floor(Math.random() * 100) + 1,
      },
      {
        levelName: "Planta -2",
        levelId: -2,
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
    price: 0.85,
    levelsInfo: [
      {
        levelName: "Planta 0",
        levelId: 0,
        spotsTotal: 70,
        spotsFree: Math.floor(Math.random() * 70) + 1,
      },
      {
        levelName: "Planta 1",
        levelId: 1,
        spotsTotal: 70,
        spotsFree: Math.floor(Math.random() * 70) + 1,
      },
      {
        levelName: "Planta 2",
        levelId: 2,
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
    price: 1.2,
    levelsInfo: [
      {
        levelName: "Planta 0",
        levelId: 0,
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
      {
        levelName: "Planta -1",
        levelId: 1,
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
      {
        levelName: "Planta -2",
        levelId: 2,
        spotsTotal: 30,
        spotsFree: Math.floor(Math.random() * 30) + 1,
      },
    ],
  },
];

// Helper para fallback
const fallbackOnError = async (fn, fallback) => {
  try {
    return await fn();
  } catch (e) {
    console.warn("Fallo la API, usando datos de prueba:", e);
    return fallback();
  }
};

export const getAllParkings = async () => {
  return fallbackOnError(
    async () => {
      const response = await fetch(`${API_BASE_URL}/parkings`);
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      // Ajusta el mapeo si la API devuelve otros nombres
      return data.map((p) => ({
        id: p.id,
        name: p.name,
        address: p.address,
        latitude: p.coordinates.latitude,
        longitude: p.coordinates.longitude,
        totalSpots: p.totalSpots,
        numLevels: p.levels,
        price: p.price,
      }));
    },
    () =>
      bilbaoParkingsData.map((p) => ({
        id: p.id,
        name: p.name,
        address: p.address,
        latitude: p.coordinates.latitude,
        longitude: p.coordinates.longitude,
        totalSpots: p.totalSpots,
        numLevels: p.numLevels,
        price: p.price,
      }))
  );
};

export const getParkingDetailsFake = async (parkingId) => {
  console.log(
    `Fetching details for parking ${parkingId} (simulated from ParkingService)`
  );
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const parking = bilbaoParkingsData.find((p) => p.id === parkingId);
      if (parking) {
        // Podrías re-simular los `spotsFree` aquí si quieres que cambien cada vez que se abre el detalle
        const detailedParking = {
          ...parking,
          levelsInfo: parking.levelsInfo.map((level) => ({
            ...level,
            // spotsFree: Math.floor(Math.random() * level.spotsTotal) + 1 // Descomenta para re-simular
          })),
        };
        resolve(detailedParking);
      } else {
        reject(new Error("Parking not found"));
      }
    }, 0)
  ); // Simula un pequeño retardo de red
};

export const getParkingDetails = async (parkingId) => {
  console.log(`Fetching details for parking ${parkingId} from API`);
  try {
    const response = await fetch(`${API_BASE_URL}/parkings/${parkingId}`);
    if (!response.ok) {
      // Si la respuesta no es OK (ej. 404 Not Found, 500 Internal Server Error)
      if (response.status === 404) {
        throw new Error(`Parking con ID ${parkingId} no encontrado.`);
      } else {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
    }
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      address: data.address,
      latitude: data.coordinates.latitude, 
      longitude: data.coordinates.longitude,
      numLevels: data.levels, // La API devuelve 'levels'
      totalSpots: data.totalSpots,
      price: data.price,
      levelsInfo: data.levelsInfo
        ? data.levelsInfo.map((level) => ({
            levelId: level.levelId,
            levelName: level.levelName,
            spotsTotal: level.spotsTotal,
            spotsFree: level.spotsFree,
          }))
        : [],
    };
  } catch (error) {
    console.error(`Error fetching parking details for ID ${parkingId}:`, error);
    // Fallback a datos simulados
    const parking = bilbaoParkingsData.find((p) => p.id === parkingId);
    if (parking) {
      return {
        id: parking.id,
        name: parking.name,
        address: parking.address,
        latitude: parking.coordinates.latitude,
        longitude: parking.coordinates.longitude,
        numLevels: parking.numLevels,
        totalSpots: parking.totalSpots,
        price: parking.price,
        levelsInfo: parking.levelsInfo
          ? parking.levelsInfo.map((level) => ({
              levelId: level.levelId,
              levelName: level.levelName,
              spotsTotal: level.spotsTotal,
              spotsFree: level.spotsFree,
            }))
          : [],
      };
    } else {
      throw new Error(
        `Parking con ID ${parkingId} no encontrado en datos de prueba.`
      );
    }
  }
};

// Endpoint para actualizar el estado de una plaza
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

export const getParkingSpotsForLevel = async (parkingId, levelIdentifier) => {
  console.log(
    `Fetching spots for parking ${parkingId}, level ${levelIdentifier} from API`
  );
  try {
    // Construye la URL del endpoint correctamente
    const response = await fetch(
      `${API_BASE_URL}/parkings/${parkingId}/spots?level=${levelIdentifier}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Spots for parking ${parkingId} and level ${levelIdentifier} not found.`
        );
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json(); // La API devuelve un array directamente // La función que llama (Sidebar.jsx) espera un objeto con la propiedad 'spots'. // Tu API devuelve un array directamente, así que lo envolvemos.

    return {
      spots: data.map((spot) => ({
        id: spot.id,
        spotNumber: spot.spotNumber.toString(), // Asegúrate de que spotNumber sea string si es necesario en frontend
        occupied: spot.occupied,
        level: spot.level,
      })),
    };
  } catch (error) {
    console.error(
      `Error fetching spots for parking ${parkingId}, level ${levelIdentifier}:`,
      error
    ); // Implementa un fallback a datos simulados
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const parking = bilbaoParkingsData.find((p) => p.id === parkingId);
        if (!parking) {
          return reject(
            new Error("Parking not found for spot simulation (fallback)")
          );
        }
        const levelInfo = parking.levelsInfo.find(
          (l) =>
            l.levelId === levelIdentifier || l.levelName === levelIdentifier
        );
        if (!levelInfo) {
          return reject(
            new Error("Level not found for spot simulation (fallback)")
          );
        }

        const simulatedSpots = Array.from(
          { length: levelInfo.spotsTotal },
          (_, i) => ({
            id: `${levelIdentifier}_spot_${i + 1}`,
            spotNumber: (i + 1).toString(),
            occupied: i < levelInfo.spotsTotal - levelInfo.spotsFree,
            level: levelIdentifier,
          })
        );
        resolve({ spots: simulatedSpots });
      }, 300);
    });
  }
};
