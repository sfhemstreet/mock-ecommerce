import styled from "styled-components";
import { connect } from 'react-redux';
import { addItemToWishList } from '../../redux/wishListActions';
import { mediaDevices } from "../DisplayAtMedia";

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
import { Txt } from "../Txt";
import { ProductInfo } from "../../queries/product/getProductById";
import { WishListItem, WishListActionTypes } from "../../redux/wishListTypes";


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
  addItemToWishList: (item: WishListItem) => WishListActionTypes
};

const ProductPurchaseOptionsComponent = ({
  product,
  addItemToWishList
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
  for (let i = 0; i < product.UnitsInStock; i++) {
    quantityOptions.push({ text: `${(i + 1)}` });
  }

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].text);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].text);
  const [selectedQuantity, setSelectedQuantity] = useState(
    quantityOptions[0].text
  );
  const [calculatedCost, setCalculatedCost] = useState(
    product.Price * parseInt(quantityOptions[0].text, 10) -
    product.Discount * parseInt(quantityOptions[0].text, 10)
  );

 




  function handleQuantityChange(option: string) {
    const quant = parseInt(option);
    setSelectedQuantity(option);
    setCalculatedCost(product.Price * quant - product.Discount * quant);
  };

  function handleAddToCart() {

  }

  function handleAddToWishList() {
    const item: WishListItem = {
      productId: product.id,
      productName: product.Name,
      productSize: selectedSize,
      productColor: selectedColor,
      quantity: parseInt(selectedQuantity, 10)
    }
    addItemToWishList(item);
  }


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
              onChange={(option: string) => handleQuantityChange(option)}
              options={quantityOptions}
            />
          </ProductOptionLabel>
        </Padded>
        {product.Discount > 0 ? (
          <>
            <Txt big bold linethru padding={"20px 3px 3px 3px"}>
              ${(product.Price * parseInt(selectedQuantity, 10))}
            </Txt>
            <Txt big bold padding={"3px 3px 10px 3px"}>
              Discount! ${calculatedCost}
            </Txt>
          </>
        ) : (
          <Txt big bold padding={"20px 3px 10px 3px"}>
            ${calculatedCost}
          </Txt>
        )}
        <Padded padding={"10px 3px 3px 3px"}>
          <AddToCartButton onClick={handleAddToCart} />
        </Padded>
        <Padded padding={"20px 3px 3px 3px"}>
          <AddToWishListButton isOnWishList={false} onClick={handleAddToWishList} />
        </Padded>
      </Column>
    </ProductPurchaseOptionsContainer>
  );
};

export const ProductPurchaseOptions = connect(null, { addItemToWishList })(ProductPurchaseOptionsComponent);