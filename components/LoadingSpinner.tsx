
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    // Fix: Corrected the malformed class name and added a reasonable padding value.
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );
};

// Fix: Added default export for the component.
export default LoadingSpinner;
