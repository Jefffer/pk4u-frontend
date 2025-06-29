import { useState, useEffect, useRef, useCallback } from "react";
import {
  getAllParkings,
  getParkingDetails,
  getParkingSpotsForLevel,
  searchParkings,
} from "../services/ParkingService";

const useParkingData = (initialSelectedParkingId = null) => {
  const [parkings, setParkings] = useState([]);
  const [selectedParkingDetails, setSelectedParkingDetails] = useState(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedParkingIdRef = useRef(initialSelectedParkingId);
  const isInitialLoad = useRef(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Actualiza la referencia cuando initialSelectedParkingId cambia
  useEffect(() => {
    selectedParkingIdRef.current = initialSelectedParkingId;
  }, [initialSelectedParkingId]);

  const fetchData = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoadingInitial(true);
      setError(null);
    }

    try {
      const allParkingsData = await getAllParkings();
      setParkings(allParkingsData);

      if (selectedParkingIdRef.current) {
        // Solo actualizamos si hay un parking seleccionado
        const details = await getParkingDetails(selectedParkingIdRef.current);
        setSelectedParkingDetails(details);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("No se pudieron cargar los datos de los parkings.");
      // Si hay un error en una actualización en segundo plano, podríamos querer mantener los datos viejos
      // y solo mostrar el error de forma sutil, o loggearlo. Aquí, simplemente actualizamos el estado de error.
    } finally {
      if (showLoading) {
        // Solo oculta el loading si se mostró
        setIsLoadingInitial(false);
      }
      isInitialLoad.current = false; // Ya no es la carga inicial
    }
  }, []);

  useEffect(() => {
    // Primera carga al montar el componente
    fetchData(true);

    // Configurar el intervalo para recargar los datos cada 10 segundos
    const intervalId = setInterval(fetchData, 10000); // 10000 ms = 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [fetchData]); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Función para seleccionar un parking y cargar sus detalles (puede ser llamada desde MapView)
  const selectParking = useCallback(async (parkingId) => {
    selectedParkingIdRef.current = parkingId;
    if (parkingId) {
      setIsLoadingInitial(true); // Siempre muestra loading al seleccionar un nuevo parking
      setError(null);
      try {
        const details = await getParkingDetails(parkingId);
        setSelectedParkingDetails(details);
      } catch (err) {
        console.error("Error fetching selected parking details:", err);
        setError(
          "No se pudieron cargar los detalles del parking seleccionado."
        );
      } finally {
        setIsLoadingInitial(false);
      }
    } else {
      setSelectedParkingDetails(null);
    }
  }, []);

  // Función para obtener las plazas de un nivel específico (llamada desde Sidebar para el popup)
  const getSpotsForLevel = useCallback(async (parkingId, levelIdentifier) => {
    // No usamos setIsLoadingInitial aquí, ya que es para el popup, que gestiona su propio loading.
    // Podrías añadir un estado de loading específico para el popup si quieres un spinner dentro del modal.
    try {
      const spotsData = await getParkingSpotsForLevel(
        parkingId,
        levelIdentifier
      );
      return spotsData;
    } catch (err) {
      console.error("Error fetching spots for level:", err);
      // Aquí el error debe ser manejado por el componente que llama (Sidebar)
      throw err; // Re-lanza el error para que Sidebar lo capture
    }
  }, []);

  // Función para manejar la búsqueda de parkings
  const handleSearch = useCallback(async (query) => {
    setSearchTerm(query);
    setSelectedParkingDetails(null);

    if (query.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);
    try {
      const results = await searchParkings(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      setError("Error al realizar la búsqueda.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSelectedParking = (callback) => {
    setSelectedParkingDetails(null);
    selectedParkingIdRef.current = null;
    if (callback) {
      callback(null); // Ejecutar el callback
    }
  };

  return {
    parkings,
    selectedParkingDetails,
    isLoading: isLoadingInitial, // Exportamos isLoadingInitial como isLoading
    error,
    selectParking,
    getSpotsForLevel,
    handleSearch,
    searchResults,
    isSearching,
    searchTerm,
    clearSelectedParking,
  };
};

export default useParkingData;
