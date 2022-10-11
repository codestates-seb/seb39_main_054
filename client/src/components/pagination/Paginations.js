import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { paginationInfo } from "../../redux/actions/paginationAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Paginations = () => {
  const dispatch = useDispatch();
  const totalPageInfo = useSelector((state) => state.paginationReducer);
  const filters = useSelector((state) => state.filtersReducer);
  const [page, setPage] = useState(1);
  const pageChange = (page) => {
    setPage(page);
    dispatch(paginationInfo({ page: page }));
  };

  useEffect(() => {
    setPage(1);
    dispatch(paginationInfo({ page: 1 }));
  }, [filters]);

  return (
    <Container>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={totalPageInfo.size} // 한 페이지 보여줄 아이템 개수
        totalItemsCount={totalPageInfo.totalElements} // 총 아이템의 개수
        pageRangeDisplayed={5} // 페이지의 범위
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={pageChange}
      />
    </Container>
  );
};

export default Paginations;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: ${(props) => props.theme.textColor};
    li {
      padding: 0.5rem;
      &:hover {
        color: ${(props) => props.theme.primary};
      }
      &.active {
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;
