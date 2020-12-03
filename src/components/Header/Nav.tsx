import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <div>
      <StyledNav>
        <ul>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </StyledNav>
    </div>
  );
};

export default Nav;
