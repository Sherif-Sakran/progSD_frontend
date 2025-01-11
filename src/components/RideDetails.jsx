import React, { useState, useEffect } from "react";
import api from "../services/api"; // Axios instance
import StationDropdown from "./StationDropdown";
import { useNavigate } from "react-router-dom";

const RideDetails = () => {
  const [rentals, setRentals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [destinationStations, setDestinationStations] = useState(null);
  const [selectedDestinationStation, setSelectedDestinationStation] = useState(null);

  const navigate = useNavigate();

  useEffect(()=> {
    const getRentals = async () =>{
        const response = await api.get("users/get_rental_list/");
        console.log(response.data);
        setRentals(response.data);
    }
    getRentals();
    setLoading(false);
    console.log("rentals: ", rentals)
  }, []);


    // Fetch stations on load
    useEffect(() => {
    const fetchDestinationStations = async () => {
        try {
        const response = await api.get("vehicles/list_locations/");
        setDestinationStations(response.data);
        console.log(response.data);
        } catch (error) {
        console.error("Failed to fetch stations", error);
        }
    };

    fetchDestinationStations();
    }, []);


    // Use useEffect to trigger when selectedDestinationStation changes
    useEffect(() => {
        if (selectedDestinationStation) {
        console.log("Selected Destination Station updated:", selectedDestinationStation);
        }
    }, [selectedDestinationStation]); // This runs when selectedDestinationStation changes
    

  const handleUpdateLocation = async (vehicleID) => {
    const requestBody = {
        "vehicle_id": vehicleID,
        "longitude": longitude,
        "latitude": latitude
    }
    try {
      console.log(requestBody)
      const response = await api.post('vehicles/update_vehicle_location/', requestBody);
    //   setLocation(response.data.location); // Update the location in state
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleEndRide = async (vehicle_id) => {
    if(!selectedDestinationStation){
        alert('Select a destination location');
        return;
    }
    const requestBody = {
        "vehicle_id": vehicle_id,
        "end_location_id": selectedDestinationStation
    }
    console.log("request body: ", requestBody);
    try {
      setLoading(true);
      const response = await api.post('vehicles/return_vehicle/', requestBody);
      console.log(response.data);
      navigate('/home');
      //   onEndRide(response.data); // Notify parent about ride completion
    } catch (error) {
        console.error("Error ending ride:", error);
    }finally{
    setLoading(false);
    }
  };

  const handleReportDefect = async (vehicle_id) => {
    const responseBody = {
        "vehicle_id": vehicle_id,
        "description": "The car produces so much noise"
    }
    try {
      const response = await api.post('vehicles/report_defective_vehicle/', responseBody);
      console.log(response.data);
      alert("Vehicle reported as defective.");
    } catch (error) {
      console.error("Error reporting defect:", error);
    }
  };
  const currentRentals = (rentals || []).filter(rental => rental.is_active===true).sort((a, b) => new Date(b.start_time) - new Date(a.start_time));;
  console.log("current rentals: ", currentRentals)
  const prevRentals = (rentals || []).filter(rental => rental.is_active===false).sort((a, b) => new Date(b.start_time) - new Date(a.start_time));;
  
  if (loading)
    return <p>loading</p>
  
  return (
      <>
    { currentRentals.length === 0? <h2>No current rentals</h2>:
    <div>
        <h2>Current Rental</h2>
        <p>
            <strong>Vehicle ID:</strong> {currentRentals[0].vehicle_id}
            <br />
            <strong>Start Location:</strong> {currentRentals[0].start_location}
            <br />
            <strong>Start Time:</strong> {new Date(currentRentals[0].start_time).toLocaleString()}
            <br />
        </p>
        <div>
        <label htmlFor="latitude">Update Current Latitude:</label>
        <input
          id="latitude"
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          />
        <label htmlFor="longitude">Update Current Longitude:</label>
        <input
          id="longitude"
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          />
        <button onClick={()=>handleUpdateLocation(currentRentals[0].vehicle_id)}>Update Location</button>
      </div>

      <div>
        <label htmlFor="destination">Select Destination Station:</label>
        <StationDropdown
          stations={destinationStations}
          selectedStation={selectedDestinationStation}
          setSelectedStation={setSelectedDestinationStation}
          />
      </div>
    
      <button onClick={()=>handleEndRide(currentRentals[0].vehicle_id)}>End Ride</button>
      <button onClick={()=>handleReportDefect(currentRentals[0].vehicle_id)}>Report Defect</button>


    </div>}
    { prevRentals &&
    <div>
      <h2>Rentals History</h2>
      {prevRentals.map((rental, index) => 
           <p key={index}>
            <strong>Vehicle ID:</strong> {rental.vehicle_id}
            <br />
            <strong>Type:</strong> {rental.vehicle_type}
            <br />
            <strong>Start Location:</strong> {rental.start_location}
            <br />
            <strong>Start Time:</strong> {new Date(rental.start_time).toLocaleString()}
            <br />
            <strong>End Time:</strong> {new Date(rental.end_time).toLocaleString()}
            <br />
            <strong>End Location:</strong> {rental.end_location}
            <br />
            <strong>Total Cost:</strong> ${rental.total_cost}
         </p>)}

    </div>
    }
  </>
  );
};

export default RideDetails;
