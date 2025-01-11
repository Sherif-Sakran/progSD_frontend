import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        {user && user.role === "customer" && (
          <li><Link to="/home">Customer Dashboard</Link></li>
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
