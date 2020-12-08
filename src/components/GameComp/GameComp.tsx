import React from "react";
import { GameProvider } from "../../context/Game";
import { Board } from "../Board/Board";
import Messenger from "../Messenger/Messenger";
import Reset from "../Reset/Reset";
import Status from "../Status/Status";

const GameComp = () => {
  return (
    <div>
      <GameProvider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Status />
            <Board />
            <Reset />
          </div>
          <Messenger />
        </div>
      </GameProvider>
    </div>
  );
};

export default GameComp;
