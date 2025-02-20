import React from 'react';

function Loader() {
  return (
    <div className="flex items-center h-screen justify-center "> {/* Center the loader */}
      <span className="loading w-14 mt-36 loading-spinner text-error text-4xl"></span> {/* Make it bigger */}
    </div>
  );
}

export default Loader;
