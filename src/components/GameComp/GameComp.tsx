import React from "react";
import { GameProvider } from "../../context/Game";
import { Board } from "../Board/Board";
import Reset from "../Reset/Reset";
import Status from "../Status/Status";

const GameComp = () => {
  return (
    <div>
      <GameProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Status />
          <Board />
          <Reset />
        </div>
      </GameProvider>
    </div>
  );
};

export default GameComp;
