const Pagination = ({
  page,
  total,
  onPageChange,
}: {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < total) onPageChange(page + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(total, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            page === i
              ? 'bg-orange-600 text-white'
              : 'bg-white text-orange-600 hover:bg-orange-100'
          }`}
        >
          {i}
        </button>,
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>,
      );
    }

    if (endPage < total) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={`px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={page === total}
        className={`px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
