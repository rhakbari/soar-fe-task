import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          {/* Animated circles */}
          <div className="absolute inset-0 border-4 border-t-[#404B7C] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-t-[#6B7BC2] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow" />
          <div className="absolute inset-4 border-4 border-t-[#9BA4D9] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-[#404B7C] font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
