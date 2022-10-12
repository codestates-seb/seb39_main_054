import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ShopCardContent from "../../../components/cards/ShopCardContent";
import DataLoading from "../../../components/loading/DataLoading";
import { useDispatch, useSelector } from "react-redux";
import { paginationInfo } from "../../../redux/actions/paginationAction";
import ListDataEmpty from "../../../components/loading/DataEmpty";

const ShopListContent = () => {
  // 데이터
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filtersReducer);
  const pageNum = useSelector((state) => state.paginationReducer.page);

  // 데이터 받기
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/store`, {
        params: { page: 1, size: 8 },
      })
      .then((res) => {
        setData(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(true);
      });
  };

  const getFilterData = async () => {
    const params = {
      page: pageNum,
      size: 8,
      ...(filter.categorySelect !== "" &&
        filter.categorySelect !== "전체" && {
          scategoryName: filter.categorySelect,
        }),
      ...(filter.searchSelect !== "" && { keyword: filter.searchSelect }),
    };

    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/store`, {
        // 파람스 요청
        params,
      })
      .then((res) => {
        setData(res.data.data);
        dispatch(paginationInfo(res.data.pageInfo));
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getFilterData();
  }, [filter, pageNum]);

  return (
    <Content>
      {loading ? (
        <DataLoading></DataLoading>
      ) : (
        <>
          {data !== null && data.length === 0 && (
            <ListDataEmpty></ListDataEmpty>
          )}
          {data !== null && <ShopCardContent data={data}></ShopCardContent>}
        </>
      )}
    </Content>
  );
};

export default ShopListContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  width: 68rem;

  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 36rem;
  }

  @media ${(props) => props.theme.mobile} {
    width: 26.75rem;
  }

  .title {
    font-size: 1.625rem;
    font-family: "NotoSansKR-Medium";
    margin-bottom: 4.5rem;
  }
`;
