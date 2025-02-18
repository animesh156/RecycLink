import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) return <></>;

  return (
    <footer className="relative mt-auto">
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"
      />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            {/* Logo and Tagline */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold flex items-center"
              >
                <span className="text-blue-300">Recyc</span>
                <span className="text-white">Link</span>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-200 text-sm font-light hidden sm:block"
              >
                Making recycling easier for everyone
              </motion.p>
            </div>
            
            {/* Copyright */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-blue-300/80 font-light"
            >
              © {new Date().getFullYear()} RecycLink
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm"
      />
    </footer>
  );
};

export default Footer;