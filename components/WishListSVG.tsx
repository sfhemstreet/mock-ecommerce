import styled from 'styled-components';

type WishListSVGProps = {
  isFilled: boolean;
}

export const WishListSVG = styled.svg<WishListSVGProps>`
  fill: ${props => props.isFilled ? props.theme.colors.rose : props.theme.colors.white};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;

  :hover {
    fill: ${props => props.isFilled ? props.theme.colors.white : props.theme.colors.rose};
  }
`;
