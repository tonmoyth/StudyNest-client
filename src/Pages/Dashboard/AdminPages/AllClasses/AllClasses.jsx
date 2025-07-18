import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Pagination from "../../../../Components/pagination/Pagination";
import Loading from "../../../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-classes", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes_all?page=${currentPage}`);
      return res.data;
    },
  });
 

  const { mutate: approveClass } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/classes/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Class has been approved.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  const { mutate: rejectClass } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/classes/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Class has been rejected.", "error");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClass(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this class?",
      text: "Are you sure you want to reject this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectClass(id);
      }
    });
  };

  const handleProgress = (id) => {
    navigate(`/dashboard/my-class/${id}`);
  };

  if(isLoading) return <Loading></Loading>

  return (
    <div>
      <Helmet>
        <title>All Classes</title>
      </Helmet>
      <div className="overflow-x-auto min-h-screen">
        <table className="table w-full">
          <thead>
            <tr className="bg-[var(--background)]">
              <th>NO</th>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes?.data?.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>{item.description.slice(0, 40)}...</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "approved"
                        ? "badge-success"
                        : item.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2 ">
                    <button
                      onClick={() => handleApprove(item._id)}
                      disabled={item.status === "approved"}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(item._id)}
                      disabled={item.status === "rejected"}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>

                    <button
                      disabled={item.status === "pending"}
                      onClick={() => handleProgress(item._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Progress
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <Pagination
        data={classes}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default AllClasses;
