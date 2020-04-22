import styled from "styled-components";

export const Thumbnail = styled.div<{ highlight: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  border-style: solid;
  border-width: 3px;
  border-color: ${props =>
    props.highlight ? props.theme.colors.rose : "transparent"};
`;