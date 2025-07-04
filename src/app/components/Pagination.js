import React from "react";
import { PiCaretLeftThin } from "react-icons/pi";
import { PiCaretRightThin } from "react-icons/pi";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  onNextPage = () => {},
  onPrevPage = () => {},
  hasNext = false,
  hasPrev = false,
}) => {
  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        pages.push(1);
        if (totalPages > 5) {
          pages.push("...");
        }
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center mt-4">
      <ul className="flex items-center -space-x-px h-10 text-base gap-[8px]">
        {/* Previous Button */}
        <li>
          <button
            onClick={onPrevPage}
            disabled={!hasPrev}
            className={`flex items-center justify-center px-3 h-10 leading-tight rounded-[4px] transition-colors ${
              hasPrev
                ? "text-lightGray bg-white hover:bg-lightPeach hover:text-white cursor-pointer"
                : "text-gray-300 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <span className="sr-only">Previous</span>
            <PiCaretLeftThin className="w-5 h-5" />
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`flex items-center justify-center px-4 h-10 leading-tight rounded-[4px] transition-colors ${
                  page === currentPage
                    ? "bg-lightPeach text-white"
                    : "bg-white text-lightPeach hover:bg-lightPeach hover:text-white"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={onNextPage}
            disabled={!hasNext}
            className={`flex items-center justify-center px-3 h-10 leading-tight rounded-[4px] transition-colors ${
              hasNext
                ? "text-lightGray bg-white hover:bg-lightPeach hover:text-white cursor-pointer"
                : "text-gray-300 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <span className="sr-only">Next</span>
            <PiCaretRightThin className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
