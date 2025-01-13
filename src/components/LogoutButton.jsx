import React, { useState } from "react";
import { logout } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LogoutButton() {
  const { setUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      setUser(null);
      setMessage("You have been logged out.");
      navigate("/login");
    } catch (error) {
      setMessage("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LogoutButton;
