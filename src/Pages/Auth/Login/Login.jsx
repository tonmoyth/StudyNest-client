import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import GoogleLogin from "../../../shared/SocialLogin/GoogleLogin";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/'); 
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
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
              className="w-full px-4 py-3 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
          >
            Login
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <GoogleLogin />
        </div>

        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="underline dark:text-gray-800 ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
