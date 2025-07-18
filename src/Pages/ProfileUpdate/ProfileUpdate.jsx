import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ProfileUpdate = () => {
  const { state } = useLocation();
  const from = state ? state : "/";
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.patch("/users/update", userData);
      return res.data;
    },
    onSuccess: () => {
      navigate(from);
      reset();
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || error.message,
      });
    },
  });

  const onSubmit = async (data) => {
    updateUser(data);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (userData?.phone) {
    navigate(from);
  }

  return (
    <div>
      <Helmet>
        <title>Profile update</title>
      </Helmet>
      <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Your Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              {...register("name", { required: "Name is required" })}
              className="w-full input bg-gray-100  input-bordered"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              {...register("email")}
              className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full input input-bordered"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            {isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
