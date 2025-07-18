import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import TerModal from "./TerModal";
import { Button } from "@headlessui/react";
import Loading from "../../../Components/Loading/Loading";
import ButtonOne from "../../../Components/ButtonOne/ButtonOne";
import { Helmet } from "react-helmet-async";

const MyEnrolDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loadingId, setLoadingId] = useState(null);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: assignments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: classData = {} } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  const { mutate: submission } = useMutation({
    mutationFn: async (submissionData) => {
      const res = await axiosSecure.post("/assignment-submit", submissionData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Assignment submitted successfully.", "success");
      refetch();
      setLoadingId(null);
    },
    onError: () => {
      Swal.fire(
        "Error!",
        "Failed to submit the assignment. Try again.",
        "error"
      );
    },
  });

  const handleSubmitAssignment = async (assignment, event) => {
    event.preventDefault();
    const assignmentAnswer = event.target.answer.value;

    const submissionData = {
      assignmentId: assignment._id,
      assignmentTitle: assignment.title,
      classId: id,
      studentEmail: user?.email,
      studentName: user?.displayName,
      submissionAnswer: assignmentAnswer,
      submittedAt: new Date().toISOString(),
      status: "pending",
      marks: null,
      feedback: null,
    };
    setLoadingId(assignment._id);
    submission(submissionData);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Enroll details</title>
      </Helmet>
      <div className="flex justify-end mt-4 mr-4">
        <ButtonOne
          onClick={open}
          level="Teaching Evaluation Report"
        ></ButtonOne>
      </div>
      <table className="table w-full mt-4">
        <thead>
          <tr className="bg-[var(--background)]">
            <th>NO</th>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 ">
                No Assignments
              </td>
            </tr>
          ) : (
            <>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                  <td>{index + 1}</td>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.deadline}</td>
                  <td>
                    <form
                      onSubmit={(e) => handleSubmitAssignment(assignment, e)}
                      key={assignment._id}
                      className="flex items-center gap-2"
                    >
                      <input
                        required
                        type="text"
                        name="answer"
                        placeholder="Enter link or answer"
                        className="input input-bordered input-sm w-48"
                      />
                      <button type="submit" className="btn btn-sm btn-primary">
                        {loadingId === assignment._id ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* modal */}
      <TerModal close={close} isOpen={isOpen} classData={classData}></TerModal>
    </div>
  );
};

export default MyEnrolDetails;
