import styled from "styled-components";
import { Txt } from "../Txt";
import { BackArrowButton } from "../BackArrowButton";
import { mediaDevices } from "../DisplayAtMedia";
import { CheckOutForm } from "../../storage/checkout/checkoutTypes";
import { useState, useEffect } from "react";
import { Column } from "../Column";
import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import { Padded } from "../Padded";
import { Positioned } from "../Positioned";
import { Row } from "../Row";
import { SelectBox } from "./SelectBox";
import { SHIPPING_OPTIONS } from "./ShippingOptions";
import { Contained } from "../Contained";
import { updateCheckoutForm } from "../../storage/storage";
import { CheckOutShoppingCart } from "./CheckOutShoppingCart";
import { ShoppingCart } from "../../storage/shoppingCart/shoppingCartTypes";

const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;

  display: block;
`;

const BackButton = styled.button`
  position: absolute;
  top: 90px;
  left: 0px;

  width: 60px;
  height: 45px;

  border: solid 1px ${(props) => props.theme.colors.black};
  border-radius: 2px;

  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  font-size: 12px;
  font-weight: 500;

  margin-left: 10px;

  transition: all 0.2s ease-in-out;

  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
  }

  @media ${mediaDevices.mobileM} {
    width: 110px;
    height: 45px;

    font-size: ${(props) => props.theme.typography.smallFontSize};
    font-weight: 500;
  }

  @media ${mediaDevices.laptop} {
    position: relative;
    top: -65px;
    left: 0px;
  }
`;

const CheckoutLabel = styled.label`
  display: block;
`;

const CheckOutInput = styled.input<{ small?: boolean }>`
  width: ${(props) => (props.small ? "60px" : "250px")};
  height: 35px;

  border: none;
  border-radius: 4px 4px 0px 0px;

  border-bottom: solid 2px ${(props) => props.theme.colors.black};

  background-color: ${(props) => props.theme.colors.white};

  font-size: ${(props) => props.theme.typography.fontSize};

  padding: 0px 20px;

  :focus {
    border-bottom: solid 2px ${(props) => props.theme.colors.green};
  }
`;

const FormSection = styled.form`
  width: 320px;
  padding: 20px 0px;
`;

const FormsAndMiniCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediaDevices.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

type BillingKeys = keyof CheckOutForm["billing"];
type ShippingAddressKeys = keyof CheckOutForm["shippingAddress"];
type BillingShippingSharedKeys = BillingKeys & ShippingAddressKeys;

function checkBillingSameAsShipping(form: CheckOutForm): boolean {
  for (const k in form.shippingAddress) {
    const key = k as BillingShippingSharedKeys;

    if (form.shippingAddress[key] !== form.billing[key]) {
      return false;
    }
  }
  return true;
}

const CreditCardImg = styled.img`
  width: 40px;
  height: auto;
