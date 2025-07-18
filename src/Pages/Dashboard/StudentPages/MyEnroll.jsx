import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import EnrolledClassCard from "./EnrolledClassCard";
import { useNavigate } from "react-router";
import Pagination from "../../../Components/pagination/Pagination";
import Loading from "../../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const MyEnroll = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolled-classes", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolled-classes?email=${user?.email}&page=${currentPage}`
      );
      return res.data;
    },
  });

  const handleContinue = (classItem) => {
    navigate(`/dashboard/myEnroll-class/${classItem._id}`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Helmet>
        <title>My Enroll</title>
      </Helmet>
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Enrolled Classes</h1>

        {enrolledClasses?.data?.length === 0 ? (
          <p className="text-center">No enrolled classes found.</p>
        ) : (
          <div className="min-h-screen">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledClasses?.data?.map((classItem) => (
                <EnrolledClassCard
                  key={classItem._id}
                  classData={classItem}
                  onContinue={() => handleContinue(classItem)}
                />
              ))}
            </div>
          </div>
        )}

        {/* pagination */}
        <Pagination
          data={enrolledClasses}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
    </div>
  );
};

export default MyEnroll;
