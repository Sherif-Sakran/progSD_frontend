// import { useState } from 'react'
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import './App.css'
import GeneralDashboard from './components/GeneralDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import NotAuthorised from "./components/NotAuthorised";
import Navbar from "./components/Navbar";
import Rentals from "./components/Rentals";
import { StationsProvider } from './context/StationsContext'

function App() {

  // Helper function to conditionally hide Navbar
  const ShouldShowNavbar = () => {
    const location = useLocation();
    const excludedRoutes = ["/login"]; // Add any other routes where you don't want the navbar
    return !excludedRoutes.includes(location.pathname);
  };

  return (
    <>
    <StationsProvider>
    <Router>
      {/* Conditionally render Navbar */}
      {/* {ShouldShowNavbar() && <Navbar />} */}
      { <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/not_authorized" element={<NotAuthorised />} />
        <Route
          path="/dashboard"
          element={
            <>
              <GeneralDashboard />
              <LogoutButton />
            </>
          }
        />
        <Route path="/home" element={<CustomerDashboard />} />
        <Route path="/rentals" element={<Rentals />} />

        <Route path="/operator" element={
          <ProtectedRoute role="operator">
          <OperatorDashboard />
          </ProtectedRoute>
          } />

        <Route path="/manager" element={
          <ProtectedRoute role="manager">
          <ManagerDashboard />
          </ProtectedRoute>
          } />

        {/* <Route path="/logout" element={<LogoutButton />} /> */}
      </Routes>
    </Router>
    </StationsProvider>
    </>
  )
}

export default App
