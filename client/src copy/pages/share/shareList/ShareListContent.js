import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ShareCardContent from "../../../components/cards/ShareCardContent";
import { paginationInfo } from "../../../redux/actions/paginationAction";
import { useSelector, useDispatch } from "react-redux";
import ListDataEmpty from "../../../components/loading/DataEmpty";
import DataLoading from "../../../components/loading/DataLoading";

const ShareListContent = () => {
  // 데이터
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filtersReducer);
  const pageNum = useSelector((state) => state.paginationReducer.page);

  // 데이터 받기
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product`, {
        // 파람스 요청
        params: { page: 1, size: 16 },
      })
      .then((res) => {
        setData(res.data.data);
        dispatch(paginationInfo(res.data.pageInfo));
      });
  };

  const getFilterData = async () => {
    const params = {
      page: pageNum,
      size: 16,
      ...(filter.categorySelect !== "" &&
        filter.categorySelect !== "전체" && {
          pcategoryName: filter.categorySelect,
        }),
      ...(filter.searchSelect !== "" && { keyword: filter.searchSelect }),
      ...(filter.shareSatusSelect !== "" &&
        filter.shareSatusSelect !== "전체" && {
          status: filter.shareSatusSelect,
        }),
    };

    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product`, {
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
          {" "}
          {data !== null && data.length === 0 && (
            <ListDataEmpty></ListDataEmpty>
          )}
          {data !== null && <ShareCardContent data={data}></ShareCardContent>}
        </>
      )}
    </Content>
  );
};

export default ShareListContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  width: 72.25rem;

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
