import { PaginationProps } from "@/types/paginate";
import { useState, useEffect, useRef } from "react";

const Pagination = ({ page, pageSize, totalItems, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePageChange = async (newPage: number) => {
    if ((page * pageSize) >= totalItems) return;
    if (newPage >= 1 && newPage <= totalPages) {
      try {
        await onPageChange(newPage);
      } catch (error) {
        console.error('Error fetching new page:', error);
      } finally {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500); //  (1.5 seconds)
      }
    }
  };

  const loadedItem = (page * pageSize) > totalItems ? totalItems : (page * pageSize);

  return (
    <div className='container mx-auto mt-8'>
      <div className='flex justify-center items-center'>
        <span className='mx-2 dark:text-gray-100'>
          Showing {loadedItem} of {totalItems}
        </span>
      </div>
      {(page * pageSize) < totalItems && (
        <div className='flex justify-center items-center mt-4'>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handlePageChange(page + 1)}
          >
            Load More
          </button>
        </div>
      )}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Pagination;
