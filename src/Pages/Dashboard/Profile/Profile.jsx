import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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

  const {
    data: userData = [],
 
    // isError,
    // error,
    // refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="max-w-sm mx-auto bg-[var(--background)] rounded-xl p-6 space-y-4 text-[var(--text)]">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={userData?.photo}
            alt={userData?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold">
            {userData?.name}
          </h2>
          <p className="text-sm ">{userData?.email}</p>
          <p className="text-sm">
            <strong>Role:</strong> {teacher.status === 'accepted' ? 'teacher' : userData?.role || "user"}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {userData?.phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
