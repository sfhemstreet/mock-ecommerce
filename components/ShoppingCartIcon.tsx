import styled from "styled-components";
import { Centered } from "./Centered";
import { FadeIn } from "../keyframes/FadeIn";
import { ScaleSmallToBig } from "../keyframes/ScaleSmallToBig";

const ShoppingCartContainer = styled(Centered)`
  cursor: pointer;
`;

const ShoppingCartSVG = styled.svg`
  fill: ${props => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;

  ${ShoppingCartContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

const ShoppingCartCircle = styled.div`
  position: absolute;
  top: -15px;
  left: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.green};
  width: 23px;
  height: 23px;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${FadeIn} 0.3s ease-in-out;

  cursor: pointer;

  transition: background-color 0.3s linear;

  ${ShoppingCartContainer}:hover & {
    background-color: ${props => props.theme.colors.rose};
  }
`;

const ShoppingCartNumber = styled.p`
  font-size: 13px;
  font-family: ${props => props.theme.typography.fontFamily};
  color: ${props => props.theme.colors.white};
  margin: 0;
  padding: 0;

  animation: ${FadeIn} 0.4s ease-out;

  transition: color 0.3s linear;

  ${ShoppingCartContainer}:hover & {
    color: ${props => props.theme.colors.black};
  }
`;

const AddToCartRipple = styled.div<{ delay: string }>`
  position: absolute;
  top: -15px;
  left: 10px;

  width: 23px;
  height: 23px;

  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;

  opacity: 0;

  cursor: pointer;

  animation: ${ScaleSmallToBig} 1s linear;
  animation-delay: ${props => props.delay};
`;

type ShoppingCartIconProps = {
  numberOfItems?: number;
};

/**
 * Displays a Material Icons shopping cart icon with a 
 * little green bubble showing the number of items in the cart (if there are items).
 * Every time numberOfItems changes a ripple effect happens around the green bubble.
 * 
 * @param {number} numberOfItems Number of items in the shopping cart.
 */
export const ShoppingCartIcon = ({
  numberOfItems = 0
}: ShoppingCartIconProps): JSX.Element => {
  const ripples = [0, 0.2, 0.5, 0.7].map(sec => (
    <AddToCartRipple key={`ripple${sec}`} delay={`${sec}s`} />
  ));

  return (
    <ShoppingCartContainer tabIndex={0}>
      <ShoppingCartSVG
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </ShoppingCartSVG>
      {numberOfItems > 0 && (
        <>
          <div key={`ShoppingCartRipples${numberOfItems}`}>{ripples}</div>
          <ShoppingCartCircle>
            <ShoppingCartNumber key={`ShoppingCartNumber${numberOfItems}`}>
              {numberOfItems}
            </ShoppingCartNumber>
          </ShoppingCartCircle>
        </>
      )}
    </ShoppingCartContainer>
  );
};
