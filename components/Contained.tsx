import styled from 'styled-components';

type ContainedProps = {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  transition?: string;
}

export const Contained = styled.div<ContainedProps>`
  width: ${props => props.width ?? 'auto'};
  height: ${props => props.height ?? 'auto'};
  padding: ${props => props.padding ?? '0'};
  margin: ${props => props.margin ?? '0'};
  transition: ${props => props.transition ?? 'none'};
  position: relative;
`;