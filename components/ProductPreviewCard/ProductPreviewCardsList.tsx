import styled from "styled-components";

import { ProductPreviewCard } from "./ProductPreviewCard";
import { Padded } from "../Padded";
import { mediaDevices } from "../DisplayAtMedia";
import { ProductPreview } from "../../queries/types";

//max-width: 1050px;
const PPCCContainer = styled.div`
  width: auto;
  height: auto;
  max-width: 1200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;

  @media ${mediaDevices.laptop} {
    justify-content: flex-start;
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
  return (
    <PPCCContainer>
      {products.map(product => (
        <Padded padding={"6px"} key={product.id}>
          <ProductPreviewCard productInfo={product} />
        </Padded>
      ))}
      {/* Adds a dummy product to make columns line up evenly when an odd number of products is given. */}
      {(products.length > 1 && products.length % 2 !== 0) && (
        <Padded padding={"6px"} >
          <DummyProduct />
        </Padded>
      )}
    </PPCCContainer>
  );
};
