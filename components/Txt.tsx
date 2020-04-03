import styled from "styled-components";

type TxtProps = {
  alignCenter?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignJustify?: boolean;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  big?: boolean;
  bold?: boolean;
  underline?: boolean;
  linethru?: boolean;
  overline?: boolean;
  noWrap?: boolean;
};

export const Txt = styled.p<TxtProps>`
  text-align: ${props => {
    if (props.alignCenter) return 'center';
    if (props.alignLeft) return 'left';
    if (props.alignRight) return 'right';
    if (props.alignJustify) return 'justify';
    return 'initial';
  }};
  margin: ${props => props.margin ?? "0px"};
  padding: ${props => props.padding ?? "0px"};
  width: ${props => props.width ?? "auto"};
  height: ${props => props.height ?? "auto"};
  font-weight: ${props => (props.bold ? "500" : "400")};
  font-size: ${props => (props.big ? "20px" : props.theme.typography.fontSize)};
  text-decoration: ${props => {
    let text = "";
    if (props.underline) text += "underline ";
    if (props.overline) text += "overline ";
    if (props.linethru) text += "line-through ";
    if (text === "") return "none";
    else return text;
  }};
  white-space: ${props => props.noWrap ? "nowrap" : "normal"};
`;
