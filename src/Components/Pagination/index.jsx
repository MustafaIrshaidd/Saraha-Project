import React from "react";
import _ from "lodash";
import styles from "./styles.module.css"

const Pagination = ({ users, pageNumber, pageSize, changePageNumber }) => {
  
  const pageCount = Math.ceil(users.length / pageSize);

  if (pageCount === 1) return <></>;

  const pages = _.range(0, pageCount);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) =>(
            <li className={page == pageNumber ? "page-item active" : "page-item" }  onClick={()=>changePageNumber(page)}>
              <a className={page == pageNumber ? "page-link border-white "+styles["cost-color","cost-background"] : "page-link "+styles["cost-color"] }>
                {page+1}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
