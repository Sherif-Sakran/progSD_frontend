import React, {useState, useContext} from 'react'
import api from '../services/api';
import StationDropdown from './StationDropdown';
import { StationsContext } from '../context/StationsContext';

const AddVehicleModal = ({addVehicleModal, setAddVehicleModal}) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const {stations} = useContext(StationsContext);

  const types = ['Electric Car', 'Electric Scooter', 'Electric Bike']
  const statusOptions = ['Available', 'Rented']

  console.log('inside Vehicle Modal')
  const [vehicleObject, setVehicleObject] = useState({
    type: 'Electric Car',
    location_id: "",
    battery_level: 100,
    status: 'Available',
    last_maintenance_date: "",
    is_defective: 0
  });

  
  const handleCloseModal = () => {
    console.log("closing the modal");
    setVehicleObject({
        type: '',
        location_id: "",
        battery_level: 100,
        status: 'Available',
        last_maintenance_date: "",
        is_defective: 0
      });
    setSelectedType("");
    setSelectedStation("");
    setMessage("");
    setAddVehicleModal(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVehicleObject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleAddVehicle = async (vehicleObject) => {
    setLoading(false);
    try{
    const responseBody = {
        type: selectedType,
        battery_level: vehicleObject.battery_level,
        status: vehicleObject.status,
        location_id: selectedStation,
        last_maintenance_date: vehicleObject.last_maintenance_date,
        is_defective: vehicleObject.is_defective
    }
    console.log(responseBody)
    const response = await api.post("vehicles/add_vehicle/", responseBody);
    console.log(response.data);
    setMessage(response.message || "Vehicle added successfully.");
    handleCloseModal();
    }catch(error){
        if (error.response && error.response.data)
            setMessage(error.response.data.message || "Process failed.");
    }
  };

  return (
    <>
        {addVehicleModal && (
        <div className="modal">
            <div className="modal-content">
            <button onClick={handleCloseModal}>X</button>
            <h3>Add Vehicle</h3>

        <div>
            
            <label>Select Type: </label>
            <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value)}
                >
            <option name="type" value="">Select Type</option>
            { types.map((type, typeIndex) =>  <option name="type" key={typeIndex} value={type}>{type}</option> )}
            </select>
            <StationDropdown stations={stations} selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>

        </div>


        <div>
        <label>Battery Level:
            <input type="text" name="battery_level" value={vehicleObject.battery_level} onChange={handleChange} required/>
        </label>
        </div>

        { statusOptions.map((status, statusIndex) =>  <label><input type="radio" key={statusIndex} name="status" value={status} checked={vehicleObject.status === status} onChange={handleChange}/>{status}</label> )}
        
        {/* 
        <div>

        <label>Card Passcode:
            <input type="text" name="card_passcode" value={vehicleObject.card_passcode} onChange={handleChange} required/>
        </label>
        </div>

      <div>
        <label>Coupon Code:
          <input type="text" name="coupon" value={vehicleObject.coupon} onChange={handleChange}/>
        </label>
      </div> */}
      <p>progress: {message && <p>{message || 'None'}</p>} </p>
      <button onClick={() => handleAddVehicle(vehicleObject)} className="btn-confirm">Add Vehicle</button>
      <button onClick={handleCloseModal} className="btn-cancel">Cancel</button>
      </div>
    </div>
)}

    </>
    )
}

export default AddVehicleModal;