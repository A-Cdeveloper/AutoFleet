type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className="border-t flex justify-end items-center p-2 my-2 ">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
      >
        Predhodna
      </button>

      <span className="px-3 py-1 border rounded">
        Stranica {currentPage} od {totalPages}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
      >
        Sledeća
      </button>
    </div>
  );
};

export default Pagination;
