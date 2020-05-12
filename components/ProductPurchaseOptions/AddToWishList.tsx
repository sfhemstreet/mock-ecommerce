import styled from "styled-components";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { mediaDevices } from "../DisplayAtMedia";

const AddToWishListContainer = styled.button`
  width: 302px;
  height: 40px;

  background-color: #DDD;

  padding: 5px;

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
    color: ${props => props.theme.colors.rose};
    transform: scale(1.01);
  }
  
  :active {
    color: ${props => props.theme.colors.rose};
    transform: scale(0.8);
  }

  :focus {
    color: ${props => props.theme.colors.rose};
    transform: scale(1.01);
  }
`;

const AddToWishListSVG = styled.svg`
  fill: ${props => props.theme.colors.black};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;
  padding-right: 19px;

  ${AddToWishListContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

const OnWishListSVG = styled.svg`
  fill: ${props => props.theme.colors.black};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;
  padding-right: 5px;

  ${AddToWishListContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

type AddToCartButtonProps = {
  isOnWishList: boolean;
  onClick: () => void;
};

export const AddToWishListButton = ({
  isOnWishList,
  onClick
}: AddToCartButtonProps) => {
  return (
    <AddToWishListContainer
      onClick={onClick}
      onKeyPress={accessibleEnterKeyPress(onClick)}
    >
      <Row justifyAround alignCenter>
        <Txt bold noWrap padding={isOnWishList ? "0px 0px 0px 3px" : "0px 0px 0px 17px"}>
          {isOnWishList ? "On Wishlist" : "Add To Wishlist"}
        </Txt>
        {isOnWishList ? (
          <OnWishListSVG
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </OnWishListSVG>
        ) : (
          <AddToWishListSVG
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
          </AddToWishListSVG>
        )}
      </Row>
    </AddToWishListContainer>
  );
};
