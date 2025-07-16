import React from "react";

const Pagination = ({setCurrentPage,currentPage,data}) => {
    
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => (prev - 1))}
        className="btn btn-sm"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {[...Array(data.totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`btn btn-sm ${
            currentPage === index + 1 ? "bg-primary text-white" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((prev) => (prev + 1))
        }
        className="btn btn-sm"
        disabled={currentPage >= data?.totalPages}
      >
        Next
      </button>
      
    </div>
  );
};

export default Pagination;
