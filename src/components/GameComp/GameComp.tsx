import React from "react";
import { GameProvider } from "../../context/Game";
import { Board } from "../Board/Board";
import Messenger from "../Messenger/Messenger";
import Reset from "../Reset/Reset";
import Status from "../Status/Status";
import styled from "styled-components";

const StyledGameStatus = styled.div`
  display: flex;
  width: 75%;
  margin-top: 90px;
  align-items: center;
`;

const GameComp = () => {
  return (
    <div>
      <GameProvider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StyledGameStatus>
            <div style={{ marginLeft: "50px", width: "350px" }}>
              <Status />
              <Reset />
            </div>
            <Board />
          </StyledGameStatus>
          <Messenger />
        </div>
      </GameProvider>
    </div>
  );
};

export default GameComp;
