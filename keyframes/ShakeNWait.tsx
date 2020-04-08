import { keyframes } from "styled-components";

export const ShakeNWait = keyframes`
  0% {
    transform:rotate(0deg);
  }
  5% {
    transform:rotate(30deg);
  }
  10% {
    transform:rotate(0deg);
  }
  15% {
    transform:rotate(-30deg);
  }
  20% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(0deg);
  }
`;

