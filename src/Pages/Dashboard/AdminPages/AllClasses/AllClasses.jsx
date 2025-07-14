import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: classes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes_all");
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
        rejectClass(id)
      }
    });
  };

  const handleProgress = (id) => {
    navigate(`/dashboard/my-class/${id}`)
  };

  return (
    <div className="overflow-x-auto">
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
          {classes.map((item, idx) => (
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
  );
};

export default AllClasses;
