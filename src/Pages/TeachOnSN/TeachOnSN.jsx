import React from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import ButtonOne from "../../Components/ButtonOne/ButtonOne";

const TeachOnSN = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   get teacher data
  const {
    data: teacher = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["teacher", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: saveTeacher, isPending } = useMutation({
    mutationFn: async (teacherData) => {
      const res = await axiosSecure.post("/teacher", teacherData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Submitted for review!",
        icon: "success",
      });
      reset();
      refetch(); // form reset
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to submit",
        text: error?.response?.data?.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data) => {
    const teacherData = {
      name: data.name,
      email: data.email,
      photo: user?.photoURL,
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: "pending", // default status
      appliedAt: new Date().toISOString(), // optional timestamp
    };
    saveTeacher(teacherData);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Failed to Load Teacher Data",
      text: isError?.message || "Something went wrong!",
    });
  }
  return (
    <div className="max-w-2xl mx-auto bg-[var(--background)] p-8 my-8 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Apply for Teaching Position
      </h2>

      {/* ✅ If already approved teacher, show message only */}
      {teacher?.status === "accepted" ? (
        <div className="text-center text-primary font-medium text-lg">
          You are already approved as a teacher!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image */}
          <div className="flex justify-center items-center">
            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="w-full input input-bordered"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register("email")}
              className="w-full input input-bordered cursor-not-allowed"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-1 font-medium">Experience</label>
            <select
              {...register("experience", {
                required: "Experience is required",
              })}
              className="w-full select select-bordered"
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              placeholder="e.g. MERN Stack Instructor"
              {...register("title", { required: "Title is required" })}
              className="w-full input input-bordered"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full select select-bordered"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
         <div className="flex justify-center">
           <ButtonOne
            loading={isPending}
            disabled={isPending || teacher?.status === "pending"}
            level={
              teacher?.status === "pending"
                ? "Waiting for Review"
                : teacher?.status === "rejected"
                ? "Request Again"
                : "Submit for Review"
            }
          ></ButtonOne>
         </div>
         
        </form>
      )}
    </div>
  );
};

export default TeachOnSN;
