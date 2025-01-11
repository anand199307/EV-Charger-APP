import React from "react";

const PaginationButtons = ({
  currentPage,
  totalPages,
  setCurrentPage,
  onPreviousClick,
  onNextClick,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPreviousClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onNextClick(currentPage + 1);
    }
  };


  return (
    <div className="w-full flex justify-between items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        style={{ border: "1px solid #D0D5DD", cursor: "pointer" }}
        className="p-2 rounded-lg text-[0.833vw]"
      >
        Previous
      </button>

      <div className="text-[0.833vw]">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{ border: "1px solid #D0D5DD", cursor: "pointer" }}
        className="p-2 rounded-lg text-[0.833vw]"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
