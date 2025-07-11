import React from "react";

const EnrolledClassCard = ({ classData, onContinue }) => {
    const { title, name, image } = classData;
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600 mb-4">Instructor: {name}</p>
      <button onClick={onContinue} className="btn btn-primary w-full">
        Continue
      </button>
    </div>
  );
};

export default EnrolledClassCard;
