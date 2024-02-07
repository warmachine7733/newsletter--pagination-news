import React from "react";
import styled from "styled-components";
import { NoResult } from "./NoResult";
import { UseDispatch, useDispatch } from "react-redux";

const Wrap = styled.div`
  min-height: 10rem;
  max: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h5``;

const SubWrap = styled.div`
  display: flex;
  height: 100%;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 40%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: #f5f5f5;
  border-radius: 1rem;
  @media (max-width: 900px) {
    padding: 0.4rem;
    margin: 0.5rem;
    width: 80%;
  }
`;
const Image = styled.img`
  border-radius: 1rem;
  min-width: 130px;
  max-width: 130px;
  src: ${(props) => props.src};
  @media (max-width: 900px) {
    width: 60%;
    max-width: -webkit-fill-available;
  }
`;

const Description = styled.div`
  min-width: 150px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 15px;
  font-size: 12px;
  @media (max-width: 900px) {
    padding: 12px;
    font-size: 10px;
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  color: black;
  font-size: 15px;
  font-weight: 600;
`;
const DescriptionAnchor = styled.a`
  text-decoration: none;
  color: black;
  font-size: 15px;
  font-weight: 600;
`;

const Keywords = styled.button`
  color: blue;
  border: 0.5px solid black;
  margin: 2px;
  font-size: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const WrapperKeywords = styled.div`
  padding-top: 25px;
`;
export const StyledResults = ({
  results,
  keyword,
  isError,
  searchKeywords,
}) => {
  const dispatch = useDispatch();
  return (
    <Wrap>
      <Title>Showing result for "{keyword}"</Title>
      {results && results.length > 0 && !isError ? (
        results.map((each, i) => (
          <SubWrap key={each.apiUrl}>
            <Anchor href={each.webUrl} target="_blank" rel="noreferrer">
              <Image
                src={
                  each.fields.thumbnail ||
                  `${process.env.PUBLIC_URL}/logo192.png`
                }
              />
            </Anchor>
            <Description>
              <DescriptionAnchor
                style={{ textDecoration: "none", color: "black" }}
                href={each.webUrl}
                target="_blank"
                rel="noreferrer"
              >
                {each.fields.headline}
              </DescriptionAnchor>
              <WrapperKeywords>
                keyword:
                {each.tags.length > 0
                  ? each.tags.map((each) => (
                      <Keywords
                        onClick={() =>
                          dispatch(searchKeywords({ keyword: each.webTitle }))
                        }
                      >
                        {each.webTitle}
                      </Keywords>
                    ))
                  : ""}
              </WrapperKeywords>
            </Description>
          </SubWrap>
        ))
      ) : (
        <NoResult />
      )}
    </Wrap>
  );
};
