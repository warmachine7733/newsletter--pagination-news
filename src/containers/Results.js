import React, { useEffect } from "react";
import { StyledResults } from "../components/StyledResults";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { StyledPagination } from "../components/StyledPagination";
import { searchKeywords } from "../store/reducers";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";

const Wrap = styled.div`
  height: 94vh;
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
  const newKeyword = searchParams.get("keyword");
  const newCurrentPage = parseInt(searchParams.get("currentPage"));

  const handleParams = ({ params, page }) => {
    if (page === "useEffect") {
      setSearchParams(
        `?${new URLSearchParams({
          keyword: page === "useEffect" ? newKeyword : keyword,
          currentPage: currentPage ? currentPage : newCurrentPage,
        })}`
      );
      dispatch(
        searchKeywords({
          keyword: page === "useEffect" ? newKeyword : keyword,
          page: currentPage ? currentPage : newCurrentPage,
        })
      );
    } else {
      setSearchParams(
        `?${new URLSearchParams({
          keyword: page === "keywords" ? params : keyword,
          currentPage: currentPage ? currentPage : newCurrentPage,
        })}`
      );
      dispatch(
        searchKeywords({
          keyword: page === "keywords" ? params : keyword,
          page: currentPage ? currentPage : newCurrentPage,
        })
      );
    }
  };

  useEffect(() => {
    if (
      (keyword !== newKeyword && keyword !== undefined) ||
      (currentPage !== newCurrentPage && currentPage !== undefined)
    ) {
      navigate(handleParams({ params: keyword, page: "useEffect" }));
    }
  }, [keyword, currentPage]);

  return (
    <Wrap>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledResults
          results={results}
          keyword={keyword}
          isError={isError}
          handleParams={handleParams}
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
