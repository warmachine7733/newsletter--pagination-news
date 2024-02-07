import React, { useEffect } from "react";
import { StyledResults } from "../components/StyledResults";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { StyledPagination } from "../components/StyledPagination";
import { searchKeywords } from "../store/reducers";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";

const Wrap = styled.div`
  height: 90vh;
  overflow: scroll;
`;

const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const currentPage = useSelector((state) => state.search.currentPage);
  const results = search.data && search.data.results;
  const pages = search.data && search.data.pages;
  const isLoading = useSelector((state) => state.search.isLoading);
  const isError = useSelector((state) => state.search.isError);
  const { keyword } = search;

  useEffect(() => {
    console.log("calling");
    navigate(
      setSearchParams(`?${new URLSearchParams({ keyword, currentPage })}`)
    );
    dispatch(
      searchKeywords({
        keyword: keyword ? keyword : searchParams.get("keyword"),
        page: currentPage ? currentPage : searchParams.get("currentPage"),
      })
    );
  }, [dispatch, keyword, currentPage]);

  return (
    <Wrap>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledResults
          results={results}
          keyword={keyword}
          isError={isError}
          searchKeywords={searchKeywords}
        />
      )}

      <StyledPagination
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </Wrap>
  );
};

export default Results;
