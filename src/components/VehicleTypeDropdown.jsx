const VehicleFilter = ({ vehicleType, setVehicleType }) => {
    return (
      <div>
        <label>Filter by Vehicle Type:</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electric Car">Electric Car</option>
          <option value="Electric Scooter">Electric Scooter</option>
          <option value="Electric Bike">Electric Bike</option>
        </select>
      </div>
    );
  };

export default VehicleFilter;
  