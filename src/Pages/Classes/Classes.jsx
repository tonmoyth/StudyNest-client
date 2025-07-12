import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router";

const Classes = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/approved");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {classes?.map((classItem) => (
        <div
          key={classItem._id}
          className="bg-white rounded-lg shadow-md p-5 space-y-3"
        >
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-bold">{classItem.title}</h2>
          <p className="text-gray-600">By: {classItem.name}</p>
          <p className="text-gray-800 font-semibold">${classItem.price}</p>
          <p className="text-sm text-gray-500">
            {classItem.description?.slice(0, 80)}...
          </p>
          <p className="text-sm text-blue-600">
            Total Enrolled: {classItem.enrollments || 0}
          </p>
          <Link
            to={`/class/${classItem._id}`} 
            className="btn btn-primary w-full"
          >
            Enroll
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Classes;
