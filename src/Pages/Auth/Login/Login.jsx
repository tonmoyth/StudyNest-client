import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import GoogleLogin from "../../../shared/SocialLogin/GoogleLogin";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ButtonOne from "../../../Components/ButtonOne/ButtonOne";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {state} = useLocation();
  const [loading,setLoading] = useState(false);
  const from = state ? state : '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: updateLastLogin } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch("/users/last-login", { email });
      return res.data;
    },
    onSuccess: () => {

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false)
      navigate(from);
    },
    onError: (err) => {
      setLoading(false)
      Swal.fire({
        icon: "warning",
        title: "Login OK but tracking failed",
        text: err.response?.data?.message || "Last login update failed.",
      });
    },
  });

  const onSubmit = (data) => {
    setLoading(true)
    const { email, password } = data;

    signIn(email, password)
      .then(() => {
        updateLastLogin(email);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] px-4 flex justify-center items-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div data-aos="fade-up" className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[var(--background)]">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block ">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 border py-3 rounded-md "
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block ">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-4 py-3 border rounded-md "
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <ButtonOne loading={loading} level="Login"></ButtonOne>
          </div>

          
        </form>

        {/* Social Login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 "></div>
          <p className="px-3 text-sm ">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 "></div>
        </div>

        <div className="flex justify-center space-x-4">
          <GoogleLogin />
        </div>

        <p className="text-xs text-center sm:px-6 ">
          Don't have an account?
          <Link state={from} to="/register" className="underline text-primary  ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
