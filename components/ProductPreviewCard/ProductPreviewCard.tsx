import { useRouter } from "next/router";
import styled from "styled-components";

import { mediaDevices, mediaSizes } from "../DisplayAtMedia";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { ProductPreview } from "../../queries/types";
import { Transition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";
import { updateWishList } from "../../storage/storage";
import { mutate } from "swr";
import {
  removeItemFromWishlist,
  addItemToWishList
} from "../../storage/wishlist/wishListActions";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useEffect, useState } from "react";

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

  :hover {
    color: ${props => props.theme.colors.green};
    transform: scale(1.02);
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

  transition: all 0.3s ease-in;

  opacity: ${props => (props.state === ENTERED ? 1 : 0)};

  :focus,
  :hover {
    box-shadow: 0px 1px 1px 1px ${props => props.theme.colors.transparentWhite};
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

  ${HeartIconContainer}:active & {
    transform: scale(0.1);
  }

  @media ${mediaDevices.mobileM} {
    width: 25px;
    height: 25px;
  }

  @media ${mediaDevices.mobileL} {
    width: 27px;
    height: 27px;
  }

  @media ${mediaDevices.tablet} {
    width: 30px;
    height: 30px;
  }
`;

type ProductWishListIcon = {
  onClick: () => void;
  onWishList: boolean;
  transitionStatus: TransitionStatus;
};

export const ProductWishListIcon = ({
  transitionStatus,
  onClick,
  onWishList
}: ProductWishListIcon) => {
  const handleClick = (evt: React.SyntheticEvent) => {
    // If this function is fired from a keyboard enter key press then
    // evt will be undefined and the event will not propagate.
    // If its a click we must stop it so that the user is not redirected.
    if (typeof evt !== "undefined" && evt.type === "click") {
      evt.stopPropagation();
    }
    onClick();
  };

  return (
    <HeartIconContainer state={transitionStatus} onClick={handleClick}>
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

/**
 *
 * @param productInfo
 * @param isOnWishList leave as undefined to not display heart icon
 */
export const ProductPreviewCard = ({
  productInfo,
  isOnWishList
}: ProductPreviewCardProps): JSX.Element => {
  const router = useRouter();
  const [width] = useWindowDimensions();
  // For adjusting displayed name, if too long, shorten and add "..."
  const [brandName, setBrandName] = useState(productInfo.Brand.Name);
  const [productName, setProductName] = useState(productInfo.Name);

  const handleClick = () => {
    router.push(`/product/${productInfo.slug}`);
  };

  const handleWishList = () => {
    if (isOnWishList === undefined) return;

    updateWishList(
      mutate,
      isOnWishList
        ? removeItemFromWishlist(productInfo.id)
        : addItemToWishList({
            id: productInfo.id,
            slug: productInfo.slug,
            Name: productInfo.Name,
            Brand: {
              id: productInfo.Brand.id,
              Name: productInfo.Brand.Name
            },
            Preview: productInfo.Preview,
            Price: productInfo.Price,
            Discount: productInfo.Discount
          })
    );
  };

  const checkTextLength = () => {
    let maxLength = 27;

    if (width <= mediaSizes.mobileM) {
      maxLength = 16;
    } else if (width <= mediaSizes.mobileL) {
      maxLength = 16;
    } else if (width <= mediaSizes.tablet) {
      maxLength = 21;
    } else if (width <= mediaSizes.laptop) {
      maxLength = 26;
    }

    if (productInfo.Name.length > maxLength) {
      if (productInfo.Name[maxLength - 1] === " ") maxLength -= 1;
      setProductName(productInfo.Name.substring(0, maxLength) + "...");
    }
    if (productInfo.Brand.Name.length > maxLength) {
      if (productInfo.Brand.Name[maxLength - 1] === " ") maxLength -= 1;
      setBrandName(productInfo.Brand.Name.substring(0, maxLength) + "...");
    }
  };

  useEffect(() => {
    checkTextLength();
  }, [width]);

  return (
    <ProductPreviewCardContainer
      onClick={handleClick}
      onKeyPress={accessibleEnterKeyPress(handleClick)}
      tabIndex={0}
      aria-label={`Product for sale. ${productInfo.Name}, made by ${productInfo.Brand.Name}. Available in the following sizes, ${productInfo.AvailableSizes} and colors ${productInfo.AvailableColors}. Priced at $${productInfo.Price}.`}
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
            <ProductWishListIcon
              transitionStatus={state}
              onClick={handleWishList}
              onWishList={isOnWishList ? true : false}
            />
          )}
        </Transition>
        <Padded padding={"5px"}>
          <Column justifyBetween>
            <Txt noWrap>{brandName}</Txt>
            <Txt bold noWrap>
              {productName}
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
