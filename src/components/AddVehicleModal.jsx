import React, {useState, useContext} from 'react'
import api from '../services/api';
import StationDropdown from './StationDropdown';
import { StationsContext } from '../context/StationsContext';

const AddVehicleModal = ({addVehicleModal, setAddVehicleModal}) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const {stations} = useContext(StationsContext);

  const types = ['Electric Car', 'Electric Scooter', 'Electric Bike']
  console.log('inside Vehicle Modal')
  const [vehicleObject, setVehicleObject] = useState({
    type: 'Electric Car',
    battery_level: 100,
    status: 'available',
    location_id: 2,
    last_maintenance_date: '',
    is_defective: 0
  });

  
  const handleCloseModal = () => {
    console.log("closing ther modal");
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
    console.log(`Processing payment: ${amount}`);
    setLoading(false);
    try{
    const responseBody = {
        type: 'Electric Car',
        battery_level: 100,
        status: 'available',
        location_id: 2,
        last_maintenance_date: '',
        is_defective: 0
    }
    const response = await api.post("vehicles/add_vehicle/", responseBody);
    console.log(response.data);
    setMessage(response.message || "Payment Successful.");
    setAddVehicleModal(false);
    setTimeout(()=>{navigate("/home");}, 1000)
    }catch(error){
        if (error.response && error.response.data)
            setMessage(error.response.data.message || "Payment failed.");
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
            
            {/* { types.map((type) =>  <label><input type="radio" name="type" value={type} checked={vehicleObject.type === type} onChange={handleChange}/>{type}</label> )} */}
            <label>Select Type: </label>
            <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value)}
            >
            <option name="type" value="">Select Type</option>
            { types.map((type) =>  <option name="type" value={type}>{type}</option> )}
            </select>
            <StationDropdown stations={stations} selectedType={selectedType} setSelectedType={setSelectedType}/>
        </div>


        {/* <div>
        <label>Battery Level:
            <input type="text" name="card_number" value={vehicleObject.card_number} onChange={handleChange} required/>
        </label>
        </div>
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