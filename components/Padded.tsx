import styled from 'styled-components';

type PaddedProps = {
  pad?: string;
}

/**
 * Div element that takes a pad string, or has a default 10px padding all around.
 * @param {string} pad Optional string to determine padding, ie "10px 20px". Default "10px"
 */
export const Padded = styled.div<PaddedProps>`
  padding: ${props => props.pad ? props.pad : '10px'};
`;