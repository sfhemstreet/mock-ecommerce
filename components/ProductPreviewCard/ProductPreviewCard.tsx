import { useRouter } from "next/router";
import styled from "styled-components";

import { mediaDevices, mediaSizes } from "../DisplayAtMedia";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { getWindowDimensions } from "../../util/getWindowDimensions";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { ProductPreview } from "../../queries/types";
import { Transition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";

// ratio used for width height: 1.4375

const ProductPreviewCardContainer = styled.div`
  width: 150px;
  height: 216px;
  position: relative;
  color: ${props => props.theme.colors.productPreviewText};
  background: ${props => props.theme.colors.productPreviewBackground};

  @media ${mediaDevices.mobileM} {
    width: 160px;
    height: 230px;
  }

  @media ${mediaDevices.mobileL} {
    width: 200px;
    height: 288px;
  }

  @media ${mediaDevices.tablet} {
    width: 250px;
    height: 359px;
  }

  transition: all 0.4s ease-out;

  cursor: pointer;

  :hover,
  :focus {
    transform: scale(1.05);
  }

  :active {
    transform: scale(0.99);
  }
`;

const ProductCardThumbnailImg = styled.img`
  width: 150px;
  height: auto;

  @media ${mediaDevices.mobileM} {
    width: 160px;
  }

  @media ${mediaDevices.mobileL} {
    width: 200px;
  }

  @media ${mediaDevices.tablet} {
    width: 250px;
  }
`;

const ProductBrandLogo = styled.img`
  width: 30px;
  height: auto;

  position: absolute;
  top: 5px;
  right: 5px;

  @media ${mediaDevices.mobileL} {
    width: 40px;
  }

  @media ${mediaDevices.tablet} {
    width: 60px;
  }
`;

const HeartIconContainer = styled.div<{ state: TransitionStatus }>`
  position: absolute;
  top: 4px;
  left: 4px;

  background-color: rgba(245, 245, 245, 0.2);
  width: 35px;
  height: 35px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow: 0px 1px 1px 1px #fff;

  transition: all 0.3s ease-in;

  opacity: ${props => props.state === ENTERED ? 1 : 0};

  :focus,
  :hover {
    box-shadow: 0px 1px 1px 1px ${props => props.theme.colors.transparentBrown};
    transform: scale(1.1);
    background-color: ${props => props.theme.colors.transparentWhite};
  }
`;

const HeartSVG = styled.svg<{ isFilled: boolean }>`
  width: 24px;
  height: 24px;

  fill: ${props =>
    props.isFilled ? props.theme.colors.rose : props.theme.colors.black};

  transition: all 0.3s ease-in;

  ${HeartIconContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

type ProductWishListIcon = {
  onClick: () => void;
  onWishList: boolean;
  transitionStatus: TransitionStatus;
};

export const ProductWishListIcon = ({transitionStatus, onClick, onWishList }: ProductWishListIcon) => {

  const handleClick = (evt: React.SyntheticEvent) => {
    // If this function is fired from a keyboard enter key press then
    // evt will be undefined and the event will not propagate.
    // If its a click we must stop it so that the user is not redirected.
    if (typeof evt !== 'undefined' && evt.type === 'click'){
      evt.stopPropagation();
    }
    onClick();
  }

  return (
    <HeartIconContainer 
      state={transitionStatus}
      onClick={handleClick}
    >
      <HeartSVG
        isFilled={onWishList}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        {onWishList ? (
          <>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </>
        ) : (
          <>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
          </>
        )}
      </HeartSVG>
    </HeartIconContainer>
  );
};

type ProductPreviewCardProps = {
  productInfo: ProductPreview;
  isOnWishList?: boolean | undefined;
};

export const ProductPreviewCard = ({
  productInfo,
  isOnWishList
}: ProductPreviewCardProps): JSX.Element => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${productInfo.slug}`);
  };

  const handleWishList = () => {

  }

  const displayNames = {
    brandName: productInfo.Brand.Name,
    productName: productInfo.Name
  };

  const checkTextLength = () => {
    if (typeof window !== "undefined" && window) {
      const { width } = getWindowDimensions();
      let maxLength = 28;

      if (width <= mediaSizes.mobileM) {
        maxLength = 14;
      } else if (width <= mediaSizes.mobileL) {
        maxLength = 16;
      } else if (width <= mediaSizes.tablet) {
        maxLength = 22;
      } else if (width <= mediaSizes.laptop) {
        maxLength = 24;
      }

      if (productInfo.Name.length > maxLength) {
        if (productInfo.Name[maxLength - 1] === " ") maxLength -= 1;
        displayNames.productName =
          productInfo.Name.substring(0, maxLength) + "...";
      }
      if (productInfo.Brand.Name.length > maxLength) {
        if (productInfo.Brand.Name[maxLength - 1] === " ") maxLength -= 1;
        displayNames.brandName =
          productInfo.Brand.Name.substring(0, maxLength) + "...";
      }
    }
  };

  checkTextLength();

  return (
    <ProductPreviewCardContainer
      onClick={handleClick}
      onKeyPress={accessibleEnterKeyPress(handleClick)}
      tabIndex={0}
    >
      <Column justifyBetween>
        <ProductCardThumbnailImg
          src={process.env.BACKEND_URL + productInfo.Preview.url}
          alt={`Product: ${productInfo.Name}, Brand: ${productInfo.Brand.Name}, Price: $${productInfo.Price}`}
        />
        <ProductBrandLogo
          src={process.env.BACKEND_URL + productInfo.Brand.Logo.url}
          alt={`${productInfo.Brand.Name} logo`}
        />
        <Transition
          in={isOnWishList !== undefined}
          timeout={{
            enter: 20,
            exit: 300
          }}
          mountOnEnter
          unmountOnExit
        >
          {state => (
            <ProductWishListIcon transitionStatus={state} onClick={handleWishList} onWishList={isOnWishList ? true : false} />
          )}
        </Transition>
        <Padded padding={"5px"}>
          <Column justifyBetween>
            <Txt noWrap>{displayNames.brandName}</Txt>
            <Txt bold noWrap>
              {displayNames.productName}
            </Txt>
            <Txt bold padding={"4px 0px 0px 0px"} noWrap>
              ${productInfo.Price}
            </Txt>
          </Column>
        </Padded>
      </Column>
    </ProductPreviewCardContainer>
  );
};
