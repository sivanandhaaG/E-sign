import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

const PaginationWrapper = ({ currentPage, totalPages, prevPage, nextPage }) => {
  const pagesToShow = 2;

  let startPage, endPage;

  if (totalPages <= pagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const half = Math.floor(pagesToShow / 2);
    if (currentPage <= half) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + half >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - half;
      endPage = currentPage + half;
    }
  }

  const pageItems = [];

  if (startPage > 1) {
    pageItems.push(
      <Pagination.Item key={1} onClick={() => nextPage(1)}>
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      pageItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => nextPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    pageItems.push(
      <Pagination.Item key={totalPages} onClick={() => nextPage(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <div className="pagination-wrapper">
      <Pagination>
        <Pagination.Prev
          onClick={() => prevPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Pagination.Prev>
        {pageItems}
        <Pagination.Next
          onClick={() => nextPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

PaginationWrapper.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};


export default PaginationWrapper;
