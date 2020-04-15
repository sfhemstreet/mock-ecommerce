import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";
import { mediaDevices } from "./DisplayAtMedia";

const RemoveIconSVG = styled.svg`
  fill: ${props => props.theme.colors.black};
  width: 30px;
  height: 30px;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  :hover {
    background-color: ${props => props.theme.colors.black};
    border-radius: 10%;
    fill: red;
  }

  @media ${mediaDevices.mobileM} {
    width: 35px;
    height: 35px;
  }
`;

type RemoveIconProps = {
  onClick: (evt: React.MouseEvent) => void;
};

export const RemoveIcon = ({ onClick }: RemoveIconProps) => {
  return (
    <RemoveIconSVG
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      onClick={onClick}
      onKeyPress={accessibleEnterKeyPress(onClick)}
      tabIndex={0}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
    </RemoveIconSVG>
  );
};
