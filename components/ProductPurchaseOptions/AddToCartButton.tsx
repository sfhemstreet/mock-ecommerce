import styled from "styled-components";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { mediaDevices } from "../DisplayAtMedia";

const AddToCartContainer = styled.button`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};

  width: 302px;
  height: 50px;

  padding: 10px;

  display: flex;
  align-items: center;

  border: solid 1px ${props => props.theme.colors.black};

  cursor: pointer;

  transition: all 0.3s linear;

  @media ${mediaDevices.tablet} {
    width: 192px;
  }

  @media ${mediaDevices.laptopL} {
    width: 302px;
  }

  :hover {
    color: ${props => props.theme.colors.green};
    transform: scale(1.1);
  }

  :active {
    color: ${props => props.theme.colors.green};
    transform: scale(0.8);
  }

  :focus {
    color: ${props => props.theme.colors.green};
    transform: scale(1.1);
  }
`;

const AddToCartSVG = styled.svg`
  fill: ${props => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;

  ${AddToCartContainer}:hover & {
    fill: ${props => props.theme.colors.green};
  }
`;

type AddToCartButtonProps = {
  onClick: () => void;
};

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  return (
    <AddToCartContainer
      onClick={onClick}
      onKeyPress={accessibleEnterKeyPress(onClick)}
    >
      <Row justifyAround alignCenter>
        <Txt bold noWrap>
          Add To Cart
        </Txt>
        <AddToCartSVG
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z" />
        </AddToCartSVG>
      </Row>
    </AddToCartContainer>
  );
};
