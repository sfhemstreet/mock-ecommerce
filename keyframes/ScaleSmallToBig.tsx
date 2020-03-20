import { keyframes } from "styled-components";

export const ScaleSmallToBig = keyframes`
  from {
    transform: scale(.5, .5);
    opacity: .3;
  }
  to {
    transform: scale(2.5, 2.5);
    opacity: 0;
  }
`;

