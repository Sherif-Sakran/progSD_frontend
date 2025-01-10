import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/user_data/");
        setData(response.data);
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
