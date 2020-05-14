import styled from "styled-components";
import useSWR from "swr";
import { SpinningLoader } from "../SpinningLoader";
import {
  SHOPPING_CART,
  getShoppingCart,
  CHECKOUT_FORM,
  getCheckoutForm,
  mutateCheckoutForm,
  mutateShoppingCart,
} from "../../storage/storage";
import { Centered } from "../Centered";
import { Txt } from "../Txt";
import { Contained } from "../Contained";
import { mediaDevices } from "../DisplayAtMedia";
import { Row } from "../Row";
import { useState } from "react";
import {
  ShoppingCartProduct,
  ShoppingCart,
} from "../../storage/shoppingCart/shoppingCartTypes";
import { SwitchTransition, Transition } from "react-transition-group";
import { FadeIn } from "../../keyframes/FadeIn";
import { FlexBox } from "../FlexBox";
import { EditShoppingCartProduct } from "../ShoppingCartModal/EditShoppingCartProduct";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  editShoppingCartItem,
  removeItemFromShoppingCart,
} from "../../storage/shoppingCart/shoppingCartActions";
import {
  editCheckOutForm,
  openCheckOutForm,
  closeCheckOutForm,
} from "../../storage/checkout/checkoutActions";
import { CheckOutFormSheet } from "./CheckOutFormSheet";
import { CheckOutForm } from "../../storage/checkout/checkoutTypes";
import { CheckOutShoppingCart } from "./CheckOutShoppingCart";
import { ShippingOptionsSelectionBox } from "./ShippingOptionsSelectionBox";
import { OrderSummaryBox } from "./OrderSummaryBox";
import { SubmitButton } from "./SubmitButton";
import { CheckOutCompleted } from "./CheckOutCompleted";

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

/**
 * CheckOutPageContent
 *
 * Holds all CheckOut Page content
 */
export const CheckOutPageContent = () => {
  const shoppingCart = useSWR(SHOPPING_CART, getShoppingCart);
  const checkoutForm = useSWR(CHECKOUT_FORM, getCheckoutForm);

  const [editProduct, setEditProduct] = useState<ShoppingCartProduct | null>(
    null
  );

  const [checkOutCompleted, setCheckOutCompleted] = useState(false);
  const [completedForm, setCompletedForm] = useState<CheckOutForm>();
  const [completedCart, setCompletedCart] = useState<ShoppingCart>();

  const [width, height] = useWindowDimensions();

  const handleEditCartProduct = (product: ShoppingCartProduct) => {
    if (shoppingCart.data)
      mutateShoppingCart(editShoppingCartItem(product), shoppingCart.data);
  };

  const handleRemoveCartProduct = (product: ShoppingCartProduct) => {
    if (shoppingCart.data)
      mutateShoppingCart(
        removeItemFromShoppingCart(product.id, product.timeAdded),
        shoppingCart.data
      );
  };

  if (checkOutCompleted && completedCart && completedForm) {
    return <CheckOutCompleted cart={completedCart} form={completedForm} />;
  }

  if (!checkoutForm.data || !shoppingCart.data)
    return (
      <Centered>
        <SpinningLoader reverse />
      </Centered>
    );

  if (shoppingCart.data.products.length === 0) {
    mutateCheckoutForm(closeCheckOutForm(), checkoutForm.data);
    return (
      <Centered>
        <Txt alignCenter bold big padding={"250px 0px"}>
          No Products in Shopping Cart
        </Txt>
      </Centered>
    );
  }

  const subtotalCost = shoppingCart.data.products.reduce(
    (accumulator, product) => accumulator + product.Price * product.Quantity,
    0
  );

  return (
    <SwitchTransition>
      <Transition
        key={checkoutForm.data.isOnForm === false ? "Cart" : "Form"}
        timeout={{ enter: 100, exit: 100 }}
      >
        {!checkoutForm.data ? (
          <Centered>
            <SpinningLoader reverse />
          </Centered>
        ) : checkoutForm.data.isOnForm === false ? (
          <>
            <FlexBox justifyCenter alignCenter>
              <CartContainer>
                <Contained maxWidth={"600px"} width={"100%"} padding={"5px"}>
                  <Txt big bold padding={"2px 0px 5px 2px"}>
                    Your Cart
                  </Txt>
                  <CheckOutShoppingCart
                    cart={shoppingCart.data}
                    onEdit={(item) => setEditProduct(item)}
                    onRemove={handleRemoveCartProduct}
                  />
                </Contained>
                <Contained>
                  <ShippingOptionsSelectionBox
                    onSelect={(option) => {
                      if (checkoutForm.data)
                        mutateCheckoutForm(
                          editCheckOutForm({
                            ...checkoutForm.data,
                            shippingOption: option,
                          })
                        );
                    }}
                    shippingOption={checkoutForm.data.shippingOption}
                  />
                  <OrderSummaryBox
                    subtotal={subtotalCost}
                    shippingOption={checkoutForm.data.shippingOption}
                  />
                  <Row justifyCenter alignCenter>
                    <SubmitButton
                      onClick={() => {
                        if (checkoutForm.data) {
                          mutateCheckoutForm(
                            openCheckOutForm(),
                            checkoutForm.data
                          );
                        }
                      }}
                      aria-label={`Proceed with order. Products in cart: ${shoppingCart.data?.products
                        .map(
                          (product) =>
                            `${product.Name} made by ${product.Brand.Name}, in ${product.Color}, size ${product.Size}, quantity ${product.Quantity}.`
                        )
                        .join(" ")}. Shipping Option ${
                        checkoutForm.data.shippingOption.text
                      } priced at $${
                        checkoutForm.data.shippingOption.price
                      }. Total is $${(
                        subtotalCost + checkoutForm.data.shippingOption.price
                      ).toFixed(2)}, estimated tax is calculated at next step.`}
                    >
                      Proceed with Order
                    </SubmitButton>
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
          <Row justifyCenter>
            <CheckOutFormSheet
              cart={shoppingCart.data}
              form={checkoutForm.data}
              subtotal={subtotalCost}
              onEdit={(f: CheckOutForm) => {
                if (checkoutForm.data) {
                  mutateCheckoutForm(editCheckOutForm(f), checkoutForm.data);
                }
              }}
              onGoBack={() => {
                if (checkoutForm.data)
                  mutateCheckoutForm(closeCheckOutForm(), checkoutForm.data);
              }}
              onCheckOutComplete={(cart, form) => {
                setCompletedCart(cart);
                setCompletedForm(form);
                setCheckOutCompleted(true);
              }}
            />
          </Row>
        )}
      </Transition>
    </SwitchTransition>
  );
};
