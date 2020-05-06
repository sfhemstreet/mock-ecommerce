import styled from "styled-components";

export const SubmitButton = styled.button`
  margin: 25px 0px;

  width: 250px;
  height: 60px;

  cursor: pointer;

  font-size: ${(props) => props.theme.typography.bigFontSize};
  font-weight: 500;

  border: solid 1px ${(props) => props.theme.colors.black};
  border-radius: 3px;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.green};

  transition: all 0.3s ease-in-out;

  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.5);
  }
`;
