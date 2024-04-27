import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Pagination">
      <div className="flex justify-center">
        <button
          className={`mx-1 px-3 py-2 rounded-lg cursor-pointer ${
            currentPage === 1
              ? "bg-gray-200 text-gray-700"
              : "bg-blue-500 text-white"
          }`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-2 rounded-lg cursor-pointer ${
              currentPage === number
                ? "bg-black text-white "
                : "bg-white border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`mx-1 px-3 py-2 rounded-lg cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-700"
              : "bg-blue-500 text-white"
          }`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <MdNavigateNext />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
