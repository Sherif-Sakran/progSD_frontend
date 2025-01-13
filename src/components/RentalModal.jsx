import React from 'react'

const RentalModal = ({selectedVehicle, setSelectedVehicle}) => {
  const handleCloseModal = () => {
    console.log("closing ther modal");
    setSelectedVehicle(null);
  }
  
  const handleRentalConfirmation = async (vehicleId) => {
    console.log(`Renting vehicle with ID: ${vehicleId}`);
    const response = await api.post("vehicles/rent_vehicle/", {
      "id": vehicleId
    });
    console.log(response.data);
    setVehicleRental(response.data);
    navigate("/rentals")
  };
  

  return (
    <>
        {selectedVehicle && (
        <div className="modal">
            <div className="modal-content">
            <button onClick={handleCloseModal}>X</button>
            <h3>Confirm Rental</h3>
            <p>Are you sure you want to rent this vehicle?</p>
            <p>
                <strong>Vehicle ID:</strong> {selectedVehicle.id}
                <br />
                <strong>Type:</strong> {selectedVehicle.type}
            </p>
            <button onClick={() => handleRentalConfirmation(selectedVehicle.id)} className="btn-confirm">Confirm</button>
            <button onClick={handleCloseModal} className="btn-cancel">Cancel</button>
            </div>
        </div>
)}

    </>
    )
}

export default RentalModal