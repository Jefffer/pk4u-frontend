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

  // Efecto para la carga de datos inicial y la actualización periódica
  useEffect(() => {
    // Definimos la función de carga dentro del efecto para evitar "stale closures"
    const fetchData = async (showLoading = false) => {
      if (showLoading) {
        setIsLoading(true);
        setError(null);
      }
      try {
        // Obtenemos todos los parkings para mantener el mapa actualizado
        const allParkingsData = await getAllParkings();
        setParkings(allParkingsData);

        // Si hay un parking seleccionado, refrescamos sus detalles
        if (selectedParkingIdRef.current) {
          const details = await getParkingDetails(selectedParkingIdRef.current);
          setSelectedParkingDetails(details);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los datos de los parkings.");
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    };

    // Primera carga al montar el componente
    fetchData(true);

    // Intervalo para recargar los datos cada 10 segundos
    const intervalId = setInterval(() => fetchData(false), 10000);

    // Limpiamos el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Función para seleccionar un parking y cargar sus detalles
  const selectParking = useCallback(async (parkingId) => {
    selectedParkingIdRef.current = parkingId;
    if (parkingId) {
      setIsLoading(true);
      setError(null);
      try {
        const details = await getParkingDetails(parkingId);
        setSelectedParkingDetails(details);
      } catch (err) {
        console.error("Error fetching selected parking details:", err);
        setError("No se pudieron cargar los detalles del parking seleccionado.");
      } finally {
        setIsLoading(false); // Corregido el estado de loading
      }
    } else {
      setSelectedParkingDetails(null);
    }
  }, []);

  // Función para obtener las plazas de un nivel específico
  const getSpotsForLevel = useCallback(async (parkingId, levelIdentifier) => {
    try {
      return await getParkingSpotsForLevel(parkingId, levelIdentifier);
    } catch (err) {
      console.error("Error fetching spots for level:", err);
      throw err;
    }
  }, []);

  // Función para manejar la búsqueda de parkings
  const handleSearch = useCallback(async (query, clearSelectionCallback) => {
    setSearchTerm(query);

    if (query.length < 3) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    // Limpiamos la selección actual al iniciar una búsqueda
    setSelectedParkingDetails(null);
    if (clearSelectionCallback) {
      clearSelectionCallback(null);
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

  const clearSelectedParking = useCallback((callback) => {
    setSelectedParkingDetails(null);
    selectedParkingIdRef.current = null;
    if (callback) {
      callback(null);
    }
  }, []);

  return {
    parkings,
    selectedParkingDetails,
    isLoading, // Exportamos isLoadingInitial como isLoading
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
