import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const { name, email, password } = formData;
  
      const response = await API.post(
        "/register",
        { name, email, password },
        { withCredentials: true }
      );
  
      if (response.status === 201) {
        toast.success("Registered Successfully");
  
        // Store authentication state in local storage
        localStorage.setItem("isAuthenticated", "true");
  
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload(); // Ensure Navbar updates instantly
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        // Check if the error is due to email already existing
        if (err.response.status === 400) {
          toast.error("Email is already registered");
        } else {
          toast.error(err.response.data.message || "Registration failed. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
  
      console.error("Registration error:", err);
    }
  };
  
 

  return (
    <div className="min-h-screen   flex  items-center justify-center"
        style={{
          backgroundImage: 'url("/wave.svg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    >
      <ToastContainer />
      <div className="max-w-md  w-full  bg-white dark:bg-neutral-900 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
       
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

       

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;