import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify

const WasteAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSize = file.size / 1024; // Convert to KB
      const fileType = file.type.split("/")[1].toLowerCase();

      if (fileSize > 200) {
        toast.error("⚠ File size must be less than 200KB.");
        e.target.value = ""; // Clear file input
        setImage(null);
        setImagePreview(null);
        return;
      } else if (fileType !== "jpeg" && fileType !== "jpg") {
        toast.error("⚠ Only JPEG/JPG images are allowed.");
        e.target.value = ""; // Clear file input
        setImage(null);
        setImagePreview(null);
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      toast.error("Please select a valid image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("https://recyclink.onrender.com/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Centered Title */}
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">♻ Waste Analyzer</h1>

      {/* Centered File Input */}
      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={handleImageUpload}
          className="block w-full text-sm file:py-2 file:px-4 file:bg-blue-500 file:text-white file:rounded-md file:hover:bg-blue-600 cursor-pointer"
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Selected Waste"
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Centered Analyze Button */}
      <button
        onClick={analyzeImage}
        disabled={loading || !image}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {/* Recycling Suggestion */}
      {suggestion && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-center">
          <h2 className="font-semibold text-xl text-green-600">Recycling Suggestion:</h2>
          <p className="text-gray-700">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default WasteAnalyzer;
