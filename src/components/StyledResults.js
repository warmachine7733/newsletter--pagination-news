import React from "react";
import styled from "styled-components";
import { NoResult } from "./NoResult";

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
  width: 80%;
  border-radius: 1rem;
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
  padding: 4px;
  font-size: 12px;
  @media (max-width: 900px) {
    padding: 4px;
    font-size: 10px;
  }
`;

const Anchor = styled.a`
  width: 200px;
  text-decoration: none;
  color: black;
`;

export const StyledResults = ({ results, keyword, isError }) => {
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
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={each.webUrl}
                target="_blank"
                rel="noreferrer"
              >
                {each.fields.headline}
              </a>
              <div>keywords</div>
            </Description>
          </SubWrap>
        ))
      ) : (
        <NoResult />
      )}
    </Wrap>
  );
};
