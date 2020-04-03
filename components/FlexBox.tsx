import styled from 'styled-components';

type FlexBoxProps = {
  wrapReverse?: boolean;
  alignCenter?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  alignStretch?: boolean;
  alignBaseline?: boolean;
  justifyEvenly?: boolean;
  justifyBetween?: boolean;
  justifyCenter?: boolean;
  justifyAround?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
}

/**
 * Wraping Flex Box Container
 *
 * Takes one optional align-items param, one optional justify-content param, and optional wrap-reverse.
 * 
 * @param {boolean} wrapReverse flex-wrap: wrap-reverse
 * @param {boolean} alignCenter align-items: center
 * @param {boolean} alignStart align-items: flex-start
 * @param {boolean} alignEnd align-items: flex-end
 * @param {boolean} alignStretch align-items: stretch
 * @param {boolean} alignBaseline align-items: baseline
 * @param {boolean} justifyCenter justify-content: center
 * @param {boolean} justifyStart justify-content: flex-start
 * @param {boolean} justifyEnd justify-content: flex-end
 * @param {boolean} justifyAround justify-content: space-around
 * @param {boolean} justifyBetween justify-content: space-between
 * @param {boolean} justifyEvenly justify-content: space-evenly
 */
export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-wrap: ${props => props.wrapReverse ? "wrap-reverse" : "wrap"};
  
  align-items: ${props => {
    if (props.alignCenter) return "center";
    if (props.alignEnd) return "flex-end";
    if (props.alignStart) return "flex-start";
    if (props.alignStretch) return "stretch";
    if (props.alignBaseline) return "baseline";
    return "normal";
  }};

  justify-content: ${props => {
    if (props.justifyCenter) return "center";
    if (props.justifyStart) return "flex-start";
    if (props.justifyEnd) return "flex-end";
    if (props.justifyEvenly) return "space-evenly";
    if (props.justifyBetween) return "space-between";
    if (props.justifyAround) return "space-around";
    return "normal";
  }};
`;