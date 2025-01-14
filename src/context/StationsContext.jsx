import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"

export const StationsContext = createContext();

export const StationsProvider = ({ children }) => {
  console.log('stations provide')
  const [stations, setStations] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Fetch stations on load
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await api.get("vehicles/list_locations/");
        setStations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch stations", error);
      }
    };

    fetchStations();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <StationsContext.Provider value={{ stations, setStations }}>
      {children}
    </StationsContext.Provider>
  );
};
