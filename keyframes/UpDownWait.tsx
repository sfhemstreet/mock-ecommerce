import { keyframes } from "styled-components";

export const UpDownWait = keyframes`
  0% {
    transform:translateY(0px);
  }
  30% {
    transform: scale(1);
  }
  32% {
    transform: scale(1.3);
  }
  34% {
    transform: scale(0);
  }
  36% {
    transform: scale(0.8);
  }
  38% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.3);
  }
  42% {
    transform: scale(1);
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