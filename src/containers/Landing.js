import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchKeywords, resetStore } from "../store/reducers";

let Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Landing = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    /**clear store */
    dispatch(resetStore());
  }, [dispatch]);

  const handleClick = async () => {
    if (keyword.trim() !== "") {
      await dispatch(searchKeywords({ keyword }));
      navigate(`results?${new URLSearchParams({ keyword, currentPage: 1 })}`);
    }
  };
  const handleKeyPress = (e) => {
    if (keyword.trim() !== "") {
      if (e.key === "Enter") {
        handleClick();
      }
    }
  };
  return (
    <Wrap>
      <h1>News Lister</h1>
      <InputWrapper>
        <StyledInput
          placeholder="search news!"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <StyledButton onClick={handleClick}>
          <i className="fa fa-search"></i>
        </StyledButton>
      </InputWrapper>
    </Wrap>
  );
};
export default Landing;
