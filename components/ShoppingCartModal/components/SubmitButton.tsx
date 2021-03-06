import styled from 'styled-components';

export const SubmitButton = styled.button<{ isSubmit?: boolean }>`
  border: solid 1px ${props => props.theme.colors.transparentWhite};
  background: ${props => props.isSubmit ? props.theme.colors.green : "transparent"};
  color: ${props => props.theme.colors.white};

  font-size: ${props => props.theme.typography.fontSize};

  width: 302px;
  height: 40px;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  /* :hover {
    transform: scale(1.1);
  } */

  :active {
    transform: scale(0.8);
  }
`;