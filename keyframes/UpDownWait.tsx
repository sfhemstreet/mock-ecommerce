import { keyframes } from "styled-components";

export const UpDownWait = keyframes`
  0% {
    transform:translateY(0px);
  }
  85% {
    transform:translateY(0px);
  }
  87% {
    transform:translateY(10px);
  }
  89% {
    transform:translateY(0px);
  }
  91% {
    transform:translateY(-10px);
  }
  94% {
    transform:translateY(0px);
  }
  100% {
    transform:translateY(0px);
  }
`;