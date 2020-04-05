import { useRouter } from 'next/router'
import styled from "styled-components";
import { ProductPreview } from "../../queries/getProducts";
import { Contained } from "../Contained";
import { mediaDevices, mediaSizes } from "../DisplayAtMedia";
import { Txt } from "../Txt";
import { Row } from "../Row";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { getWindowDimensions } from "../../util/getWindowDimensions";
import { useEffect } from "react";
import { accessibleEnterKeyPress } from '../../util/accessibleEnterKeyPress';

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
  width: 50px;
  height: auto;

  position: absolute;
  top: 5px;
  right: 5px;

  @media ${mediaDevices.mobileL} {
    width: 60px;
  }

  @media ${mediaDevices.tablet} {
    width: 80px;
  }
`;

type ProductPreviewCardProps = {
  productInfo: ProductPreview;
};

export const ProductPreviewCard = ({
  productInfo
}: ProductPreviewCardProps): JSX.Element => {

  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${productInfo.id}`)
  }

  const displayNames = {
    brandName: productInfo.Brand.Name,
    productName: productInfo.Name
  };

  const checkTextLength = () => {
    if (typeof window !== "undefined" && window) {
      const { width } = getWindowDimensions();
      let maxLength = 30;

      if (width <= mediaSizes.mobileM) {
        maxLength = 14;
      } else if (width <= mediaSizes.mobileL) {
        maxLength = 16;
      } else if (width <= mediaSizes.tablet) {
        maxLength = 22;
      } else if (width <= mediaSizes.laptop) {
        maxLength = 26;
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
    <ProductPreviewCardContainer onClick={handleClick} onKeyPress={accessibleEnterKeyPress(handleClick)} tabIndex={0}>
      <Column justifyBetween>
        <ProductCardThumbnailImg
          src={process.env.BACKEND_URL + productInfo.Preview.url}
          alt={`Product: ${productInfo.Name}, Brand: ${productInfo.Brand.Name}, Price: $${productInfo.Price}`}
        />
        <ProductBrandLogo
          src={process.env.BACKEND_URL + productInfo.Brand.Logo.url}
        />
        <Padded padding={"5px"}>
          <Column justifyBetween>
            <Txt bold noWrap>
              {displayNames.brandName}
            </Txt>
            <Txt noWrap>{displayNames.productName}</Txt>
            <Txt padding={"4px 0px 0px 0px"} noWrap>
              ${productInfo.Price}
            </Txt>
          </Column>
        </Padded>
      </Column>
    </ProductPreviewCardContainer>
  );
};
