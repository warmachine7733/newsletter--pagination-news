import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  margin: 5rem;
`;
export const NoResult = () => {
  return (
    <Wrap>
      <p>
        Whoopsie-doodle! 🤷‍♂️ Looks like we're in a pickle 🥒. Failed to get results!
        Fancy trying another search term? 🧐
      </p>
      <Link to="/">Home</Link>
    </Wrap>
  );
};
