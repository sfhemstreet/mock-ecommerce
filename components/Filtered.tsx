import styled from 'styled-components';

type FilteredProps = {
  filter?: string;
  isActive?: boolean;
  transition?: string;
}

/**
 * Applies CSS filter to children when active. 
 * @param {string} filter String of CSS filter property, ie "blur(1px) grayscale(50%)"
 * @param {boolean} isActive Boolean, turns on and off filter
 * @param {string} transition String of time and curve, ie "0.4s ease-in"
*/
export const Filtered = styled.div<FilteredProps>`
  filter: ${props => props.isActive ? (props.filter ?? "none") : "none" };
  transition: filter ${props => props.transition ?? "none"};
`;