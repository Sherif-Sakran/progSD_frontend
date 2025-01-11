const VehicleTable = ({ vehicles, handleRent }) => {
 
    return (
      <table>
        <thead>
          { vehicles && <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Battery Level</th>
            <th>Status</th>
            <th>Action</th>
          </tr> }
        </thead>
        <tbody>
          {vehicles?.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.battery_level}%</td>
              <td>{vehicle.status}</td>
              <td>
                <button onClick={() => handleRent(vehicle.id)}>Rent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

export default VehicleTable;