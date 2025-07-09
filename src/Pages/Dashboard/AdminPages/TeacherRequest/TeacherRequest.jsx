import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading/Loading";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: teachers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-teachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers");
      return res.data;
    },
  });

  //   teacher accept
  const { mutate: approveTeacher } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch("/teachers/accept", { email });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Teacher has been approved.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve teacher", "error");
    },
  });

  //   teacher rejected
  const { mutate: rejectedTeacher } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch("/teachers/reject", { email });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Teacher has been rejected.", "error");
      refetch(); // refresh table
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject teacher", "error");
    },
  });

  const handleRejected = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reject this teacher?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectedTeacher(email); 
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={teacher.photo}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.experience}</td>
                <td>{teacher.title}</td>
                <td>{teacher.category}</td>
                <td>
                  <span
                    className={`badge ${
                      teacher.status === "approved"
                        ? "badge-success"
                        : teacher.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </td>
                <td className="space-x-2 text-center">
                  <button
                    disabled={teacher.status === "rejected"}
                    onClick={() => approveTeacher(teacher.email)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejected(teacher.email)}
                    className="btn btn-sm btn-error"
                    disabled={teacher.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
