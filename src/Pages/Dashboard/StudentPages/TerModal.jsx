import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StarRatings from "react-star-ratings";
import useAuth from "../../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TerModal = ({ isOpen, close, classData }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutate: handleFeedback, isPending } = useMutation({
    mutationFn: async (feedbackData) => {
      const res = await axiosSecure.post("/feedback", feedbackData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Feedback submitted successfully.", "success");
    },
    onError: () => {
      Swal.fire(
        "Error!",
        "Failed to submit feedback. Please try again.",
        "error"
      );
    },
  });

  const handleSubmit = () => {
    const feedbackData = {
      studentName: user?.displayName,
      studentEmail: user?.email,
      title: classData?.title,
      classId: classData?._id,
      studentImage: user?.photoURL,
      description,
      rating,
      date: new Date().toISOString(),
    };

    handleFeedback(feedbackData);
    close();
    setDescription("");
    setRating(0);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/60">
        {/*  semi-dark overlay bg */}
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-[#1e293b] p-6 shadow-xl duration-300 ease-out text-white"
          >
            {/*  bg color updated to slate-800 (#1e293b) */}
            <DialogTitle
              as="h3"
              className="text-xl font-bold text-white mb-4 border-b border-white/20 pb-2"
            >
              Teaching Evaluation Report
            </DialogTitle>

            <div className="mb-4">
              <label className="block text-sm text-white mb-1">
                Description
              </label>
              <textarea
                className="w-full p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
                placeholder="Write your feedback..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white mb-1">Rating</label>
              <StarRatings
                rating={rating}
                starRatedColor="#facc15"
                changeRating={(newRating) => setRating(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="5px"
              />
            </div>

            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-2 rounded shadow-md transition duration-200"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TerModal;
