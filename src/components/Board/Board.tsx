import React from "react";
import styled from "styled-components";
import { useGame } from "../../context/Game";
import { FillButton } from "../FillButton/FillButton";
import produce from "immer";

const COLUMNS = [0, 1, 2, 3, 4, 5, 6];

const BoardWrap = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 100px;
  border-radius: 4px;
`;
const Column = styled.div`
  width: 110px;
  padding: 0;
  margin: 0;
`;
const Tile = styled.div`
  background-color: #1750e1;
  width: 110px;
  height: 100px;
  padding: 0;
  margin: 0;
  position: relative;
  text-align: center;
  line-height: 120px;
  cursor: pointer;

  :after {
    content: "";
    position: absolute;
    top: 10px;
    left: 15px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
`;

// interface BoardProps {}

export const Board = () => {
  const { board, turn, setBoard, setCurrentTile, gameOver } = useGame();

  const handleTurn = (column: number) => {
    if (gameOver) {
      return;
    }
    const newBoard = produce(board, (draftBoard) => {
      for (let i = draftBoard.length - 1; i >= 0; i--) {
        if (draftBoard[i][column] === "white") {
          draftBoard[i][column] = turn;
          setCurrentTile([i, column]);
          break;
        }
      }
    });
    setBoard(newBoard);
  };

  const renderTile = (column: number, row: number) => {
    return (
      <Tile
        color={board[column][row]}
        onClick={() => handleTurn(row)}
        style={{
          color: `${board[column][row]}`,
        }}
      >
        {board[column][row]}
      </Tile>
    );
  };

  return (
    <BoardWrap>
      {COLUMNS.map((column) => {
        return (
          <Column key={column}>
            <FillButton click={() => handleTurn(column)} />
            {renderTile(0, column)}
            {renderTile(1, column)}
            {renderTile(2, column)}
            {renderTile(3, column)}
            {renderTile(4, column)}
            {renderTile(5, column)}
          </Column>
        );
      })}
    </BoardWrap>
  );
};
