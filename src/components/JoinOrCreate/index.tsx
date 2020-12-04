import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { checkGame, storeGameId } from "../../API";
import { useHistory, useLocation } from "react-router-dom";
const cryptoRandomString = require("crypto-random-string");

const StyledPageWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 290px;
  background-color: #6ec2dd;
  margin: 50px;
  border-radius: 4px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 30px;
    margin-bottom: 30px;
    color: whitesmoke;
  }

  button {
    width: 150px;
    height: 45px;
    margin-bottom: 35px;
    border: none;
    background-color: #1750e1;
    color: white;
    cursor: pointer;
    border-radius: 12px;
    outline: none;
    font-size: 1rem;
  }

  div {
    height: 100px;
  }

  input {
    height: 45px;
    margin-top: 4px;
    outline: none;
    border: none;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    background-color: whitesmoke;
    text-align: center;
    letter-spacing: 3px;
    font-size: 1rem;
  }
`;

const JoinOrCreate = () => {
  const { gameId, setGameId, userInfo, setUserInfo } = useUser();
  const [joinInput, setJoinInput] = useState<string>("");
  let history = useHistory();

  const handleGenerate = () => {
    const gameNumber: string = cryptoRandomString({
      length: 5,
      type: "distinguishable",
    });
    setGameId(gameNumber);
    setUserInfo({
      ...userInfo,
      gameInstance: gameNumber,
      playerColor: "yellow",
    });
  };

  const handleJoin = async () => {
    const info = await checkGame(joinInput);
    if (info.number === 0) {
      alert("This game does not exist, check your game ID");
    } else if (info.number === 1) {
      setGameId(joinInput);
      setUserInfo({
        ...userInfo,
        gameInstance: joinInput,
        playerColor: "red",
      });
      history.push(`/${joinInput}`);
    } else {
      setGameId(joinInput);
      setUserInfo({
        ...userInfo,
        gameInstance: joinInput,
        playerColor: "spectator",
      });
      history.push(`/${joinInput}`);
    }
  };

  useEffect(() => {
    storeGameId(userInfo);
  }, [userInfo]);

  useEffect(() => {
    window.localStorage.setItem("gameId", gameId);
  });

  console.log(userInfo);
  return (
    <StyledPageWrap>
      <StyledBox>
        <h2>Join Game!</h2>
        <div>
          <input
            value={joinInput}
            maxLength={5}
            type="text"
            onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
          />
        </div>
        <button onClick={handleJoin}>Join</button>
      </StyledBox>
      <StyledBox>
        <h2>Create a Game!</h2>
        <div>
          <h3>{gameId && !joinInput ? gameId : "Generate an ID"}</h3>
        </div>
        {!gameId ? (
          <button onClick={handleGenerate}>Generate ID</button>
        ) : (
          <Link to={`/${gameId}`}>
            <button>Enter Game</button>
          </Link>
        )}
      </StyledBox>
    </StyledPageWrap>
  );
};

export default JoinOrCreate;
