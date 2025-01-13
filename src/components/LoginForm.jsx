import React, { useState, useEffect } from "react";
import { login } from "../services/api";
import axios from 'axios';
import api from '../services/api';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { user, setUser } = useContext(AuthContext);

  if(user){
    return (
        <div>
            <h2>Already Logged In</h2>
            <p>You are already logged in as {user.username}.</p>
        </div>
    );
}

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("users/login/", { username, password });
      const data = response.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      console.log('user data after login:', data);
    //   const data = await login(username, password);
      setMessage(`Welcome, ${data.username}!`);
      console.log(data);
      data.role === "customer" && navigate("/home");
      data.role === "operator" && navigate("/operator");
      data.role === "manager" && navigate("/manager");
    } catch (error) {
        if (error.response && error.response.data)
            setMessage(error.response.data.message || "Login failed. Please check your credentials.");
        else
            console.log(error.message);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;
