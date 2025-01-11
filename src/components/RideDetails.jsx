import React, { useState, useEffect } from "react";
import api from "../services/api"; // Axios instance

const RideDetails = ({ vehicleRental, setVehicleRental }) => {
  const [rentals, setRentals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  useEffect(()=> {
    const getRentals = async () =>{
        const response = await api.get("users/get_rental_list/");
        console.log(response.data);
        setRentals(response.data);
    }
    getRentals();
    setLoading(false);
    console.log("rentals: ", rentals)
  }, [])
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

//   const handleEndRide = async () => {
//     try {
//       const response = await api.post(`/vehicles/${vehicle.id}/return_vehicle/`, {
//         destination_station: destinationStation,
//       });
//       onEndRide(response.data); // Notify parent about ride completion
//     } catch (error) {
//       console.error("Error ending ride:", error);
//     }
//   };

//   const handleReportDefect = async () => {
//     try {
//       await api.post(`/vehicles/${vehicle.id}/report_defect/`);
//       alert("Vehicle reported as defective.");
//     } catch (error) {
//       console.error("Error reporting defect:", error);
//     }
//   };
  const currentRentals = rentals?.filter(rental => rental.is_active===true);
  console.log("current rentals: ", currentRentals)
  const prevRentals = rentals?.filter(rental => rental.is_active===false);
  console.log(currentRentals);
  return (
    loading? <p>Loading</p>:
  <>
    {currentRentals && 
    <div>
        <h2>Current Rental: {currentRentals[0].vehicle_id}</h2>
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

    {/*
      <div>
        <label htmlFor="destination">Select Destination Station:</label>
        <select
          id="destination"
          value={destinationStation}
          onChange={(e) => setDestinationStation(e.target.value)}
        >
          <option value="">Select a station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleEndRide}>End Ride</button>
      <button onClick={handleReportDefect}>Report Defect</button> */}


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
            <strong>Total Cost So Far:</strong> ${rental.total_cost}
         </p>)}

    </div>
    }
  </>
  );
};

export default RideDetails;
