import React from 'react';
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';



const Footer = () => {

  if(!isAuthenticated) return <></>

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>© 2025 RecycLink - Making recycling easier for everyone</p>
      </div>
    </footer>
  );
};

export default Footer; 