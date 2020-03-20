import styled from 'styled-components';

type PaddedProps = {
  padding?: string;
  padTop?: string;
  padRight?: string;
  padBottom?: string;
  padLeft?: string;
}

/**
 * Div element that applies padding.
 * 
 * @param {string} padding string to determine padding, ie "10px 20px 8px 1px". Default `0px`
 * @param {string} padTop number in px to pad top
 * @param {string} padBottom number in px to pad bottom
 * @param {string} padLeft number in px to pad left
 * @param {string} padRight number in px to pad right
 */
export const Padded = styled.div<PaddedProps>`
  ${props => props.padding && `padding: ${props.padding}`};
  ${props => props.padTop && `padding-top: ${props.padTop}`};
  ${props => props.padBottom && `padding-bottom: ${props.padBottom}`};
  ${props => props.padLeft && `padding-left: ${props.padLeft}`};
  ${props => props.padRight && `padding-right: ${props.padRight}`};
`;