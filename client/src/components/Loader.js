import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center "> {/* Center the loader */}
      <span className="loading w-14 mt-10 loading-spinner text-error text-4xl"></span> {/* Make it bigger */}
    </div>
  );
}

export default Loader;
