import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ClassUpdateModal = ({ isOpen, close, classData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: updateClass, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/classes/${classData._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Class updated successfully", "success");
      close();
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update class", "error");
    },
  });

  const onSubmit = (data) => {
    updateClass(data);
  };

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-[var(--background)] p-6 shadow-lg space-y-4">
          <DialogTitle className="text-lg font-bold mb-2">
            Update Class
          </DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-medium">Title</label>
              <input
                defaultValue={classData?.title}
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500">Title is required</p>
              )}
            </div>

            <div>
              <label className="font-medium">Price</label>
              <input
                defaultValue={classData?.price}
                type="number"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-red-500">Price is required</p>
              )}
            </div>

            {/* <div>
              <label className="font-medium">Image URL</label>
              <input
                {...register("image", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500">Image is required</p>
              )}
            </div> */}

            <div>
              <label className="font-medium">Description</label>
              <textarea
                defaultValue={classData?.description}
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.description && (
                <p className="text-red-500">Description is required</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={close} className="btn btn-outline">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary"
              >
                {isPending ? "Updating..." : "Update"}
                
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ClassUpdateModal;
