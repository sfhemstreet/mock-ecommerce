import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";

const CloseIconContainer = styled.div`
  width: 33px;
  height: 28px;
  position: relative;
  cursor: pointer;
`;

const CloseIconLine = styled.div<{ angle: number }>`
  width: 33px;
  height: 6px;
  background: ${props => props.theme.colors.white};

  position: absolute;

  top: 11px;
  transform: ${props => `rotate(${props.angle}deg)`};

  transition: all 0.5s ease-in-out;

  ${CloseIconContainer}:hover & {
    background: ${props => props.theme.colors.rose};
  }
`;

type CloseIconProps = {
  onClick: () => void;
};

export const CloseIcon = ({ onClick }: CloseIconProps) => (
  <CloseIconContainer
    onClick={onClick}
    onKeyPress={accessibleEnterKeyPress(onClick)}
    tabIndex={0}
    role="button"
    aria-label="Close Button"
  >
    <CloseIconLine angle={-45} />
    <CloseIconLine angle={45} />
  </CloseIconContainer>
);
