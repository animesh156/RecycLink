import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">RecycLink</Link>
      </div>
      
      {token ? (
        <div className="flex-none gap-4">
          <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
          <Link to="/profile" className="btn btn-ghost">Profile</Link>
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex-none gap-4">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;





