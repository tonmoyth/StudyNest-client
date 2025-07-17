import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import ButtonOne from "../../../../Components/ButtonOne/ButtonOne";

const AddClass = () => {
  const { user } = useAuth();
  const [profileUrl, setProfileUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addClass, isPending } = useMutation({
    mutationFn: async (classData) => {
      const res = await axiosSecure.post("/classes", classData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Class Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/my-classes");
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Class",
        text: "Please try again.",
      });
    },
  });

  const onSubmit = async (data) => {
    if (isImageUploading) {
      Swal.fire({
        icon: "info",
        title: "Please wait",
        text: "Image is still uploading. Try again in a moment.",
      });
      return;
    }

    const classData = {
      title: data.title,
      name: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      description: data.description,
      image: profileUrl,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    addClass(classData);
  };

  const handleProfile = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    setIsImageUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );
      setProfileUrl(res?.data?.data?.url);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setIsImageUploading(false); // uploading complete
    }
  };

  return (
    <div className="lg:w-11/12 mx-auto p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Image</label>
          <input
            onChange={handleProfile}
            type="file"
            accept="image/*"
            // {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {/* {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )} */}
        </div>

        {/* Submit */}
        <div className="flex justify-center py-2">
          <ButtonOne loading={isPending} level="Add Class"></ButtonOne>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
