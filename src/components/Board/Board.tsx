import React, { useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../../context/Game";
import { FillButton } from "../FillButton/FillButton";
import produce from "immer";
import { useSocketChat } from "../Messenger/useSocket";
import { getGame } from "../../API";

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

export const Board = () => {
  const { turn, setCurrentTile, gameOver, currentTile } = useGame();
  const room = window.localStorage.getItem("gameId");
  const { socketBoard, sendBoard } = useSocketChat(room);

  useEffect(() => {
    const grabGame = async () => {
      const game = await getGame(room);
      sendBoard(game?.data[0].gameBoard, game?.data[0].lastTile);
    };
    grabGame();
  }, []);

  const handleTurn = (column: number) => {
    if (gameOver) {
      return;
    }
    let newTile: number[] = [0, -1];
    const newBoard = produce(socketBoard.body.board, (draftBoard) => {
      for (let i = draftBoard.length - 1; i >= 0; i--) {
        if (draftBoard[i][column] === "white") {
          draftBoard[i][column] = turn;
          setCurrentTile([i, column]);
          newTile = [i, column];
          break;
        }
      }
    });
    sendBoard(newBoard, newTile);
  };

  const renderTile = (column: number, row: number) => {
    const boardRender = () => {
      return socketBoard.body.board[column][row];
    };
    return (
      <Tile
        color={boardRender()}
        onClick={() => handleTurn(row)}
        style={{
          color: `${boardRender()}`,
        }}
      >
        {boardRender()}
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
