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
    const newKeyword = searchParams.get("keyword");
    const newCurrentPage = searchParams.get("currentPage");

    if (keyword !== newKeyword) {
      navigate(
        setSearchParams(
          `?${new URLSearchParams({
            keyword: newKeyword,
            currentPage: newCurrentPage,
          })}`
        )
      );
      dispatch(
        searchKeywords({
          keyword: newKeyword,
          page: newCurrentPage,
        })
      );
    }
    // dispatch(
  }, [searchParams]);

  useEffect(() => {
    console.log("2nd useEffect");
  }, []);

  return (
    <Wrap>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledResults
          results={results}
          keyword={keyword}
          isError={isError}
          setSearchParams={setSearchParams}
          currentPage={currentPage}
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
