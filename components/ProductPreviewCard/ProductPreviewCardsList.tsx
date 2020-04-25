import styled from "styled-components";

import { ProductPreviewCard } from "./ProductPreviewCard";
import { Padded } from "../Padded";
import { mediaDevices } from "../DisplayAtMedia";
import { ProductPreview } from "../../queries/types";
import useSWR from "swr";
import { getWishlist, WISHLIST } from "../../storage/storage";
import { useState, useEffect } from "react";

//max-width: 1050px;
const PPCCContainer = styled.div<{ shouldCenter: boolean }>`
  width: auto;
  height: auto;
  max-width: 1200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;

  transition: all 0.3s ease-in-out;

  @media ${mediaDevices.laptop} {
    justify-content: ${props => (props.shouldCenter ? "center" : "flex-start")};
  }
`;

const DummyProduct = styled.div`
  width: 150px;
  height: 216px;

  background: transparent;

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

type ProductPreviewCardsListProps = {
  products: ProductPreview[];
};

export const ProductPreviewCardsList = ({
  products
}: ProductPreviewCardsListProps) => {
  const wishlist = useSWR(WISHLIST, getWishlist);
  const [wishlistMap, setWishlistMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const map: { [key: string]: boolean } = {};

  if (wishlist.data) {
    for (const item of wishlist.data.products) {
      map[item.id];
    }
  }
  console.log(wishlist.data);

  return (
    <PPCCContainer shouldCenter={products.length < 4}>
      {products.map(product => {

        // I tried using a map to store ids of the products in the wishlist data
        // but was unsuccessful in getting it to work. Async issues.
        // In future get this to be much faster with a hash 
        const isOnWishList: boolean | undefined = wishlist.data
          ? wishlist.data.products.findIndex(prod => prod.id === product.id) !==
            -1
            ? true
            : false
          : undefined;

        return (
          <Padded padding={"4px"} key={product.id}>
            <ProductPreviewCard
              productInfo={product}
              isOnWishList={isOnWishList}
            />
          </Padded>
        );
      })}
      {/* Adds a dummy product to make columns line up evenly when an odd number of products is given. */}
      {products.length > 1 && products.length % 2 !== 0 && (
        <Padded padding={"4px"}>
          <DummyProduct />
        </Padded>
      )}
    </PPCCContainer>
  );
};
