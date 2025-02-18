import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
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
  
    // Check if the file size is less than or equal to 200 KB
    
  if (file) {
    
    if (file.size > 200 * 1024) { // 200 KB
      toast.error("Image size must be less than 200 KB");
      setFormData({ ...formData, image: null });
    } else {
      console.log("File selected:", file);
      setFormData({ ...formData, image: file });
    }
  } else {
    console.log("No file selected");
  }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }
  
    try {
      // Create FormData to upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Ensure preset name is correct
  
     // Log FormData content
     for (let pair of imageData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }
  
      // Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );
  
      // If successful, get the image URL
      const imageUrl = cloudinaryResponse.data.secure_url;
  
      // Proceed with saving waste data to your backend
      const response = await API.post(
        "/waste/add",
        { ...formData, imageUrl },
        { withCredentials: true }
      );
  
      if (response.status === 201) {
        toast.success("Waste added successfully!");
        setTimeout(() => {
          navigate("/");  // Redirect after success
          window.location.reload();  // Optionally reload page
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add waste.");
      console.error("Error:", err);
    }
  };
  


  if (UserRole !== "seller") return null;

  return (
    <div className="min-h-screen flex items-center justify-center   p-4">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Add Waste
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter waste title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Description
            </label>
            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Describe the waste"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter location"
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Waste category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Price
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter price"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Upload Image (Max: 200 KB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-500 file:text-white
                        hover:file:bg-blue-600
                        cursor-pointer"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition"
          >
            Add Waste
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWaste;
