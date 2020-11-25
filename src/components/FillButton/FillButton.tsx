import React from "react";
import styled from "styled-components";
import { useGame } from "../../context/Game";

interface FillButtonProps {
  click: any;
}

const ButtCont = styled.div`
  transform: translateY(-20px);
`;

const Butt = styled.button<{ turnColor: string }>`
  width: 80px;
  border: none;
  outline: none;
  height: 80px;
  cursor: pointer;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-radius: 50%;
  margin-left: 15px;

  &:hover {
    background-color: ${(props) => props.turnColor};
  }
`;

export const FillButton = ({ click }: FillButtonProps) => {
  const { turn } = useGame();

  return (
    <ButtCont>
      <Butt turnColor={turn} onClick={click}></Butt>
    </ButtCont>
  );
};
