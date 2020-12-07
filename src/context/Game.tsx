import React, { useState, useEffect } from "react";
import { useSocketChat } from "../components/Messenger/useSocket";
import { boardArr, turnCheck, winCheck } from "../utils";

type GameContextValue = {
  // board: string[][];
  turn: string;
  // setBoard: (board: GameContextValue["board"]) => void;
  setTurn: (turn: GameContextValue["turn"]) => void;
  gameOver: boolean;
  setGameOver: (gameOver: GameContextValue["gameOver"]) => void;
  currentTile: number[];
  setCurrentTile: (currentTile: GameContextValue["currentTile"]) => void;
  status: string;
  setStatus: (status: GameContextValue["status"]) => void;
};

const GameContext = React.createContext<GameContextValue | null>(null);

export const GameProvider: React.FC = ({ children }) => {
  // const [board, setBoard] = useState<GameContextValue["board"]>(boardArr);
  const [turn, setTurn] = useState<GameContextValue["turn"]>("yellow");
  const [gameOver, setGameOver] = useState<GameContextValue["gameOver"]>(false);
  const [currentTile, setCurrentTile] = useState<
    GameContextValue["currentTile"]
  >([0, -1]);
  const [status, setStatus] = useState<GameContextValue["status"]>(
    `It's ${turn}'s turn!`
  );

  const room = window.localStorage.getItem("gameId");
  const { socketBoard, sendBoard } = useSocketChat(room);

  const { board, tile } = socketBoard.body;

  useEffect(() => {
    if (winCheck(board, tile)) {
      setGameOver(true);
    }

    setTurn(turnCheck(board));
    setStatus(`It's ${turn}'s turn!`);
    console.log(board);
    // sendBoard(board);
    if (gameOver) {
      setStatus(`${board[tile[0]][tile[1]]} wins!`);
    }
  }, [board, gameOver, tile, turn]);

  return (
    <GameContext.Provider
      value={{
        turn,
        setTurn,
        gameOver,
        setGameOver,
        currentTile,
        setCurrentTile,
        status,
        setStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be rendered within the GameProvider");
  }
  return context;
}
