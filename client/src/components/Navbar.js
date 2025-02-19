import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/user/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Logout failed. Please try again");
      console.log(error);
    }
  };

  const role = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 start-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blue-900 shadow-lg' 
          : 'bg-gradient-to-r from-blue-900 to-blue-800'
      }`}
    >
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <Link 
              to="/dashboard" 
              className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-blue-300">Recyc</span>Link
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <Link 
              to="/dashboard" 
              className="relative px-4 py-2 text-white hover:text-blue-200 transition-all duration-200 rounded-lg hover:bg-white/10 group"
            >
              <span>Dashboard</span>
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-300 group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </Link>

            {role && role !== "seller" && (
              <Link 
                to="/marketplace" 
                className="relative px-4 py-2 text-white hover:text-blue-200 transition-all duration-200 rounded-lg hover:bg-white/10 group"
              >
                <span>Marketplace</span>
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-300 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-2 bg-white/10 text-white rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-sm"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom border with animation */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="h-[2px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"
      />
    </motion.nav>
  );
};

export default Navbar;