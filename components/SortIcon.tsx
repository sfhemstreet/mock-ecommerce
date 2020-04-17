import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";
import { DisplayAtMedia } from "./DisplayAtMedia";
import { Txt } from "./Txt";

const SortContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: color 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.rose};
  }
`;

const SortSVG = styled.svg`
  width: 30px;
  height: 30px;
  fill: ${props => props.theme.colors.white};

  transition: fill 0.3s ease-in;

  ${SortContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

type SortIconProps = {
  onClick: () => void;
};

export const SortIcon = ({ onClick }: SortIconProps) => {
  return (
    <SortContainer
      onClick={onClick}
      onKeyPress={accessibleEnterKeyPress(onClick)}
      tabIndex={0}
    >
      <SortSVG
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
      </SortSVG>  
   
        <Txt alignCenter small>Sort</Txt>
      
    </SortContainer>
  );
};
