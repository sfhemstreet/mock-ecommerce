import styled from "styled-components";
import { ProductHistoryItem } from "../storage/productHistory/productHistoryTypes";
import { ProductPreview } from "../queries/types";
import { Contained } from "./Contained";
import { Row } from "./Row";
import { ProductPreviewCard } from "./ProductPreviewCard/ProductPreviewCard";
import { Padded } from "./Padded";
import { SpinningLoader } from "./SpinningLoader";
import { Txt } from "./Txt";
import React from "react";
import { mediaDevices } from "./DisplayAtMedia";
import { Transformed } from "./Transformed";

type ScrollAreaProps = {
  centerSmall: boolean;
  centerMedium: boolean;
  centerLarge: boolean;
};

const ScrollArea = styled.div<ScrollAreaProps>`
  margin: 0 auto;
  max-width: 319px;
  padding: 10px 0px;

  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  overflow-x: scroll;

  @media ${mediaDevices.mobileM} {
    max-width: 374px;
    justify-content: ${props => (props.centerSmall ? "center" : "flex-start")};
  }

  @media ${mediaDevices.mobileL} {
    max-width: 420px;
    justify-content: ${props => (props.centerSmall ? "center" : "flex-start")};
  }

  @media ${mediaDevices.tablet} {
    max-width: 760px;
    justify-content: ${props => (props.centerMedium ? "center" : "flex-start")};
  }

  @media ${mediaDevices.laptop} {
    max-width: 998px;
    justify-content: ${props => (props.centerMedium ? "center" : "flex-start")};
  }

  @media ${mediaDevices.laptopL} {
    max-width: 1200px;
    justify-content: ${props => (props.centerLarge ? "center" : "flex-start")};
  }
`;

type ProductHistoryBannerProps = {
  products: ProductHistoryItem[] | undefined;
};

export const ProductHistoryBanner = ({
  products
}: ProductHistoryBannerProps) => {
  if (products === undefined) return <SpinningLoader />;

  // Sort by timeViewed and convert to ProductPreview
  const displayedProducts: ProductPreview[] = products
    .sort((a, b) => b.timeViewed - a.timeViewed)
    .map(product => ({
      id: product.id,
      slug: product.slug,
      Name: product.Name,
      Price: product.Price,
      Discount: product.Discount,
      AvailableColors: product.AvailableColors,
      AvailableSizes: product.AvailableSizes,
      Ranking: product.Ranking,
      Brand: product.Brand,
      Preview: product.Preview
    }));

  return (
    <Contained padding={"30px 0px"}>
      <Transformed
        isTransformed={products.length === 0}
        transform={""}
        willFade
      >
        <Txt alignCenter bold big>
          Previously Viewed Products
        </Txt>
        <ScrollArea
          centerLarge={displayedProducts.length < 5}
          centerMedium={displayedProducts.length < 4}
          centerSmall={displayedProducts.length < 3}
        >
          {displayedProducts.map((product, index) => (
            <Contained
              padding={"10px 5px"}
              key={`PreviouslyViewedProduct${product.id}`}
            >
              <ProductPreviewCard productInfo={product} />
            </Contained>
          ))}
        </ScrollArea>
      </Transformed>
    </Contained>
  );
};
