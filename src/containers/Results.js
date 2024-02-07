import React, { useEffect } from "react";
import { StyledResults } from "../components/StyledResults";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { StyledPagination } from "../components/StyledPagination";
import { searchKeywords } from "../store/reducers";
import styled from "styled-components";
import { createSearchParams, useNavigate } from "react-router-dom";

const Wrap = styled.div`

`;

export const Results = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const currentPage = useSelector((state) => state.search.currentPage);
  const results = search.data && search.data.results;
  const pages = search.data && search.data.pages;
  const isLoading = useSelector((state) => state.search.isLoading);
  const isError = useSelector((state) => state.search.isError);
  console.log("pages", isLoading);
  const { keyword } = search;

  useEffect(() => {
    dispatch(
      searchKeywords({
        keyword,
        page: currentPage,
      })
    );
  }, [dispatch, currentPage]);

  return (
    <Wrap>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledResults results={results} keyword={keyword} isError={isError} />
      )}

      <StyledPagination
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </Wrap>
  );
};
