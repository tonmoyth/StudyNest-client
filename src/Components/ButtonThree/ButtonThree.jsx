import React from "react";

const ButtonThree = ({ level }) => {
  return (
    <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-primary rounded-md group">
      {/* <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span> */}
      <span className="absolute inset-0 w-full h-full bg-primary rounded-md "></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
      <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
        {level}
      </span>
    </button>
  );
};

export default ButtonThree;
