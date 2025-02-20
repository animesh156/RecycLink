import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, role } = formData;
      const response = await API.post(
        "/user/register",
        { name, email, password, role },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Registered Successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userName", response.data.name);

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Email is already registered", {
          position: "top-center",
          autoClose: 4000,
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
        {/* IRA Design Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-80"
        >
          <img src="/Good team-cuate.svg" alt="Illustration" className="w-full h-auto" />
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl shadow-2xl p-6 md:p-8 border border-blue-300/30"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-4xl font-bold mb-4 text-center text-white"
          >
            Join <span className="text-blue-300">Recyc</span>Link
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-blue-200 text-sm md:text-lg mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter your name"
              />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-blue-200 text-sm md:text-lg mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter your email"
              />
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-blue-200 text-sm md:text-lg mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Create a password"
              />
            </motion.div>

            {/* Role */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-blue-200 text-sm md:text-lg mb-1">Role</label>
              <select
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="buyer" className="bg-blue-900">Buyer</option>
                <option value="seller" className="bg-blue-900">Seller</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
            >
              Register
            </motion.button>
          </form>

          {/* Login Redirect */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 text-center">
            <p className="text-blue-200">
              Already have an account?{" "}
              <motion.button onClick={() => navigate("/login")} whileHover={{ scale: 1.05 }} className="text-blue-300 hover:text-blue-200 font-semibold">
                Login here
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
