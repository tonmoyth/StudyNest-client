import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading ) return
      const secure = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    
    return () => axiosSecure.interceptors.request.eject(secure)
  }, [user, loading]);

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 403) {
        navigate("/forbidden");
      }
      if (error.status === 401) {
        logOut()
          .then(() => {
            navigate("/login");
          })
          .then(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
