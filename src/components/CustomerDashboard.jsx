import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import StationDropdown from "./StationDropdown";
import VehicleFilter from "./VehicleTypeDropdown";
import VehicleTable from "./VehicleTable"
import StationsMap from "./StationsMap"
import RentalModal from "./RentalModal"

function CustomerDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [stations, setStations] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [vehicleType, setVehicleType] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // const handleListVehicles = async () => {
  //   console.log("List vehicles");
  //   const response = await api.get("vehicles/list_vehicles/");
  //   setVehicles(response.data);
  //   console.log(response.data);
  // };

  const filteredVehicles = vehicles?.filter(
    (vehicle) => vehicleType === "All" || vehicle.type === vehicleType
  );


  useEffect(()=> {
    console.log("type changed to: ", vehicleType)
  }, [vehicleType])


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
  }, []);



  // Fetch vehicles for the selected station
  useEffect(() => {
    if (selectedStation) {
      const fetchVehicles = async () => {
        try {
          const response = await api.get("vehicles/list_available_vehicles_at/", {
            params: {
              location_id: selectedStation
            }
          });
          setVehicles(response.data);
        } catch (error) {
          console.error("Failed to fetch vehicles", error);
        }
      };

      fetchVehicles();
    }
  }, [selectedStation]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/user_data/");
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);


  const handleRent = async (vehicleId) => {
    console.log(`Renting vehicle with ID: ${vehicleId}`);
    const response = await api.post("vehicles/rent_vehicle/", {
      "id": vehicleId
    });
    console.log(response.data);
  };
  


  return (
    <div>
      <h2>Customer Dashboard</h2>
      {userDetails ? (
        <>
          <p> { userDetails.message}</p>
          <p> Role: { userDetails.role}</p>
          {/* <button onClick={handleListVehicles} >List Vehicles</button> */}
          <StationDropdown
          stations={stations}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          />
          <VehicleFilter vehicleType={vehicleType} setVehicleType={setVehicleType} />

          {/* I may pass the vehicles to the Map to implement more functionalities later on */}
          <StationsMap stations={stations} />

          <VehicleTable vehicles={filteredVehicles} setSelectedVehicle={setSelectedVehicle} />
          <RentalModal selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  );
}

export default CustomerDashboard;
