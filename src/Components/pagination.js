import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, active, page }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginTop: 10 }}>
      <div className="row mt-20">
        <div className="col-sm-12 col-md-6 mb-20">
          <div
            className="dataTables_info"
            id="datatable_info"
            role="status"
            aria-live="polite"
          >
            Showing {postsPerPage*(page-1)+1} to {totalPosts < postsPerPage*page ? <>{totalPosts}</> : <>{postsPerPage*page}</>} of {totalPosts} entries
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_paginate paging_simple_numbers float-right">
            <ul className="pagination">
              {pageNumbers.map((page,index) =>
              {
              return (
                <li
                  className={`paginate_button page-item ${active === page ? "active" : ""
                    }`}
                >

                  <button
                    key={index}
                    value={page}
                    id={page}
                    aria-controls="datatable"
                    data-dt-idx="1"
                    tabIndex="0"
                    className="page-link "
                    onClick={(e) => paginate(e)}
                  >
                    {page}
                  </button>
                </li>
              )})}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
