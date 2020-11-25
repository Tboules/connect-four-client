import React from "react";
import styled from "styled-components";
import { useGame } from "../../context/Game";
import { boardArr } from "../../utils";

const StyledResetButton = styled.button`
  align-self: center;
  border: none;
  background-color: #56adca;
  color: white;
  height: 50px;
  width: 150px;
  cursor: pointer;
  border-radius: 12px;
  outline: none;
  font-size: 1rem;

  :hover {
    background-color: #1750e1;
  }
`;

const Reset = () => {
  const { setBoard, setGameOver, setTurn, setCurrentTile } = useGame();

  const handleReset = () => {
    setGameOver(false);
    setTurn("yellow");
    setCurrentTile([0, -1]);
    setBoard(boardArr);
  };

  return (
    <div style={{ display: "flex" }}>
      <StyledResetButton onClick={handleReset}>Reset Game</StyledResetButton>
    </div>
  );
};

export default Reset;
