import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "../../../shared/SocialLogin/GoogleLogin";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {user, createUser,loading: userLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // useMutation to POST user
  const { mutate: saveInfo } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post("/users", userData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      reset();
      navigate("/profileUpdate", { state });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "User save failed",
        text: "Please try again.",
      });
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    const { email, password, username, photo } = data;

    createUser(email, password)
      .then(() => {
        updateUserProfile(username, photo)
          .then(() => {
            // store user information database
            const userInfo = {
              name: username,
              email: email,
              photo: photo,
              role: "user", // default
              createdAt: new Date().toISOString(),
              last_login: new Date().toISOString(),
            };
            // if(!userLoading){

            // }
            saveInfo(userInfo);
            
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Profile update failed!",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="username"
              placeholder="Username"
              className="w-full px-4 border py-3 rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="space-y-1 text-sm">
            <label htmlFor="photo" className="block dark:text-gray-600">
              Photo URL
            </label>
            <input
              {...register("photo", { required: "Photo URL is required" })}
              type="text"
              id="photo"
              placeholder="Photo URL"
              className="w-full px-4 border py-3 rounded-md"
            />
            {errors.photo && (
              <p className="text-red-500 text-xs">{errors.photo.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 border py-3 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 border py-3 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <GoogleLogin></GoogleLogin>
        </div>

        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Already have an account?
          <Link to="/login" className="underline dark:text-gray-800 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
