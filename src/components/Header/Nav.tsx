import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { checkGame, storeGameId, deleteGame } from "../../API";
import { useUser } from "../../context/UserContext";

const StyledNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    padding: 5px;
  }

  li {
    padding-right: 45px;
  }

  a {
    text-decoration: none;
    color: #444;
    font-size: 1.1rem;
  }

  a:hover {
    color: #1750e1;
  }
`;

const Nav = () => {
  const { userInfo } = useUser();
  let location = useLocation();
  const room: any = window.localStorage.getItem("gameId");

  const handleLeave = async () => {
    await storeGameId({
      currentUserId: userInfo.currentUserId,
      gameInstance: "",
      playerColor: "",
    });

    const gameInfo = await checkGame(room);
    if (!gameInfo.number) {
      deleteGame(room);
    }
  };

  return (
    <div>
      <StyledNav>
        {location.pathname === "/sign-in" ||
        location.pathname === "/register" ||
        location.pathname === "/" ? (
          <ul>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              {location.pathname !== "/join-or-create" && (
                <Link to="/join-or-create" onClick={handleLeave}>
                  Leave Game
                </Link>
              )}
            </li>
            <li>
              <Link to="/sign-in" onClick={handleLeave}>
                Log Out
              </Link>
            </li>
          </ul>
        )}
      </StyledNav>
    </div>
  );
};

export default Nav;
