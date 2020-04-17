import { useState } from "react";
import styled from "styled-components";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { StoredProduct } from "../../storage/types";
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

const EditStoredProductContainer = styled.div`
  width: 100%;
  max-height: 100%;

  position: fixed;
  z-index: 100;
`;

const OptionsArea = styled.div`
  color: ${props => props.theme.colors.black};
  background-color: white;
`;

const EditButton = styled.button<{ isSubmit?: boolean }>`
  border: solid 1px ${props => props.theme.colors.transparentWhite};
  background: ${props =>
    props.isSubmit ? props.theme.colors.green : "transparent"};
  color: ${props => props.theme.colors.white};

  font-size: ${props => props.theme.typography.fontSize};

  width: 100px;
  height: 40px;
`;

const StoredProductOptionLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

type EditStoredProductOptionsProps = {
  onEdit: (item: StoredProduct) => void;
  originalItem: StoredProduct;
  product: ProductInfo;
  onCancel: () => void;
};

export const EditStoredProductOptions = ({
  product,
  originalItem,
  onEdit,
  onCancel
}: EditStoredProductOptionsProps) => {
  let colorStartIndex = 0;
  const colorOptions: SelectBoxOption[] = product.AvailableColors.split(
    ","
  ).map((color, index) => {
    if (color.toUpperCase() === originalItem.Color.toUpperCase()) colorStartIndex = index;

    return {
      text: color,
      visual: <ColorPreviewBox color={color.toLowerCase()} />
    };
  });

  let sizeOptionStartIndex = 0;
  const sizeOptions: SelectBoxOption[] = product.AvailableSizes.split(",").map(
    (size, index) => {
      if (size.toUpperCase() === originalItem.Size.toUpperCase()) sizeOptionStartIndex = index;

      return {
        text: size
      };
    }
  );

  let quantityStartIndex = 0;
  const quantityOptions = new Array<SelectBoxOption>();
  for (let i = 0; i < product.UnitsInStock; i++) {
    if (i + 1 === originalItem.Quantity) quantityStartIndex = i;

    quantityOptions.push({ text: `${i + 1}` });
  }

  const [selectedSize, setSelectedSize] = useState(
    sizeOptions[sizeOptionStartIndex].text
  );
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[colorStartIndex].text
  );
  const [selectedQuantity, setSelectedQuantity] = useState(
    quantityOptions[quantityStartIndex].text
  );
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
      const item: StoredProduct = {
        timeAdded: originalItem.timeAdded,
        id: product.id,
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
      onEdit(item);
      onCancel();
    }
  }

  return (
    <EditStoredProductContainer>
      <OptionsArea>
        <Column justifyEvenly alignCenter>
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
          </Padded>
          <Padded padding={"3px"}>
            <StoredProductOptionLabel>
              Select a Size:
              <ProductOptionSelectBox
                label={"Select a Size"}
                onChange={(option: string) => setSelectedSize(option)}
                options={sizeOptions}
                startIndex={sizeOptionStartIndex}
              />
            </StoredProductOptionLabel>
          </Padded>
          <Padded padding={"3px"}>
            <StoredProductOptionLabel>
              Select a Color:
              <ProductOptionSelectBox
                label={"Select a Color"}
                onChange={(option: string) => setSelectedColor(option)}
                options={colorOptions}
                startIndex={colorStartIndex}
              />
            </StoredProductOptionLabel>
          </Padded>
          <Padded padding={"3px"}>
            <StoredProductOptionLabel>
              Quantity:
              <ProductOptionSelectBox
                label={"Quantity"}
                onChange={(option: string) => handleQuantityChange(option)}
                options={quantityOptions}
                startIndex={quantityStartIndex}
              />
            </StoredProductOptionLabel>
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
        </Column>
      </OptionsArea>
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
            Change
          </EditButton>
        </Row>
      </Padded>
    </EditStoredProductContainer>
  );
};
