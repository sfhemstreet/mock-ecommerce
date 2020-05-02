import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { addItemToWishList } from "../../storage/wishlist/wishListActions";
import { addItemToShoppingCart } from "../../storage/shoppingCart/shoppingCartActions";
import {
  SHOPPING_CART,
  WISHLIST,
  updateShoppingCart,
  updateWishList,
  getShoppingCart,
  getWishlist,
  updateModalsState
} from "../../storage/storage";

import { mediaDevices } from "../DisplayAtMedia";
import { Padded } from "../Padded";
import { ColorPreviewBox } from "../ColorPreviewBox";
import { useState } from "react";
import {
  SelectBoxOption,
  ProductOptionSelectBox
} from "./ProductOptionSelectBox";
import { Column } from "../Column";
import { AddToCartButton } from "./AddToCartButton";
import { AddToWishListButton } from "./AddToWishList";
import { Txt } from "../Txt";

import { Row } from "../Row";
import { BrandLogo } from "../BrandLogo";
import { openWishListModal, openShoppingCartModal } from "../../storage/modals/modalActions";
import { ProductInfo } from "../../queries/types";
import { WishListProduct } from "../../storage/wishlist/wishListTypes";
import { ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";

const ProductPurchaseOptionsContainer = styled.div`
  width: 310px;
  height: auto;

  @media ${mediaDevices.tablet} {
    width: 200px;
  }

  @media ${mediaDevices.laptopL} {
    width: 310px;
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
  for (let i = 0; i < product.UnitsInStock; i++) {
    quantityOptions.push({ text: `${i + 1}` });
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

  // Find out if product is in wishList
  const shoppingCart = useSWR(SHOPPING_CART, getShoppingCart);
  const wishList = useSWR(WISHLIST, getWishlist);

  const isOnWishList =
    wishList.data !== undefined &&
    wishList.data.products.findIndex(item => item.id === product.id) >= 0;

  function handleQuantityChange(option: string) {
    const quant = parseInt(option);
    setSelectedQuantity(option);
    setCalculatedCost(product.Price * quant - product.Discount * quant);
  }

  function handleAddToCart() {
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
      Preview: product.Preview
    };
    updateShoppingCart(mutate, addItemToShoppingCart(item));
    updateModalsState(mutate, openShoppingCartModal()); 
  }

  function handleAddToWishList() {
    const item: WishListProduct = {
      id: product.id,
      slug: product.slug,
      Price: product.Price,
      Discount: product.Discount,
      Name: product.Name,
      Brand: product.Brand,
      Preview: product.Preview
    };
    updateWishList(mutate, addItemToWishList(item));
    updateModalsState(mutate, openWishListModal()); 
  }

  return (
    <ProductPurchaseOptionsContainer>
      <Column alignCenter>
        <Padded padding={"10px 0px"}>
          <Row justifyEvenly alignCenter>
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
        </Padded >
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
        <Padded padding={"10px 3px 3px 3px"}>
          <AddToCartButton ariaText={`Add ${product.Name} to Shopping Cart, in size ${selectedSize}, color ${selectedColor}, quantity ${selectedQuantity}.`} onClick={handleAddToCart} />
        </Padded>
        <Padded padding={"20px 3px 3px 3px"}>
          {wishList.data && (
            <AddToWishListButton
              isOnWishList={isOnWishList}
              onClick={handleAddToWishList}
            />
          )}
        </Padded>
      </Column>
    </ProductPurchaseOptionsContainer>
  );
};
