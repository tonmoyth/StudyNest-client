import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { Button } from "@headlessui/react";
import ClassUpdateModal from "./ClassUpdateModal";
import Swal from "sweetalert2";
import Pagination from "../../../../Components/pagination/Pagination";
import ButtonOne from "../../../../Components/ButtonOne/ButtonOne";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectClass, setSelectClass] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: myClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-classes", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?email=${user.email}&page=${currentPage}`
      );
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
    navigate(`/dashboard/my-class/${id}`);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (myClasses.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven't added any class yet.
      </p>
    );
  return (
    <div>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
          {myClasses?.classes?.map((classItem) => (
            <div
              key={classItem._id}
              className="p-4 rounded bg-[var(--background)] flex flex-col justify-between space-y-2 h-[530px]"
            >
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold">{classItem.title}</h2>
              <p>
                <strong>Teacher</strong> {classItem.name}
              </p>
              <p>
                <strong>Email</strong> {classItem.email}
              </p>
              <p>
                <strong>Price</strong> ${classItem.price}
              </p>
              <p>
                {classItem.description}
              </p>
              <p>
                <strong></strong>{" "}
                <span
                  className={`font-medium ${
                    classItem.status === "pending"
                      ? "text-yellow-500"
                      : classItem.status === "approved"
                      ? "text-primary"
                      : "text-red-500"
                  }`}
                >
                  {classItem.status}
                </span>
              </p>

              <div className="flex justify-between mt-3">
                <ButtonOne onClick={() => open(classItem)} level="Update"></ButtonOne>
                <ButtonOne disabled={classItem.status === "pending"}  onClick={() => handleSeeDetails(classItem._id)}  level="See Details"></ButtonOne>
                <ButtonOne onClick={() => handleDelete(classItem._id)} level="Delete"></ButtonOne>
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
      </div>
      {/* pagination */}
      <Pagination
        data={myClasses}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default MyClass;
