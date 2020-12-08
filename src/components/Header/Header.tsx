import React from "react";
import styled from "styled-components";

const StyledHeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  padding: 10px 10% 10px 10%;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  height: 70px;
  z-index: 3;
`;

const Header: React.FC = ({ children }) => {
  return <StyledHeaderWrap>{children}</StyledHeaderWrap>;
};

export default Header;
