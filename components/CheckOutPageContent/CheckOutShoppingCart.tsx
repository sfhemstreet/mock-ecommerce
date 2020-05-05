import styled from "styled-components";
import { mediaDevices } from "../DisplayAtMedia";
import { ShoppingCart, ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { BrandLogo } from "../BrandLogo";
import { Column } from "../Column";
import { EditIcon } from "../EditIcon";
import { RemoveIcon } from "../RemoveIcon";

const CartItem = styled.div<{ hasBorderTop: boolean }>`
  width: 100%;

  background-color: white;
  color: ${(props) => props.theme.colors.black};

  ${(props) =>
    props.hasBorderTop &&
    `border-top: solid 1px ${props.theme.colors.transparentBlack};`};
  border-bottom: solid 1px ${(props) => props.theme.colors.transparentBlack};

  margin: 2px 0px;

  display: grid;
  grid-template-columns: 50px 1fr 100px 40px;
  grid-template-rows: 1fr;
  gap: 3px 3px;
  grid-template-areas: "pic item price edit";

  transform: scale(0.9);

  @media ${mediaDevices.mobileM} {
    transform: none;
  }

  @media ${mediaDevices.tablet} {
    max-width: 450px;
    grid-template-columns: 100px 1fr 100px 40px;
  }

  @media ${mediaDevices.laptopL} {
    max-width: 550px;
    grid-template-columns: 200px 1fr 100px 40px;
  }
`;

const ImageArea = styled.div`
  grid-area: pic;

  display: flex;
  align-items: center;

  width: 50px;

  @media ${mediaDevices.tablet} {
    width: 100px;
  }

  @media ${mediaDevices.laptopL} {
    width: 200px;
  }
`;

const ItemArea = styled.div`
  grid-area: item;
`;

const PriceArea = styled.div`
  grid-area: price;
`;

const EditArea = styled.div`
  grid-area: edit;
`;

const ProductImg = styled.img`
  width: 50px;
  height: auto;

  @media ${mediaDevices.tablet} {
    width: 100px;
  }

  @media ${mediaDevices.laptopL} {
    width: 200px;
  }
`;

type CheckOutItemProps = {
  cart?: ShoppingCart;
  onEdit?: (item: ShoppingCartProduct) => void;
  onRemove?: (item: ShoppingCartProduct) => void;
};

export const CheckOutShoppingCart = ({
  cart,
  onEdit,
  onRemove,
}: CheckOutItemProps) => {
  return (
    <>
      {cart?.products.map((product, index) => (
        <CartItem
          hasBorderTop={index === 0}
          key={`checkout-item-${product.timeAdded}`}
        >
          <ImageArea>
            <ProductImg
              src={process.env.BACKEND_URL + product.Preview.url}
              alt={product.Name}
            />
          </ImageArea>
          <ItemArea>
            <Contained padding={"10px 0px 0px 0px"}>
              <Row alignCenter>
                <Txt small padding={"0px 6px 0px 0px"}>
                  {product.Brand.Name}
                </Txt>
                <BrandLogo
                  src={process.env.BACKEND_URL + product.Brand.Logo.url}
                  alt={product.Brand.Name}
                />
              </Row>
            </Contained>
            <Txt big bold>
              {product.Name}
            </Txt>
            <Row alignCenter>
              <Txt padding={"15px 0px 2px 0px"}>{product.Color},</Txt>
              <Txt padding={"15px 0px 2px 5px"}>{" " + product.Size}</Txt>
            </Row>
            <Txt padding={"2px 0px 20px 0px"}>Quantity: {product.Quantity}</Txt>
          </ItemArea>
          <PriceArea>
            <Column justifyCenter>
              {product.Quantity > 1 && <Txt small>${product.Price} each</Txt>}
              <Txt big bold>
                ${(product.Price * product.Quantity).toFixed(2)}
              </Txt>
            </Column>
          </PriceArea>
          {onEdit && onRemove && (
            <EditArea>
              <Column justifyEvenly>
                <EditIcon onClick={() => onEdit(product)} />
                <RemoveIcon onClick={() => onRemove(product)} />
              </Column>
            </EditArea>
          )}
        </CartItem>
      ))}
    </>
  );
};
