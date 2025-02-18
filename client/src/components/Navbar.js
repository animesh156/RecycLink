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
      await API.post("/user/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");

      // Remove authentication state
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role")
      localStorage.removeItem("userName")

     
      setTimeout(() => {
        navigate("/login");
        window.location.reload(); //  Ensure Navbar updates
      }, 2000);
      
    } catch (error) {
      toast.error("Logout failed. Please try again");
      console.log(error);
    }
  };

  const role = localStorage.getItem("role");

  if(!isAuthenticated){
    return <></>
  }
 
  return (
    <nav className="navbar top-0 start-0  bg-slate-200 dark:bg-neutral-900 shadow-lg px-4">
      <ToastContainer />
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          RecycLink
        </Link>
      </div>

     
        <div className="flex-none gap-4">
          <Link to="/" className="btn btn-ghost">
            Dashboard
          </Link>

          {role && role !== "seller" && (
  <Link to="/marketplace" className="btn btn-ghost">
    Marketplace    
  </Link>
)}
         
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        </div>
      
    </nav>
  );
};

export default Navbar;
