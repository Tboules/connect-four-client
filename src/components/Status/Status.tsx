import React from "react";
import { useGame } from "../../context/Game";
import styled from "styled-components";

const StyledStatusWrap = styled.div`
  width: 100%;

  display: block;

  h2 {
    text-align: center;
  }
`;

const Status = () => {
  const { status } = useGame();
  return (
    <StyledStatusWrap>
      <h2>{status}</h2>
    </StyledStatusWrap>
  );
};

export default Status;
