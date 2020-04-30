import styled from "styled-components";
import { Contained } from "./Contained";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";
import { useRef, useEffect } from "react";

const BackArrowButtonContainer = styled.div`
  width: 70px;
  height: 30px;

  cursor: pointer;
`;

const BackArrowButtonHead = styled.div`
  width: 17px;
  height: 17px;
  border-left-style: solid;
  border-bottom-style: solid;
  border-left-width: 6px;
  border-bottom-width: 6px;
  border-left-color: ${props => props.theme.colors.white};
  border-bottom-color: ${props => props.theme.colors.white};
  transform: rotate(45deg);
  margin-left: 20px;

  transition: border 0.3s ease-out;

  ${BackArrowButtonContainer}:hover & {
    border-left-color: ${props => props.theme.colors.green};
    border-bottom-color: ${props => props.theme.colors.green};
  }
`;

type BackArrowButtonProps = {
  onClick: () => void;
};

export const BackArrowButton = ({
  onClick, 
}: BackArrowButtonProps): JSX.Element => {
  return (
    <BackArrowButtonContainer
      onClick={onClick}
      onKeyPress={accessibleEnterKeyPress(onClick)}
      tabIndex={0}
      role="button"
      aria-label="Go Back One Layer in Menu"
    >
      <BackArrowButtonHead />
    </BackArrowButtonContainer>
  );
};
