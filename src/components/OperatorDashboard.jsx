import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
// import 

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching operator data')
        const response = await api.get("users/user_data/");
        setData(response.data);
        console.log('data: ', response.data)
        console.log('data2: ', data)
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
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
  );
}

export default Dashboard;
