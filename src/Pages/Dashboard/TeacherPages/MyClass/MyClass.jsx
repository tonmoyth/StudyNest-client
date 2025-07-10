import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { Button } from "@headlessui/react";
import ClassUpdateModal from "./ClassUpdateModal";
import Swal from "sweetalert2";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectClass, setSelectClass] = useState(null);
  const navigate = useNavigate();

  const {
    data: myClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-classes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: deleteClass } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/classes/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Class has been deleted.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete class.", "error");
    },
  });

  const open = (singleClass) => {
    setSelectClass(singleClass);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  //   handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClass(id);
      }
    });
  };

  const handleSeeDetails = (id) => {
    navigate(`/dashboard/my-class/${id}`)
  }

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (myClasses.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven't added any class yet.
      </p>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {myClasses.map((classItem) => (
        <div
          key={classItem._id}
          className="border p-4 rounded shadow bg-white space-y-3"
        >
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-semibold">{classItem.title}</h2>
          <p>
            <strong>Teacher:</strong> {classItem.name}
          </p>
          <p>
            <strong>Email:</strong> {classItem.email}
          </p>
          <p>
            <strong>Price:</strong> ${classItem.price}
          </p>
          <p>
            <strong>Description:</strong> {classItem.description}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-medium ${
                classItem.status === "pending"
                  ? "text-yellow-500"
                  : classItem.status === "approved"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {classItem.status}
            </span>
          </p>

          <div className="flex justify-between mt-3">
            <Button
              onClick={() => open(classItem)}
              className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
            >
              Update
            </Button>
            <button
            onClick={() => handleSeeDetails(classItem._id)}
              className="btn btn-sm btn-secondary"
            //   disabled={classItem.status === "pending"}
            >
              See Details
            </button>
            <button
              onClick={() => handleDelete(classItem._id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <ClassUpdateModal
        isOpen={isOpen}
        close={close}
        classData={selectClass}
        refetch={refetch}
      />
    </div>
  );
};

export default MyClass;
