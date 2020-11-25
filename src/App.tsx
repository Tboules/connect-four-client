import React from "react";
import { Board } from "./components/Board/Board";
import { GameProvider } from "../src/context/Game";
import Status from "./components/Status/Status";
import Header from "./components/Header/Header";
import Reset from "./components/Reset/Reset";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Header>
          <h1
            id="headerTitle"
            style={{
              flex: "1",
            }}
          >
            Connect Four
          </h1>
          <Reset />
        </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Status />
          <Board />
        </div>
      </GameProvider>
    </div>
  );
}

export default App;
