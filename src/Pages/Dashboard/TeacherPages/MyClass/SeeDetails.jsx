import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import ButtonOne from "../../../../Components/ButtonOne/ButtonOne";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Helmet } from "react-helmet-async";

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

  const progressData = [
    {
      name: "total Enrollments",
      value: enrollmentCount?.enrollments || 0,
    },
    {
      name: "total Assignments",
      value: assignments?.length || 0,
    },
    {
      name: "total Submission",
      value: submissions?.submissionCount || 0,
    },
  ];
 const COLORS = ["#5e4cc8", "#9080ea", "#573bf7"];
  return (
    <div className=" py-8 grid grid-cols-1">
      <Helmet>
        <title>See Details</title>
      </Helmet>
      {/* ✅ Class Progress Section */}
      <div className=" p-6 rounded ">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold mb-4"> Class Progress</h2>
          <ButtonOne onClick={open} level="Created"></ButtonOne>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary p-4 rounded shadow text-center">
            <h3 className="text-lg text-white font-semibold">
              Total Enrollments
            </h3>
            <p className="text-2xl font-bold text-white">
              {enrollmentCount?.enrollments || 0}
            </p>
          </div>
          <div className="bg-[var(--secondary)] p-4 rounded shadow text-center">
            <h3 className="text-lg text-white font-semibold">
              Total Assignments
            </h3>
            <p className="text-2xl font-bold text-white">
              {assignments?.length || 0}
            </p>
          </div>
          <div className="bg-primary p-4 rounded shadow text-center">
            <h3 className="text-lg text-white font-semibold">
              Total Submissions
            </h3>
            <p className="text-2xl font-bold text-white">
              {submissions?.submissionCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4  rounded-xl  p-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={progressData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {progressData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
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
                <div className="flex justify-center">
                  <ButtonOne
                    loading={isPending}
                    level="Add Assignment"
                  ></ButtonOne>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SeeDetails;
