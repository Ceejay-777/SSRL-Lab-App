import React from "react";
import "./table.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  const noOfPages = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= noOfPages; i++) {
    pages.push(i);
  }

  if (currentPage < 1) {
    setCurrentPage(1);
  }
  if (currentPage > noOfPages) {
    setCurrentPage(noOfPages);
  }

  return (
    <div className="flex justify-between">
      {/* <<< */}
      <button
        className="p-2 text-2xl font-semibold"
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        &lt;&lt;&lt;
      </button>

      {/* < */}
      <button
        className="p-2 text-2xl font-semibold"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        &lt;
      </button>

      {/* pages */}
      <div className="flex gap-6">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page == currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* > */}
      <button
        className="p-2 text-2xl font-semibold"
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        &gt;
      </button>

      {/* >>> */}
      <button
        className="p-2 text-2xl font-semibold"
        onClick={() => {
          setCurrentPage(noOfPages);
        }}
      >
        &gt;&gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
