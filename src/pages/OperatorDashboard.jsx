import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import AddVehicleModal from "../components/AddVehicleModal";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addVehicleModal, setAddVehicleModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching operator data')
        const response = await api.get("users/user_data/");
        setData(response.data);
        console.log('data: ', response.data)
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    { !loading && 
    <>
      <button onClick={() => setAddVehicleModal(true)}>Add Vehicle</button>
      <div>
        <AddVehicleModal addVehicleModal={addVehicleModal} setAddVehicleModal={setAddVehicleModal}/>
      </div>
    <div onClick={() => setAddVehicleModal(false)}>
      <h2>Operator Dashboard</h2>
      {data ? (
          <>
            <p> { data.message}</p>
            <p> Role: { data.role}</p>
          </>
        ) : (
          <p>...</p>
        )}
        </div>
    </>}
  </>
  );
}

export default Dashboard;
