import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { email, password } = credentials;
      const response = await API.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful!");

        // Store authentication state in local storage
        localStorage.setItem("isAuthenticated", "true");

       

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload(); // Ensure Navbar updates instantly
        }, 2000);

        
       
      } else {
        setError(response.data.message || "Login failed");
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
