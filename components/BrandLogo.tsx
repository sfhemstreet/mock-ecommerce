import styled from 'styled-components';

type BrandLogoProps = {
  small?: boolean;
}

export const BrandLogo = styled.img<BrandLogoProps>`
  height: ${props => props.small ? "22px" : "30px"};
  width: auto;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
`;