import React from "react";
import { useGame } from "../../context/Game";
import styled from "styled-components";

const StyledStatusWrap = styled.div`
  padding: 40px;
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
