import React from "react";
import ButtonOne from "../../../Components/ButtonOne/ButtonOne";

const EnrolledClassCard = ({ classData, onContinue }) => {
    const { title, name, image } = classData;
  return (
    <div className="bg-[var(--background)] shadow-md flex flex-col justify-between rounded-lg h-[380px] p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className=" mb-4">Instructor: {name}</p>
      <ButtonOne onClick={onContinue} level="Continue"></ButtonOne>
      
    </div>
  );
};

export default EnrolledClassCard;
