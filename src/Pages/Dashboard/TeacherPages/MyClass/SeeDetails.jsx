import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const SeeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const { data: enrollmentCount } = useQuery({
    queryKey: ["enrollments", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes_enrollments/${id}`);
      return res.data;
    },
  });
  


    const { data: assignments } = useQuery({
      queryKey: ["assignments", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/assignments/count/${id}`);
        return res.data;
      },
    });
  

    const { data: submissions } = useQuery({
      queryKey: ["submissions", id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/assignment-submission-count/${id}`);
        return res.data;
      },
    });
   

  const queryClient = useQueryClient();

  const { mutate: addAssignment, isPending } = useMutation({
    mutationFn: async (assignmentData) => {
      const res = await axiosSecure.post("/assignments", assignmentData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Assignment added successfully!", "success");
       queryClient.invalidateQueries({ queryKey: ["assignments", user?.email] });
      close();
    },
    onError: () => {
      Swal.fire(
        "Error!",
        "Something went wrong while adding assignment",
        "error"
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const assignmentInfo = {
      title: data?.title,
      description: data?.description,
      deadline: data?.deadline,
      classId: id,
      crate_At: new Date().toISOString(),
      teacherEmail: user?.email,
    };
    addAssignment(assignmentInfo);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className=" w-11/12 mx-auto px-4 py-8 grid grid-cols-1">
      {/* ✅ Class Progress Section */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold mb-4">📊 Class Progress</h2>
          <Button
            onClick={open}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
          >
            Created
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-violet-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Enrollments</h3>
            <p className="text-2xl font-bold text-violet-700">
              {enrollmentCount?.enrollments || 0}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Assignments</h3>
            <p className="text-2xl font-bold text-green-700">
               {assignments?.length || 0}
            </p>
          </div>
          <div className="bg-orange-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Submissions</h3>
            <p className="text-2xl font-bold text-orange-700">
              {submissions?.submissionCount || 0}
            </p>
          </div>
        </div>
      </div>
      {/* assignment created modal */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <DialogTitle className="text-lg font-bold text-gray-800 mb-4">
                Add Assignment
              </DialogTitle>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Assignment Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="input input-bordered w-full"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <input
                    type="date"
                    {...register("deadline", {
                      required: "Deadline is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.deadline && (
                    <p className="text-sm text-red-500">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="textarea textarea-bordered w-full"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                  {isPending ? <span className="loading loading-spinner loading-md"></span> : 'Add Assignment'}
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SeeDetails;
