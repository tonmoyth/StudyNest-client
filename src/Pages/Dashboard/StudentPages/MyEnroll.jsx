import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import EnrolledClassCard from "./EnrolledClassCard";
import { useNavigate } from "react-router";

const MyEnroll = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: enrolledClasses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["enrolled-classes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolled-classes?email=${user?.email}`
      );
      return res.data;
    },
  });

   const handleContinue = (classItem) => {
    navigate(`/dashboard/myEnroll-class/${classItem._id}`)
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Your Enrolled Classes</h1>

      {enrolledClasses?.length === 0 ? (
        <p className="text-gray-500 text-center">No enrolled classes found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledClasses.map((classItem) => (
            <EnrolledClassCard
              key={classItem._id}
              classData={classItem}
              onContinue={() => handleContinue(classItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnroll;
