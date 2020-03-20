import styled from "styled-components";

type TransformedProps = {
  isTransformed: boolean;
  transition?: string;
  transform: string;
  willFade?: boolean;
};

/**
 * Applies a transform string to it's children. 
 * 
 * @param {boolean} isTransformed Required. If true, the transform will become active.
 * @param {string} transform Required transform string, ie `translateY(-100px)`.
 * @param {string} transition Optional transition string, default is `all 0.5s ease-in-out`.
 * @param {boolean} willFade Optional boolean, if true the container will fade as transform is applied.
 */
export const Transformed = styled.div<TransformedProps>`
  position: relative;
  transition: ${props => props.transition ? props.transition : props.theme.transitions.transformed};
  transform: ${props => (props.isTransformed ? props.transform : "none")};
  opacity: ${props => (props.isTransformed ? (props.willFade ? 0 : 1) : 1)};
`;

