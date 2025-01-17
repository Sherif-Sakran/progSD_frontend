import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import axios from "axios";
import StationDropdown from "../components/StationDropdown";
import VehicleFilter from "../components/VehicleTypeDropdown";
import VehicleTable from "../components/VehicleTable"
import StationsMap from "../components/StationsMap"
import RentalModal from "../components/RentalModal"
import RideDetails from "./CustomerRentals"
import {useNavigate} from "react-router-dom";
import { StationsContext } from "../context/StationsContext";

function CustomerDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [vehicleType, setVehicleType] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleRental, setVehicleRental] = useState(null);

  const { stations, setStations } = useContext(StationsContext);

  console.log('Rendering the customerDashboard component')
  const navigate = useNavigate();

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
    console.log("type changed to: ", vehicleType);
  }, [vehicleType])


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
        console.log('customer data: ', response.data)
        console.log('customer details: ', userDetails)
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);


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
          <RentalModal selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} setVehicleRental={setVehicleRental}/>
          {/* <RideDetails vehicleRental={vehicleRental} setVehicleRental={setVehicleRental} /> */}
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  );
}

export default CustomerDashboard;
