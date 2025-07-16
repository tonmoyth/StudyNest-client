import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {state} = useLocation();
  const redirect = state ? state : '/'

  const { mutate: saveGoogleUser } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post("/users", userData);
      return res.data;
    },
    onSuccess: () => {
      navigate('/profileUpdate', {state});

    //   Swal.fire({
    //     icon: "success",
    //     title: "Login Successful!",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    },
    onError: (error) => {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "User Save Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;
        //  Optional: send user data to backend here
        const userInfo = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
          role: "user", // default role
          createdAt: new Date().toISOString(),
          last_login: new Date().toISOString()
        }
        saveGoogleUser(userInfo);
        navigate(redirect)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      aria-label="Log in with Google"
      className="p-3 rounded-sm hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5 fill-current"
      >
        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
      </svg>
    </button>
  );
};

export default GoogleLogin;
