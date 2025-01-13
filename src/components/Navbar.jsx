import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        {user && (
            <LogoutButton/>
        )}
        {user && user.role === "customer" && (
            <li><Link to="/home">Home</Link></li>
        )}
        {user && user.role === "customer" && (
            <li><Link to="/rentals">Rentals</Link></li>
        )}
        {user && user.role === "operator" && (
          <li><Link to="/operator">Operator Dashboard</Link></li>
        )}
        {user && user.role === "manager" && (
          <li><Link to="/manager">Manager Dashboard</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
