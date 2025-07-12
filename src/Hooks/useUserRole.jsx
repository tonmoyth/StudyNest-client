import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userProfile = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });


  return {
 
    role: userProfile.role,
    isRoleLoading: isLoading,
    refetchRole: refetch,
  };
};

export default useUserRole;
