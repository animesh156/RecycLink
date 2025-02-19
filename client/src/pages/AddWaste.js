import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

const AddWaste = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    price: "",
    image: null,
  });

  const UserRole = localStorage.getItem("role");

  useEffect(() => {
    if (UserRole !== "seller") {
      toast.error("Access Denied: Only sellers can add waste.");
      navigate("/");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        toast.error("Image size must be less than 200 KB");
        setFormData({ ...formData, image: null });
      } else {
        setFormData({ ...formData, image: file });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }
  
    try {
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );
  
      const imageUrl = cloudinaryResponse.data.secure_url;
  
      const response = await API.post(
        "/waste/add",
        { ...formData, imageUrl },
        { withCredentials: true }
      );
  
      if (response.status === 201) {
        toast.success("Waste added successfully!");
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add waste.");
      console.error("Error:", err);
    }
  };

  if (UserRole !== "seller") return null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 w-full h-full opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(37, 99, 235, 0.5)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ToastContainer />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 rounded-2xl shadow-2xl p-8 relative z-10 border border-blue-300/30"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center text-white mb-8"
        >
          Add New Item
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-200 text-lg mb-2 font-medium">
              Title
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter waste title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-blue-200 text-lg mb-2 font-medium">
              Description
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Describe the waste"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-200 text-lg mb-2 font-medium">
                Location
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Enter location"
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-blue-200 text-lg mb-2 font-medium">
                Category
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Waste category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-200 text-lg mb-2 font-medium">
              Price
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter price"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-blue-200 text-lg mb-2 font-medium">
              Upload Image (Max: 200 KB)
            </label>
            <motion.input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-blue-200
                      file:mr-4 file:py-3 file:px-4
                      file:rounded-lg file:border file:border-blue-300/30
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700
                      cursor-pointer bg-white/10 rounded-lg"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: '#2563EB' }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg mt-8"
          >
            Add Item
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddWaste;