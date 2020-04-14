import { keyframes } from 'styled-components';

export const Spin = keyframes`
  0% {
    transform: rotate(0deg) translateY(10px);
  }
  100% {
    transform: rotate(360deg) translateY(10px);
  }
`;