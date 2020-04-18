import styled from 'styled-components';

type ContainedProps = {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  margin?: string;
  transition?: string;
  hideOverflow?: boolean;
}

export const Contained = styled.div<ContainedProps>`
  width: ${props => props.width ?? 'auto'};
  height: ${props => props.height ?? 'auto'};
  padding: ${props => props.padding ?? '0'};
  margin: ${props => props.margin ?? '0'};
  transition: ${props => props.transition ?? 'none'};
  position: relative;
  overflow: ${props => props.hideOverflow ? 'hidden' : 'none'};

  ${props => props.minHeight && `min-height: ${props.minHeight}`};
  ${props => props.minWidth && `min-width: ${props.minWidth}`};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
  ${props => props.maxHeight && `max-height: ${props.maxHeight}`};
`;