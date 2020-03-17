import styled from 'styled-components';

type PositionedProps = {
  top?: number;
  left?: number;
  zIndex?: number;
  opacity?: number;
}

export const Positioned = styled.div<PositionedProps>`
  position: absolute;

  top: ${props => props.top ? `${props.top}px` : '0px'};
  left: ${props => props.left ? `${props.left}px` : '0px'};

  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 1};
`;