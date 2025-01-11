import React from 'react'

const RentalModal = ({selectedVehicle, setSelectedVehicle}) => {
  const handleConfirmRent = () => {
    console.log("confirming the rental");
  }
  const handleCloseModal = () => {
    console.log("closing ther modal");
    setSelectedVehicle(null);
  }

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
            <button onClick={handleConfirmRent} className="btn-confirm">Confirm</button>
            <button onClick={handleCloseModal} className="btn-cancel">Cancel</button>
            </div>
        </div>
)}

    </>
    )
}

export default RentalModal