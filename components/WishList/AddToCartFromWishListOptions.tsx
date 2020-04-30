import { useState } from "react";
import styled from "styled-components";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";

import {
  SelectBoxOption,
  ProductOptionSelectBox
} from "../ProductPurchaseOptions/ProductOptionSelectBox";
import { ColorPreviewBox } from "../ColorPreviewBox";
import { Row } from "../Row";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { BrandLogo } from "../BrandLogo";
import { ProductInfo } from "../../queries/types";
import { mediaDevices, DisplayAtMedia } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import { Contained } from "../Contained";

import { EditButton } from "../ShoppingCartModal/components/EditButton";
import { ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";
import { updateShoppingCart, updateModalsState } from "../../storage/storage";
import { addItemToShoppingCart } from "../../storage/shoppingCart/shoppingCartActions";
import { mutate } from "swr";
import { closeWishListOpenShoppingCart } from "../../storage/modals/modalActions";


const AddToCartFromWishListContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 100;

  @media ${mediaDevices.tablet} {
    width: 400px;
    height: 500px;
  }
`;

const OptionsArea = styled.div<{ width: string; height: string }>`
  color: ${props => props.theme.colors.black};
  background-color: white;
  width: 100%;
  height: ${props => props.height};

  @media ${mediaDevices.tablet} {
    width: 400px;
    height: 400px;
  }
`;

const ProductOptionLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const ProductPhoto = styled.img`
  height: 0px;
  width: auto;
  padding-right: 3px;

  @media ${mediaDevices.mobileM} {
    height: 80px;
  }
`;

type AddToCartFromWishListOptionsProps = {
  product: ProductInfo;
  onCancel: () => void;
  width: number;
  height: number;
};

/**
 * Displays all options for product in dropdown menus,
 * that all start at the originalItems selection.
 * @param product
 * @param onCancel
 * @param width
 * @param height
 */
export const AddToCartFromWishListOptions = ({
  product,
  onCancel,
  width,
  height
}: AddToCartFromWishListOptionsProps) => {

  const colorOptions: SelectBoxOption[] = product.AvailableColors.split(
    ","
  ).map((color, index) => ({
    text: color,
    visual: <ColorPreviewBox color={color.toLowerCase()} />
  }));

  const sizeOptions: SelectBoxOption[] = product.AvailableSizes.split(
    ","
  ).map(size => ({ text: size }));

  const quantityOptions = new Array<SelectBoxOption>();
  for (let i = 0; i < product.UnitsInStock; i++) {
    quantityOptions.push({ text: `${i + 1}` });
  }

  // Keeps track of selected Size
  const [selectedSize, setSelectedSize] = useState(
    sizeOptions[0].text
  );
  // Keeps track of selected Color
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0].text
  );
  // Keeps track of selected Quantity
  const [selectedQuantity, setSelectedQuantity] = useState(
    quantityOptions[0].text
  );
  // Calcutate cost when quantity, color, size change.
  const [calculatedCost, setCalculatedCost] = useState(
    product.Price * parseInt(quantityOptions[0].text, 10) -
      product.Discount * parseInt(quantityOptions[0].text, 10)
  );

  function handleQuantityChange(option: string) {
    if (product) {
      const quant = parseInt(option);
      setSelectedQuantity(option);
      setCalculatedCost(product.Price * quant - product.Discount * quant);
    }
  }

  function handleSubmitEdit() {
    if (product) {
      const now = Date.now();
      const item: ShoppingCartProduct = {
        timeAdded: now,
        id: product.id,
        slug: product.slug,
        Price: product.Price,
        MSRP: product.MSRP,
        Discount: product.Discount,
        Name: product.Name,
        Brand: product.Brand,
        Size: selectedSize,
        Color: selectedColor,
        Quantity: parseInt(selectedQuantity, 10),
        Preview: { url: product.Thumbnails[0].url }
      };
      updateShoppingCart(mutate, addItemToShoppingCart(item));
      updateModalsState(mutate, closeWishListOpenShoppingCart());
    }
  }

  return (
    <AddToCartFromWishListContainer>
      {/* Gives dimensions to container for mobile screens */}
      <OptionsArea width={`${width - 4}px`} height={`${height - 245}px`}>
        <Column justifyEvenly alignCenter>
          {/* Picture, Name, Brand */}
          <Padded padding={"10px 0px"}>
            <Row justifyEvenly alignCenter>
              <ProductPhoto
                src={process.env.BACKEND_URL + product.Preview.url}
                alt={`${product.Name}`}
              />
              <Column>
                <Txt alignCenter>{product.Brand.Name}</Txt>
                <Txt big bold alignCenter>
                  {product.Name}
                </Txt>
              </Column>
              <Padded padLeft={"20px"}>
                <BrandLogo
                  src={process.env.BACKEND_URL + product.Brand.Logo.url}
                  alt={`${product.Brand.Name} Logo`}
                />
              </Padded>
            </Row>
          </Padded>

          {/* Options */}
          <Padded padding={"3px"}>
            <ProductOptionLabel>
              Select a Size:
              <ProductOptionSelectBox
                label={"Select a Size"}
                onChange={(option: string) => setSelectedSize(option)}
                options={sizeOptions}
              />
            </ProductOptionLabel>
          </Padded>
          <Padded padding={"3px"}>
            <ProductOptionLabel>
              Select a Color:
              <ProductOptionSelectBox
                label={"Select a Color"}
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

          {/* Price: If product is discounted, show that it is discounted. */}
          {product.Discount > 0 ? (
            <>
              <Txt big bold linethru padding={"20px 3px 3px 3px"}>
                ${product.Price * parseInt(selectedQuantity, 10)}
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
        </Column>
      </OptionsArea>

      {/* Mobile Buttons, positions in bottom middle above close button. */}
      <DisplayAtMedia mobile>
        <Positioned
          absolute
          top={`${height - 235}px`}
          left={`${(width - 307) / 2}px`}
        >
          <Contained width={"300px"}>
            <Row justifyBetween>
              <EditButton
                onClick={onCancel}
                onKeyPress={accessibleEnterKeyPress(onCancel)}
              >
                Cancel
              </EditButton>
              <EditButton
                isSubmit
                onClick={handleSubmitEdit}
                onKeyPress={accessibleEnterKeyPress(handleSubmitEdit)}
              >
                Add To Cart
              </EditButton>
            </Row>
          </Contained>
        </Positioned>
      </DisplayAtMedia>

      {/* Buttons, positions in bottom middle above close button. */}
      <DisplayAtMedia tablet laptop desktop>
        <Positioned relative bottom={`3px`}>
          <Padded padding={"10px"}>
            <Row justifyEvenly>
              <EditButton
                onClick={onCancel}
                onKeyPress={accessibleEnterKeyPress(onCancel)}
              >
                Cancel
              </EditButton>
              <EditButton
                isSubmit
                onClick={handleSubmitEdit}
                onKeyPress={accessibleEnterKeyPress(handleSubmitEdit)}
              >
                Add To Cart
              </EditButton>
            </Row>
          </Padded>
        </Positioned>
      </DisplayAtMedia>
    </AddToCartFromWishListContainer>
  );
};
