import React from "react";

const ButtonOne = ({level}) => {
  return (
    <button
      class=" rounded px-5 py-2.5 overflow-hidden group bg-primary relative hover:bg-gradient-to-r hover:bg-primary hover:primary hover:cursor-pointer text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
    >
      <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span class="relative">{level}</span>
    </button>
  );
};

export default ButtonOne;
