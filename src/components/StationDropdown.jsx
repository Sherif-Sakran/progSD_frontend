const StationDropdown = ({ stations, selectedStation, setSelectedStation }) => {
    return (
      <div>
        <label>Select Station:</label>
        <select
          value={selectedStation || ""}
          onChange={(e) => setSelectedStation(e.target.value)}
        >
          <option value="" disabled>Select a station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
export default StationDropdown;