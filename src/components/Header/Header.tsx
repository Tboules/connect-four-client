import React from "react";
import styled from "styled-components";

const StyledHeaderWrap = styled.div`
  padding: 10px 10% 10px 10%;
  display: flex;
  background-color: whitesmoke;
`;

const Header: React.FC = ({ children }) => {
  return <StyledHeaderWrap>{children}</StyledHeaderWrap>;
};

export default Header;
