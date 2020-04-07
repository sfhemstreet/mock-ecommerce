import styled from 'styled-components';

type ColorPreviewBoxProps = {
  color: string;
}

export const ColorPreviewBox = styled.div<ColorPreviewBoxProps>`
  width: 10px;
  height: 10px;

  border-radius: 2px;
  background-color: ${props => props.color};
`;