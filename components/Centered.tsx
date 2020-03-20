import styled from 'styled-components';

type CenteredProps = {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

/**
 * Centers children in middle of div. 
 * Takes optional params to give specific width, height, padding, and margin.
 * 
 * @param {string} width Optional width string, ie "20px"
 * @param {string} height Optional height string, ie "30px"
 * @param {string} padding Optional padding string, ie "0px 20px"
 * @param {string} margin Optional margin string, ie "20px 0px"
 */
export const Centered = styled.div<CenteredProps>`
  position: relative;

  width: ${props => props.width ?? "auto"};
  height: ${props => props.height ?? "auto"};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${props => props.padding ?? "0"};
  margin: ${props => props.margin ?? "0"};
`;