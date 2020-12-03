import React from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
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
    padding-left: 10px;
    background-color: whitesmoke;
  }
`;

const JoinOrCreate = () => {
  const { gameId, setGameId } = useUser();

  const handleGenerate = () => {
    setGameId(cryptoRandomString({ length: 5, type: "distinguishable" }));
  };

  return (
    <StyledPageWrap>
      <StyledBox>
        <h2>Join Game!</h2>
        <div>
          <input type="text" />
        </div>
        <button>Join</button>
      </StyledBox>
      <StyledBox>
        <h2>Create a Game!</h2>
        <div>
          <h3>{gameId ? gameId : "Generate an ID"}</h3>
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
