import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ pageCount, currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={21} //пицц на странице
      pageCount={pageCount} //количество страниц
      forcePage={currentPage - 1}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
