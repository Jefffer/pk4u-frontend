  const API_BASE_URL = 'http://localhost:8080/api/v1';

  export const getAllParkings = async () => {
    // Ejemplo de datos simulados
    // Reemplazar con fetch(`${API_BASE_URL}/parkings`) cuando el backend esté listo
    console.log("Fetching all parkings (simulated)");
    return new Promise(resolve => setTimeout(() => resolve([
      { id: 'p1', name: 'Parking Plaza Mayor', latitude: 40.4155, longitude: -3.7074, levels: 3, spots: [] },
      { id: 'p2', name: 'Parking Centro Comercial', latitude: 40.4170, longitude: -3.7030, levels: 2, spots: [] },
    ]), 500));
  };

  export const getParkingDetails = async (parkingId) => {
    // Ejemplo de datos simulados
    // Reemplazar con fetch(`<span class="math-inline">\{API\_BASE\_URL\}/parkings/</span>{parkingId}`) y fetch(`<span class="math-inline">\{API\_BASE\_URL\}/parkings/</span>{parkingId}/spots`)
    console.log(`Fetching details for parking ${parkingId} (simulated)`);
    return new Promise(resolve => setTimeout(() => resolve(
      { 
        id: parkingId, 
        name: `Parking Detallado ${parkingId}`, 
        latitude: 40.4155, 
        longitude: -3.7074, 
        levels: 3,
        spots: [
          { id: 's1', spotNumber: 1, level: 0, occupied: true },
          { id: 's2', spotNumber: 2, level: 0, occupied: false },
          // ... más plazas
        ]
      }
    ), 500));
  };

  // Endpoint para actualizar el estado de una plaza (simulado por el backend en el TFM)
  // El frontend lo consumiría para obtener el estado, no para actualizarlo directamente por el usuario.
  // Esta función es más para ilustrar la interacción con los datos que vendrían del backend.
  export const getSpotStatus = async (spotId) => {
       // En una implementación real, esto podría ser parte de getParkingDetails o un endpoint específico si fuera necesario.
       // El RF-010 "Provisión de Estado de Ocupación Dinámico de Parking" y RNF-001 "Actualización Automática y Periódica en Frontend"
       // implican que el frontend consultará periódicamente el estado.
      console.log(`Fetching status for spot ${spotId} (simulated)`);
      return new Promise(resolve => setTimeout(() => resolve(
          { id: spotId, occupied: Math.random() > 0.5 }
      ), 200));
  };