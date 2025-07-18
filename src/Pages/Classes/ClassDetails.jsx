import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import ButtonOne from "../../Components/ButtonOne/ButtonOne";
import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  const handlePay = (id) => {
    navigate(`/payment/${id}`);
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="px-4">
      <Helmet>
        <title>Class Details</title>
      </Helmet>
      <div className="max-w-4xl mx-auto my-4 bg-[var(--background)] rounded-lg shadow p-6 mt-2">
        <img
          src={classData.image}
          alt={classData.title}
          className="w-full h-64 object-cover rounded"
        />
        <div className="mt-6 space-y-3">
          <h2 className="text-3xl font-bold">{classData.title}</h2>
          <p className="">{classData.name}</p>
          {/* <p className=""> {classData.email}</p> */}
          <p className="text-primary text-lg font-semibold">
            Price: ${classData.price}
          </p>
          <p className="">{classData.description}</p>
          {/* <p className="text-sm font-medium">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded ${
              classData.status === "approved"
                ? "text-primary"
                : classData.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {classData.status}
          </span>
        </p> */}
          <ButtonOne level="Pay" onClick={() => handlePay(classData._id)} />
          {/* <button
          onClick={() => }
          className="btn btn-primary mt-4 w-full sm:w-auto"
        >
          Pay Now
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
