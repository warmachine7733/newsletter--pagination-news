import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import StyledButton from "../components/StyledButton";
import {
  onNavigateNext,
  onNavigatePrev,
  onNavigateCertainIndex,
} from "../store/reducers";

const Wrap = styled.div`
  position: absolute;
  bottom: 2%;
  width: 85%;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CustomActionButtons = styled(StyledButton)`
  border-radius: 10px 0px 0px 10px !important;
`;
const StyledHyperLinkPages = styled.div`
  font-size: 12px;
  font-weight: 100;
  padding: 5px;
  &: hover {
    cursor: pointer;
  }
`;

export const StyledPagination = ({ pages, currentPage, isLoading }) => {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <CustomActionButtons
        onClick={() => dispatch(onNavigatePrev())}
        disabled={currentPage === 1 || isLoading}
      >
        prev
      </CustomActionButtons>

      <StyledHyperLinkPages onClick={() => dispatch(onNavigateCertainIndex(1))}>
        1,
      </StyledHyperLinkPages>
      <StyledHyperLinkPages onClick={() => dispatch(onNavigateCertainIndex(2))}>
        2, ....
      </StyledHyperLinkPages>
      <StyledHyperLinkPages
        onClick={() => dispatch(onNavigateCertainIndex(pages))}
      >
        {pages}
      </StyledHyperLinkPages>

      <StyledButton
        onClick={() => dispatch(onNavigateNext())}
        disabled={currentPage === pages || isLoading}
      >
        next
      </StyledButton>
    </Wrap>
  );
};
