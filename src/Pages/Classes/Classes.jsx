import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router";
import ButtonOne from "../../Components/ButtonOne/ButtonOne";
import Pagination from "../../Components/pagination/Pagination";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Classes = () => {
  
  const [currentPage,setCurrentPage] = useState(1);
  

 
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-classes",currentPage],
    enabled:!!currentPage,
    queryFn: async () => {
      const res = await axios.get(`https://study-nest-server-sepia.vercel.app/classes/approved?page=${currentPage}`);
      return res.data;
    },
  });
 

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>;
  return (
    <div className="px-4">
      <Helmet>
        <title>Classes</title>
   
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
        {classes?.data?.map((classItem) => (
          <div
          data-aos="fade-up"
            key={classItem._id}
            className="bg-[var(--background)] flex flex-col justify-between rounded-lg shadow-md p-4 space-y-2"
          >
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{classItem.title}</h2>
            <p className=""> {classItem.name}</p>
            <p className=" font-semibold">${classItem.price}</p>
            <p className="text-sm ">
              {classItem.description?.slice(0, 80)}...
            </p>
            <p className="text-sm text-primary">
              Total Enrolled: {classItem.enrollments || 0}
            </p>
            <Link
              to={`/class/${classItem._id}`}
              
            >
              <ButtonOne level='Enroll'></ButtonOne>
            </Link>
          </div>
        ))}
      </div>

      {/* pagination */}
      <Pagination data={classes} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
    </div>
  );
};

export default Classes;
