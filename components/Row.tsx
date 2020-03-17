import styled from "styled-components";

type RowProps = {
  reverse?: boolean;
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
};

/**
 * Row Container
 *
 * Takes one optional align-items param, and one optional justify-content param.
 * @param {boolean} reverse
 * @param {boolean} alignCenter
 * @param {boolean} alignStart
 * @param {boolean} alignEnd
 * @param {boolean} alignStretch
 * @param {boolean} alignBaseline
 * @param {boolean} justifyCenter
 * @param {boolean} justifyStart
 * @param {boolean} justifyEnd
 * @param {boolean} justifyAround
 * @param {boolean} justifyBetween
 * @param {boolean} justifyEvenly
 */
export const Row = styled.div<RowProps>`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};

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
