import styled from "styled-components";
import { Spin } from "../keyframes/Spin";

const SpinningLoaderContainer = styled.div`
  width: 24px;
  height: 24px;
`;

type LoadingBallProps = {
  color: string;
  top: string;
  left: string; 
  delay: number;
  reverse: boolean;
}

const LoadingBall = styled.div<LoadingBallProps>`
  width: 4px;
  height: 4px;
  border-radius: 50%;

  top: ${props => props.top};

  background-color: ${props => props.color};

  animation: ${Spin} 3s linear infinite;
  animation-delay: ${props => `${props.delay}s`};
  animation-direction: ${props => props.reverse ? "reverse" : "normal"};
`;

type SpinningLoaderProps = {
  delay?: number;
  reverse?: boolean;
}

export function SpinningLoader({ delay = 0, reverse = false }: SpinningLoaderProps): JSX.Element {
  const balls = [
    { color: "blue", delay: 0 + delay, top: "0px", left: "0px" },
    { color: "pink", delay: 0.2 + delay, top: "-4px", left: "0px" },
    { color: "orange", delay: 0.4 + delay, top: "0px", left: "4px" },
    { color: "purple", delay: 0.6 + delay, top: "4px", left: "-4px" }
  ];

  return (
    <SpinningLoaderContainer>
      {balls.map(ball => (
        <LoadingBall
          key={`LoadingSpinnerBall-${ball.color}`}
          color={ball.color}
          delay={ball.delay}
          top={ball.top}
          left={ball.left}
          reverse={reverse}
        />
      ))}
    </SpinningLoaderContainer>
  );
}