`;

const initCreditCardInfo = {
  cardNumber: "",
  cardSecurityCode: "",
  expiration: {
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  },
};

type CreditCardInfo = typeof initCreditCardInfo;
type CreditCardInfoKeys = keyof CreditCardInfo;

const CREDIT_CARD_OPTIONS = [
  {
    name: "VISA",
    image: "/images/visa.png",
  },
  {
    name: "MasterCard",
    image: "/images/mastercard.png",
  },
  {
    name: "American Express",
    image: "/images/americanexpress.png",
  },
];

type CheckOutFormProps = {
  form: CheckOutForm;
  cart: ShoppingCart;
  onEdit: (form: CheckOutForm) => void;
  onGoBack: () => void;
};

export const CheckOutFormSheet = ({
  form,
  cart,
  onEdit,
  onGoBack,
}: CheckOutFormProps) => {
  const [localForm, setLocalForm] = useState<CheckOutForm>({ ...form });
  const [creditInfo, setCreditInfo] = useState<CreditCardInfo>(
    initCreditCardInfo
  );
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState<
    boolean
  >(checkBillingSameAsShipping(form));

  const billingForm = Object.keys(localForm.billing).map((k) => {
    const key = k as BillingKeys;
    const title = formatCamelCaseToRegularString(key);
    return (
      <Padded padding={"10px"} key={`billing-${key}`}>
        <CheckoutLabel title={title} htmlFor={`billing-${key}`}>
          {title}
        </CheckoutLabel>
        <CheckOutInput
          id={`billing-${key}`}
          name={`billing-${key}`}
          title={title}
          type={key === "email" ? "email" : "text"}
          value={localForm.billing[key]}
          onBlur={(evt) => {
            onEdit(localForm);
          }}
          onChange={(evt) => {
            if (key !== "email" && isBillingSameAsShipping) {
              setLocalForm({
                ...localForm,
                billing: { ...localForm.billing, [key]: evt.target.value },
                shippingAddress: {
                  ...localForm.shippingAddress,
                  [key]: evt.target.value,
                },
              });
            } else {
              setLocalForm({
                ...localForm,
                billing: { ...localForm.billing, [key]: evt.target.value },
              });
            }
          }}
        />
      </Padded>
    );
  });

  const shippingForm = Object.keys(localForm.shippingAddress).map((k) => {
    const key = k as ShippingAddressKeys;
    const title = formatCamelCaseToRegularString(key);
    return (
      <Padded padding={"10px"} key={`shipping-${key}`}>
        <CheckoutLabel title={title} htmlFor={`shipping-${key}`}>
          {title}
        </CheckoutLabel>
        <CheckOutInput
          id={`shipping-${key}`}
          name={`shipping-${key}`}
          title={title}
          type={"text"}
          value={localForm.shippingAddress[key]}
          onBlur={(evt) => {
            onEdit(localForm);
          }}
          onChange={(evt) => {
            setLocalForm({
              ...localForm,
              shippingAddress: {
                ...localForm.shippingAddress,
                [key]: evt.target.value,
              },
            });
          }}
        />
      </Padded>
    );
  });

  const creditCardForm = Object.keys(creditInfo).map((k) => {
    const key = k as CreditCardInfoKeys;
    const title = formatCamelCaseToRegularString(key);
    return (
      <Padded padding={"10px"} key={`creditcard-${key}`}>
        <CheckoutLabel title={title} htmlFor={`creditcard-${key}`}>
          {title}
        </CheckoutLabel>
        {(key === "cardNumber" || key === "cardSecurityCode") && (
          <CheckOutInput
            small={key === "cardSecurityCode"}
            id={`creditcard-${key}`}
            name={`creditcard-${key}`}
            title={title}
            type={"text"}
            value={creditInfo[key]}
            onChange={(evt) => {
              setCreditInfo({
                ...creditInfo,
                [key]: evt.target.value,
              });
            }}
          />
        )}
        {key === "expiration" && (
          <Row alignCenter>
            <Contained padding={"2px 4px 2px 0px"}>
              <CheckoutLabel title={title} htmlFor={`creditcard-${key}-month`}>
                Month
              </CheckoutLabel>
              <CheckOutInput
                small
                id={`creditcard-${key}-month`}
                name={`creditcard-${key}-month`}
                title={title + " Month"}
                type={"text"}
                maxLength={2}
                value={creditInfo[key].month}
                onChange={(evt) => {
                  setCreditInfo({
                    ...creditInfo,
                    expiration: {
                      ...creditInfo.expiration,
                      month: evt.target.value,
                    },
                  });
                }}
              />
            </Contained>
            <Contained padding={"2px 0px 2px 0px"}>
              <CheckoutLabel title={title} htmlFor={`creditcard-${key}-year`}>
                Year
              </CheckoutLabel>
              <CheckOutInput
                small
                id={`creditcard-${key}-year`}
                name={`creditcard-${key}-year`}
                title={title + " Year"}
                type={"text"}
                maxLength={4}
                value={creditInfo[key].year}
                onChange={(evt) => {
                  setCreditInfo({
                    ...creditInfo,
                    expiration: {
                      ...creditInfo.expiration,
                      year: evt.target.value,
                    },
                  });
                }}
              />
            </Contained>
          </Row>
        )}
      </Padded>
    );
  });

  // If user selects Same as Billing option
  // this makes Shipping address same as Billing
  useEffect(() => {
    if (isBillingSameAsShipping) {
      const s = { ...form.shippingAddress };
      for (const k in form.shippingAddress) {
        const key = k as BillingShippingSharedKeys;
        s[key] = localForm.billing[key];
      }
      setLocalForm({
        ...localForm,
        shippingAddress: s,
      });
    }
  }, [isBillingSameAsShipping]);

  return (
    <FormContainer>
      <BackButton onClick={onGoBack}>Back to Cart</BackButton>
      <FormsAndMiniCart>
        <div>
          {/* BILLING ADDRESS */}
          <FormSection title={"Billing Address"} name={"Billing Address"}>
            <Txt big bold underline padding={"0px 4px"}>
              Billing Address
            </Txt>
            {billingForm}
          </FormSection>

          {/* SHIPPING ADDRESS */}
          <FormSection title={"Shipping Address"} name={"Shipping Address"}>
            <Txt big bold underline padding={"0px 4px"}>
              Shipping Address
            </Txt>
            <Padded padding={"4px 6px"}>
              <Row alignCenter>
                <SelectBox
                  label={`Ship to My Billing Address`}
                  onClick={() => setIsBillingSameAsShipping(true)}
                  isSelected={isBillingSameAsShipping}
                />
                <Txt noWrap small padding={"0px 6px"}>
                  Ship to My Billing Address
                </Txt>
              </Row>
            </Padded>
            <Padded padding={"2px 6px"}>
              <Row alignCenter>
                <SelectBox
                  label={`Ship to Different Address`}
                  onClick={() => setIsBillingSameAsShipping(false)}
                  isSelected={!isBillingSameAsShipping}
                />
                <Txt noWrap small padding={"0px 6px"}>
                  Ship to Different Address
                </Txt>
              </Row>
            </Padded>
            {!isBillingSameAsShipping && shippingForm}
          </FormSection>

          {/* SHIPPING OPTION */}
          <FormSection title={"Shipping Option"} name={"Shipping Option"}>
            <Txt big bold underline padding={"0px 4px 4px 4px"}>
              Shipping Option
            </Txt>
            {SHIPPING_OPTIONS.map((option, index) => (
              <Contained
                maxWidth={"290px"}
                padding={"0px 0px 4px 6px"}
                key={`ShippingOption-${option.text}`}
              >
                <Row alignCenter justifyBetween>
                  <Row alignCenter justifyStart>
                    <SelectBox
                      label={`Shipping option, ${option.text}, priced at $${option.price}`}
                      onClick={() => {
                        onEdit({
                          ...localForm,
                          shippingOption: SHIPPING_OPTIONS[index],
                        });
                        setLocalForm({
                          ...localForm,
                          shippingOption: SHIPPING_OPTIONS[index],
                        });
                      }}
                      isSelected={
                        localForm.shippingOption.text ===
                        SHIPPING_OPTIONS[index].text
                      }
                    />
                    <Txt small padding={"2px 6px"}>
                      {option.text}
                    </Txt>
                  </Row>

                  <Txt small bold>
                    {`$${option.price}`}
                  </Txt>
                </Row>
              </Contained>
            ))}
          </FormSection>

          {/* IS GIFT OPTION */}
          <FormSection title={"Gift Option"} name={"Gift Option"}>
            <Txt big bold underline padding={"0px 4px 4px 4px"}>
              Gift Option
            </Txt>
            <Padded padding={"0px 0px 4px 6px"}>
              <Row alignCenter justifyStart>
                <SelectBox
                  label={`Is this a gift? We will ship the package without prices listed on the invoice.`}
                  onClick={() => {
                    onEdit({
                      ...localForm,
                      isGift: !localForm.isGift,
                    });
                    setLocalForm({
                      ...localForm,
                      isGift: !localForm.isGift,
                    });
                  }}
                  isSelected={localForm.isGift}
                />
                <Txt small padding={"2px 6px"}>
                  Is this a gift? We will ship the package without prices listed
                  on the invoice.
                </Txt>
              </Row>
            </Padded>
          </FormSection>

          <FormSection title={"Credit Card Info"} name={"Credit Card Info"}>
            <Txt big bold underline padding={"0px 4px 4px 4px"}>
              Payment
            </Txt>
            <Row alignCenter>
              <Txt padding={"0px 0px 0px 6px"}>We accept credit cards</Txt>
              {CREDIT_CARD_OPTIONS.map((card) => (
                <Contained padding={"0 4px"} key={`creditCardImg-${card.name}`}>
                  <CreditCardImg src={card.image} alt={card.name} />
                </Contained>
              ))}
            </Row>
            {creditCardForm}
          </FormSection>

          <div>
            <Txt big bold underline padding={"0px 4px 4px 4px"}>
              Review Your Order
            </Txt>
            <CheckOutShoppingCart cart={cart} />
          </div>
        </div>
      </FormsAndMiniCart>
    </FormContainer>
  );
};
