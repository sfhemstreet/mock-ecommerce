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

const ScrollArea = styled.div`
  
  overflow-x: scroll;
  display: inline-flex;
  justify-content: center;
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
    <Contained>
      <Txt alignCenter bold big>
        Previously Viewed Products
      </Txt>
      <ScrollArea>
        {displayedProducts.map(product => (
          <Padded
            padding={"10px 5px"}
            key={`PreviouslyViewedProduct${product.id}`}
          >
            <ProductPreviewCard productInfo={product} />
          </Padded>
        ))}
      </ScrollArea>
    </Contained>
  );
};
