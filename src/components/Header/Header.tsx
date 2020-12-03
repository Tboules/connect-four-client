import React from "react";
import styled from "styled-components";

const StyledHeaderWrap = styled.div`
  padding: 10px 10% 10px 10%;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  height: 70px;
`;

const Header: React.FC = ({ children }) => {
  return <StyledHeaderWrap>{children}</StyledHeaderWrap>;
};

export default Header;
