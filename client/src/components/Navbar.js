import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //  Read authentication state from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await API.post("/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");

      // Remove authentication state
      localStorage.removeItem("isAuthenticated");

     
      setTimeout(() => {
        navigate("/login");
        window.location.reload(); //  Ensure Navbar updates
      }, 2000);
      
    } catch (error) {
      toast.error("Logout failed. Please try again");
      console.log(error);
    }
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4">
      <ToastContainer />
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          RecycLink
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex-none gap-4">
          <Link to="/dashboard" className="btn btn-ghost">
            Dashboard
          </Link>
          <Link to="/profile" className="btn btn-ghost">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex-none gap-4">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
