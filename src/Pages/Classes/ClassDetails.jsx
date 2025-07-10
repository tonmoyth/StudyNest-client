import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: classData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["class-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  const handlePay = (id) => {
    navigate(`/payment/${id}`)
  };
  if (isLoading) return <Loading></Loading>;
  if (isError) return <p>Something went wrong!</p>;
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-2">
      <img
        src={classData.image}
        alt={classData.title}
        className="w-full h-64 object-cover rounded"
      />
      <div className="mt-6 space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">{classData.title}</h2>
        <p className="text-gray-600">Instructor: {classData.name}</p>
        <p className="text-gray-600">Email: {classData.email}</p>
        <p className="text-green-600 text-lg font-semibold">
          Price: ${classData.price}
        </p>
        <p className="text-gray-700">{classData.description}</p>
        <p className="text-sm font-medium">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded ${
              classData.status === "approved"
                ? "bg-green-100 text-green-700"
                : classData.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {classData.status}
          </span>
        </p>
        <button
          onClick={() => handlePay(classData._id)}
          className="btn btn-primary mt-4 w-full sm:w-auto"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
