import { PaginationProps } from "@/interfaces/pagination-interface";

export const Pagination  = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 font-semibold">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
