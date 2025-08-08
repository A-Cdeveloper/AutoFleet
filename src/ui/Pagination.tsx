import React from "react";
import { useCallback } from "react";
import { Button } from "@/ui";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = React.memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const canGoBack = currentPage > 1;
    const canGoForward = currentPage < totalPages;

    const handlePrevious = useCallback(() => {
      onPageChange(currentPage - 1);
    }, [onPageChange, currentPage]);

    const handleNext = useCallback(() => {
      onPageChange(currentPage + 1);
    }, [onPageChange, currentPage]);

    return (
      <div className="border-t flex justify-end items-center p-2 my-2">
        <Button
          variation="transparent"
          size="small"
          onClick={handlePrevious}
          disabled={!canGoBack}
          aria-label="Predhodna stranica"
        >
          Predhodna
        </Button>

        <span className="px-3 py-1 border rounded">
          Stranica {currentPage} od {totalPages}
        </span>

        <Button
          variation="transparent"
          size="small"
          onClick={handleNext}
          disabled={!canGoForward}
          aria-label="Sledeća stranica"
        >
          Sledeća
        </Button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
