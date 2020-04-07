import styled from "styled-components";
import { mediaDevices } from "../DisplayAtMedia";
import { ProductInfo } from "../../queries/getProducts";
import { Padded } from "../Padded";
import { ColorPreviewBox } from "../ColorPreviewBox";
import { Positioned } from "../Positioned";
import { useState } from "react";
import {
  SelectBoxOption,
  ProductOptionSelectBox
} from "./ProductOptionSelectBox";
import { FlexBox } from "../FlexBox";
import { Column } from "../Column";
import { AddToCartButton } from "./AddToCartButton";
import { AddToWishListButton } from "./AddToWishList";

const ProductPurchaseOptionsContainer = styled.div`
  width: 310px;
  height: auto;

  @media ${mediaDevices.tablet} {
    width: 200px;
  }
`;

const ProductOptionLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

type ProductPurchaseOptionsProps = {
  product: ProductInfo;
};

export const ProductPurchaseOptions = ({
  product
}: ProductPurchaseOptionsProps) => {
  // Create SelectBoxOption objects for all options.
  // This alllows us to display a visual along with the text.
  // Right now this only means a ColorPreviewBox but in future could display images
  const colorOptions: SelectBoxOption[] = product.AvailableColors.split(
    ","
  ).map(color => ({
    text: color,
    visual: <ColorPreviewBox color={color.toLowerCase()} />
  }));

  const sizeOptions: SelectBoxOption[] = product.AvailableSizes.split(",").map(
    size => ({
      text: size
    })
  );

  const quantityOptions = new Array<SelectBoxOption>();
  for (let i = 1; i <= product.UnitsInStock; i++) {
    quantityOptions.push({ text: `${i}` });
  }

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].text);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].text);
  const [selectedQuantity, setSelectedQuantity] = useState(
    quantityOptions[0].text
  );

  return (
    <ProductPurchaseOptionsContainer>
        <Column>
          <Padded padding={"3px"}>
            <ProductOptionLabel>
              Select a Size:
              <ProductOptionSelectBox
                label={"Size"}
                onChange={(option: string) => setSelectedSize(option)}
                options={sizeOptions}
              />
            </ProductOptionLabel>
          </Padded>
          <Padded padding={"3px"}>
            <ProductOptionLabel>
              Select a Color:
              <ProductOptionSelectBox
                label={"Color"}
                onChange={(option: string) => setSelectedColor(option)}
                options={colorOptions}
              />
            </ProductOptionLabel>
          </Padded>
          <Padded padding={"3px"}>
            <ProductOptionLabel>
              Quantity:
              <ProductOptionSelectBox
                label={"Quantity"}
                onChange={(option: string) => setSelectedQuantity(option)}
                options={quantityOptions}
              />
            </ProductOptionLabel>
          </Padded>
          <Padded padding={"20px 3px 3px 3px"}>
            <AddToCartButton onClick={() => {}} />
          </Padded>
          <Padded padding={"20px 3px 3px 3px"}>
            <AddToWishListButton onClick={() => {}} />
          </Padded>
        </Column>
        
      
    </ProductPurchaseOptionsContainer>
  );
};
