import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import ButtonOne from "../../../../Components/ButtonOne/ButtonOne";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  //   search
  const { data: searchResults = [], isLoading: isSearchLoading } = useQuery({
    queryKey: ["search-user", search],
    enabled: !!search,
    queryFn: async () => {
      if (!search) return [];
      const res = await axiosSecure.get(`/users/search?query=${search}`);
      return res.data;
    },
  });

  const {
    data: users = [],
    isLoading: isUsersLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const displayedUsers = Array.isArray(search ? searchResults : users)
    ? search
      ? searchResults
      : users
    : [];
  //   user role admin set
  const { mutate: makeAdmin } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch("/users/make-admin", { email });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User promoted to admin.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to promote user.", "error");
    },
  });

  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to promote this user to Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(email);
      }
    });
  };

  if (isUsersLoading) return <Loading></Loading>;

  if (isError)
    return <p className="text-center text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
     
      
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="grow"
              placeholder="Search"
            />
          </label>
       
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-[var(--background)]">
              <th>NO</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isSearchLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            ) : displayedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              displayedUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={user.photo}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                   
                    <ButtonOne onClick={() => handleMakeAdmin(user?.email)} disabled={user.role === "admin"} level={user.role === 'admin' ? 'Already Admin' : 'Make Admin'}></ButtonOne>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
