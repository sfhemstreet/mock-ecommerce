import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { SpinningLoader } from "../SpinningLoader";
import {
  SHOPPING_CART,
  getShoppingCart,
  updateShoppingCart,
  CHECKOUT_FORM,
  getCheckoutForm,
  updateCheckoutForm,
} from "../../storage/storage";
import { Centered } from "../Centered";
import { Txt } from "../Txt";
import { Contained } from "../Contained";
import { mediaDevices } from "../DisplayAtMedia";
import { BrandLogo } from "../BrandLogo";
import { Row } from "../Row";
import { Column } from "../Column";
import { RemoveIcon } from "../RemoveIcon";
import { EditIcon } from "../EditIcon";
import { SelectBox } from "./SelectBox";
import { Positioned } from "../Positioned";
import { useState, useEffect } from "react";
import { ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";
import { SwitchTransition, Transition } from "react-transition-group";
import { FadeContainer } from "../SearchBox/SearchIcon";
import { FadeIn } from "../../keyframes/FadeIn";
import { FlexBox } from "../FlexBox";
import { EditShoppingCartProduct } from "../ShoppingCartModal/EditShoppingCartProduct";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  editShoppingCartItem,
  removeItemFromShoppingCart,
} from "../../storage/shoppingCart/shoppingCartActions";
import { editCheckOutForm } from "../../storage/checkout/checkoutActions";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1300px;
  width: 100%;
  margin-bottom: 20px;

  @media ${mediaDevices.tablet} {
    flex-direction: row;
    justify-content: center;
  }
  @media ${mediaDevices.laptopL} {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

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

const OptionsContainer = styled.div`
  margin: 15px 0px;

  width: 99%;
  height: auto;

  @media ${mediaDevices.tablet} {
    margin: 2px 2px 30px 2px;
    width: 300px;
  }
`;

const ProceedButton = styled.button`
  margin: 25px 0px;

  width: 250px;
  height: 60px;

  cursor: pointer;

  font-size: ${(props) => props.theme.typography.bigFontSize};
  font-weight: 500;

  border: solid 1px ${(props) => props.theme.colors.black};
  border-radius: 3px;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.green};

  transition: all 0.3s ease-in-out;

  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.5);
  }
`;

const EditModalBackGround = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 100%;

  z-index: 9000;

  background-color: rgba(0, 0, 0, 0.87);

  animation: ${FadeIn} ease-in-out 0.5s;

  @supports (
    (-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
  ) {
    background-color: rgba(255, 255, 255, 0);
    -webkit-backdrop-filter: blur(30px) grayscale(100%) brightness(10%);
    backdrop-filter: blur(1px) grayscale(100%) brightness(10%);
  }
`;

const SHIPPING_OPTIONS = [
  { text: "Standard 5-10 Business Days", price: 0 },
  { text: "Two Business Days", price: 19.95 },
  { text: "One Business Day", price: 29.95 },
];

export const CheckOutPageContent = () => {

  const shoppingCart = useSWR(SHOPPING_CART, getShoppingCart);
  const checkoutForm = useSWR(CHECKOUT_FORM, getCheckoutForm);

  const [editProduct, setEditProduct] = useState<ShoppingCartProduct | null>(
    null
  );
  const [shippingOptionIndex, setShippingOptionIndex] = useState(0);
  const [width, height] = useWindowDimensions();
  const [isOnStepTwo, setIsOnStepTwo] = useState(false);

  const handleEditCartProduct = (product: ShoppingCartProduct) => {
    if (shoppingCart.data)
      updateShoppingCart(
        mutate,
        editShoppingCartItem(product),
        shoppingCart.data
      );
  };

  const handleRemoveCartProduct = (product: ShoppingCartProduct) => {
    if (shoppingCart.data)
      updateShoppingCart(
        mutate,
        removeItemFromShoppingCart(product.id, product.timeAdded),
        shoppingCart.data
      );
  };

  if (!checkoutForm.data || !shoppingCart.data)
    return (
      <Centered>
        <SpinningLoader reverse />
      </Centered>
    );

  if (shoppingCart.data.products.length === 0)
    return (
      <Centered>
        <Txt alignCenter bold big padding={"250px 0px"}>
          No Products in Shopping Cart
        </Txt>
      </Centered>
    );

  if (!isOnStepTwo && checkoutForm.data.isOnForm) {
    setIsOnStepTwo(true);
  }

  const subtotalCost = shoppingCart.data.products.reduce(
    (accumulator, product) => accumulator + product.Price * product.Quantity,
    0
  );

  return (
    <SwitchTransition>
      <Transition
        key={!isOnStepTwo ? "Cart" : "Form"}
        timeout={300}
      >
        {state => (
          <FadeContainer state={state}>
            {!isOnStepTwo ? (
              <>
             <FlexBox justifyCenter alignCenter>
        <CartContainer>
          <Contained maxWidth={"600px"} width={"100%"}>
            <Txt big bold padding={"2px 0px 5px 2px"}>
              Your Cart
            </Txt>
            {shoppingCart.data?.products.map((product, index) => (
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
                  <Txt padding={"2px 0px 20px 0px"}>
                    Quantity: {product.Quantity}
                  </Txt>
                </ItemArea>
                <PriceArea>
                  <Column justifyCenter>
                    {product.Quantity > 1 && (
                      <Txt small>${product.Price} each</Txt>
                    )}
                    <Txt big bold>
                      ${(product.Price * product.Quantity).toFixed(2)}
                    </Txt>
                  </Column>
                </PriceArea>
                <EditArea>
                  <Column justifyEvenly>
                    <EditIcon onClick={() => setEditProduct(product)} />
                    <RemoveIcon
                      onClick={() => handleRemoveCartProduct(product)}
                    />
                  </Column>
                </EditArea>
              </CartItem>
            ))}
          </Contained>
          <Contained>
            <OptionsContainer>
              <Txt big bold padding={"2px 0px 5px 2px"}>
                Shipping Options
              </Txt>
              {SHIPPING_OPTIONS.map((option, index) => (
                <Contained
                  padding={"0px 0px 5px 0px"}
                  key={`ShippingOption-${option.text}`}
                >
                  <Row alignCenter>
                    <SelectBox
                      label={`Shipping option, ${option.text}, priced at $${option.price}`}
                      onClick={() => setShippingOptionIndex(index)}
                      isSelected={index === shippingOptionIndex}
                    />
                    <Txt small padding={"0px 4px"}>
                      {option.text}
                    </Txt>
                    <Positioned absolute right={"5px"}>
                      <Txt small bold>
                        {option.price === 0 ? "Free!" : `$${option.price}`}
                      </Txt>
                    </Positioned>
                  </Row>
                </Contained>
              ))}
            </OptionsContainer>
            <OptionsContainer>
              <Txt big bold padding={"2px 0px 5px 2px"}>
                Order Summary
              </Txt>
              <Row justifyBetween alignCenter>
                <Txt padding={"0px 4px"}>Subtotal</Txt>{" "}
                <Txt bold padding={"0px 4px"}>
                  ${subtotalCost.toFixed(2)}
                </Txt>
              </Row>
              <Row justifyBetween alignCenter>
                <Txt padding={"4px 4px 0px 4px"}>Shipping</Txt>{" "}
                <Txt bold padding={"4px 4px 0px 4px"}>
                  ${SHIPPING_OPTIONS[shippingOptionIndex].price}
                </Txt>
              </Row>
              <Row justifyBetween alignEnd>
                <Txt padding={"4px 4px 0px 4px"}>Estimated Tax</Txt>{" "}
                <Txt small padding={"4px 4px 0px 4px"}>
                  Calculated at Next Step
                </Txt>
              </Row>
              <Row justifyBetween alignCenter>
                <Txt big bold padding={"6px 4px 0px 4px"}>
                  Estimated Total
                </Txt>
                <Txt big bold padding={"6px 4px 0px 4px"}>
                  $
                  {(
                    subtotalCost + SHIPPING_OPTIONS[shippingOptionIndex].price
                  ).toFixed(2)}
                </Txt>
              </Row>
            </OptionsContainer>
            <Row justifyCenter alignCenter>
              <ProceedButton
                aria-label={`Proceed with order. Products in cart: ${shoppingCart.data?.products
                  .map(
                    (product) =>
                      `${product.Name} made by ${product.Brand.Name}, in ${product.Color}, size ${product.Size}, quantity ${product.Quantity}.`
                  )
                  .join(" ")}. Shipping Option ${
                  SHIPPING_OPTIONS[shippingOptionIndex].text
                } priced at $${
                  SHIPPING_OPTIONS[shippingOptionIndex].price
                }. Total is $${(
                  subtotalCost + SHIPPING_OPTIONS[shippingOptionIndex].price
                ).toFixed(2)}, estimated tax is calculated at next step.`}
              >
                Proceed with Order
              </ProceedButton>
            </Row>
          </Contained>
        </CartContainer>
      </FlexBox>
      <Transition
        in={editProduct !== null}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <EditModalBackGround>
          <Contained padding={"70px 0px"}>
            <FlexBox justifyCenter>
              <EditShoppingCartProduct
                width={width}
                height={height}
                item={editProduct}
                onEdit={(item) => handleEditCartProduct(item)}
                onCancel={() => setEditProduct(null)}
              />
            </FlexBox>
          </Contained>
        </EditModalBackGround>
      </Transition> 
      </>
            ) : (
              <CheckoutForm 
                onGoBack={() => {
                  if (checkoutForm.data)
                    updateCheckoutForm(mutate, editCheckOutForm({...checkoutForm.data, isOnForm: false}))
                  setIsOnStepTwo(false);
                }} 
              /> 
            )}
          </FadeContainer>
        )}

      </Transition>
      
    </>
  );
};
