import styled from "styled-components";
import { Txt } from "../Txt";
import { mediaDevices } from "../DisplayAtMedia";
import { CheckOutForm } from "../../storage/checkout/checkoutTypes";
import { useState, useEffect, useRef } from "react";
import { Padded } from "../Padded";
import { Row } from "../Row";
import { SelectBox } from "./SelectBox";
import { Contained } from "../Contained";
import { CheckOutShoppingCart } from "./CheckOutShoppingCart";
import { ShoppingCart } from "../../storage/shoppingCart/shoppingCartTypes";
import {
  initCreditCardInfo,
  CREDIT_CARD_OPTIONS,
} from "../../util/checkout/CreditCardOptions";
import { ShippingOptionsSelectionBox } from "./ShippingOptionsSelectionBox";
import { OrderSummaryBox } from "./OrderSummaryBox";
import { OptionsContainer } from "./OptionsContainer";
import { STATES_TAXES } from "../../util/checkout/StatesTaxes";
import { SubmitButton } from "./SubmitButton";
import { MiniCartView } from "./MiniCartView";
import { CreditCardForm } from "./CreditCardForm";
import { BillingForm } from "./BillingForm";
import { ShippingAddressForm } from "./ShippingAddressForm";
import {
  BillingShippingSharedKeys,
  CreditCardInfo,
  BillingKeys,
  ShippingAddressKeys,
  CreditCardInfoKeys,
} from "../../util/checkout/CheckOutFormTypes";
import { validateCreditCard } from "../../util/checkout/validateCreditCard";
import { Column } from "../Column";
import { ErrorTxt } from "./ErrorTxt";
import { validateFieldReducer } from "../../util/checkout/validateFieldReducer";
import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import { SpinningLoader } from "../SpinningLoader";
import { CheckOutCompleted } from "./CheckOutCompleted";
import { scrollToTop } from "../../util/scrollToTop";

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

const FormsAndMiniCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediaDevices.tablet} {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

function checkBillingSameAsShipping(form: CheckOutForm): boolean {
  for (const k in form.shippingAddress) {
    const key = k as BillingShippingSharedKeys;

    if (form.shippingAddress[key] !== form.billing[key]) {
      return false;
    }
  }
  return true;
}

function getTaxEstimate(state: string, subtotal: number): number | undefined {
  if (state === "") return undefined;

  const taxPercentage = STATES_TAXES.find((s) => s.state === state)?.tax;

  if (taxPercentage === undefined) return undefined;

  const taxDecimal = taxPercentage / 100;

  return subtotal * taxDecimal;
}

const CreditCardImg = styled.img`
  width: 40px;
  height: auto;
`;

type CheckOutFormProps = {
  form: CheckOutForm;
  cart: ShoppingCart;
  subtotal: number;
  onEdit: (form: CheckOutForm) => void;
  onGoBack: () => void;
  onCheckOutComplete: (cart: ShoppingCart, form: CheckOutForm) => void;
};

export const CheckOutFormSheet = ({
  form,
  cart,
  subtotal,
  onEdit,
  onGoBack,
  onCheckOutComplete
}: CheckOutFormProps) => {
  // When components loads for first time we want 
  // to make sure we are at the top of the form
  const containerRef = useRef<HTMLDivElement>(null);

  // The localForm is a copy of the CheckOutForm saved in sessionStorage.
  const [localForm, setLocalForm] = useState<CheckOutForm>({ ...form });

  // We do not save credit card info in storage, it is only here.
  const [creditInfo, setCreditInfo] = useState<CreditCardInfo>(
    initCreditCardInfo
  );

  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState<
    boolean
  >(checkBillingSameAsShipping(form));

  const [estimatedTax, setEstmatedTax] = useState<number | undefined>(
    getTaxEstimate(form.billing.state, subtotal)
  );

  const [showInvalidFields, setShowInvalidFields] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  // When the user hits submit and the fields are valid
  // show loading screen while "network" event happens.
  const [isLoading, setIsLoading] = useState(false);

  const handleBillingFormInput = (key: BillingKeys, value: string) => {
    // Sales tax is applied to where it is shipped
    if (isBillingSameAsShipping && key === "state") {
      setEstmatedTax(getTaxEstimate(value, subtotal));
    }
    if (key !== "email" && isBillingSameAsShipping) {
      setLocalForm({
        ...localForm,
        billing: {
          ...localForm.billing,
          [key]: value,
        },
        shippingAddress: {
          ...localForm.shippingAddress,
          [key]: value,
        },
      });
    } else {
      setLocalForm({
        ...localForm,
        billing: {
          ...localForm.billing,
          [key]: value,
        },
      });
    }
  };

  const handleShippingFormInput = (key: ShippingAddressKeys, value: string) => {
    // Sales tax is applied to where it is shipped
    if (key === "state") {
      setEstmatedTax(getTaxEstimate(value, subtotal));
    }
    setLocalForm({
      ...localForm,
      shippingAddress: {
        ...localForm.shippingAddress,
        [key]: value,
      },
    });
  };

  const handleCreditCardFormInput = (
    key: CreditCardInfoKeys,
    value: string | { month: string; year: string }
  ) => {
    setCreditInfo({
      ...creditInfo,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    setShowInvalidFields(true);

    let allGood = true;
    // Keep list of invalid field names to display to user
    const invalidFs = new Array<string>();

    // Go through all fields in billing section
    // and see if they are valid.
    for (const k in localForm.billing) {
      const key = k as BillingKeys;
      const isValid = validateFieldReducer(key, localForm.billing[key]);
      if (!isValid) {
        allGood = false;
        invalidFs.push("Billing " + formatCamelCaseToRegularString(key));
      }
    }

    // Go through all fields in shipping address section
    // and see if they are valid IF we are shipping to
    // an address other than the billing address.
    if (!isBillingSameAsShipping) {
      for (const k in localForm.shippingAddress) {
        const key = k as ShippingAddressKeys;
        const isValid = validateFieldReducer(
          key,
          localForm.shippingAddress[key]
        );
        if (!isValid) {
          allGood = false;
          invalidFs.push("Shipping " + formatCamelCaseToRegularString(key));
        }
      }
    }

    // Go through all fields in credit card section
    // and see if they are valid.
    const creditCardValidObj = validateCreditCard(creditInfo);
    Object.keys(creditCardValidObj).forEach((k) => {
      // Typescript... maybe I am just ignorant
      const key = k as keyof typeof creditCardValidObj;
      if (!creditCardValidObj[key]) {
        allGood = false;
        invalidFs.push(formatCamelCaseToRegularString(key));
      }
    });
    
    setInvalidFields(invalidFs);

    if (allGood && invalidFs.length === 0) {
      // Make fake request and go to Completed screen
      setIsLoading(true);
      onEdit(localForm);

      setTimeout(() => {
        setIsLoading(false);
        onCheckOutComplete(cart, localForm);
      }, 2000);
    }
  };

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

  useEffect(() => {
    scrollToTop()
  }, []);

  return (
    <>
      {isLoading ? (
        <Row justifyCenter>
          <SpinningLoader />
        </Row>
      ) : (
        <FormContainer >
          <BackButton onClick={onGoBack}>Back to Cart</BackButton>
          <FormsAndMiniCart ref={containerRef}>
            <Contained>
              {/* BILLING ADDRESS */}
              <OptionsContainer
                title={"Billing Address"}
                name={"Billing Address"}
              >
                <Txt big bold padding={"0px 4px"}>
                  Billing Address
                </Txt>
                <BillingForm
                  billing={localForm.billing}
                  onChange={handleBillingFormInput}
                  onBlur={() => onEdit(localForm)}
                  showInvalidFields={showInvalidFields}
                />
              </OptionsContainer>

              {/* SHIPPING ADDRESS */}
              <OptionsContainer
                title={"Shipping Address"}
                name={"Shipping Address"}
              >
                <Txt big bold padding={"0px 4px"}>
                  Shipping Address
                </Txt>
                <Padded padding={"4px 4px"}>
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
                <Padded padding={"2px 4px"}>
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
                {!isBillingSameAsShipping && (
                  <ShippingAddressForm
                    shippingAddress={localForm.shippingAddress}
                    onChange={handleShippingFormInput}
                    onBlur={() => onEdit(localForm)}
                    showInvalidFields={showInvalidFields}
                  />
                )}
              </OptionsContainer>

              {/* SHIPPING OPTION */}
              <ShippingOptionsSelectionBox
                onSelect={(option) => {
                  onEdit({
                    ...localForm,
                    shippingOption: option,
                  });
                  setLocalForm({
                    ...localForm,
                    shippingOption: option,
                  });
                }}
                shippingOption={localForm.shippingOption}
              />

              {/* GIFT OPTION */}
              <OptionsContainer title={"Gift Option"} name={"Gift Option"}>
                <Txt big bold padding={"0px 4px 4px 4px"}>
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
                      Is this a gift? We will ship the package without prices
                      listed on the invoice.
                    </Txt>
                  </Row>
                </Padded>
              </OptionsContainer>

              {/* CREDIT CARD INFO */}
              <OptionsContainer
                title={"Credit Card Info"}
                name={"Credit Card Info"}
              >
                <Txt big bold padding={"0px 4px 4px 4px"}>
                  Payment
                </Txt>
                <Row alignCenter>
                  <Txt padding={"0px 0px 0px 6px"}>We accept credit cards</Txt>
                  {CREDIT_CARD_OPTIONS.map((card) => (
                    <Contained
                      padding={"0 4px"}
                      key={`creditCardImg-${card.name}`}
                    >
                      <CreditCardImg src={card.image} alt={card.name} />
                    </Contained>
                  ))}
                </Row>
                <CreditCardForm
                  creditInfo={creditInfo}
                  onChange={handleCreditCardFormInput}
                  showInvalidFields={showInvalidFields}
                />
              </OptionsContainer>

              {/* REVIEW SHOPPING CART */}
              <Contained padding={"15px "}>
                <Txt big bold padding={"0px 4px 4px 4px"}>
                  Review Your Order
                </Txt>
                <CheckOutShoppingCart cart={cart} />
              </Contained>

              {/* ORDER SUMMARY */}
              <Contained padding={"30px 5px 0px 5px"}>
                <Row justifyCenter>
                  <OrderSummaryBox
                    subtotal={subtotal}
                    shippingOption={localForm.shippingOption}
                    tax={estimatedTax}
                  />
                </Row>
              </Contained>

              {/* USER INPUT ERROR ALERT */}
              {invalidFields.length > 0 && (
                <Row justifyCenter>
                  <Contained>
                    <ErrorTxt>
                      {`${invalidFields.length} of the fields you entered ${
                        invalidFields.length === 1 ? "is" : "are"
                      } invalid.`}
                    </ErrorTxt>
                    <ErrorTxt>Please double check:</ErrorTxt>
                    <Padded padLeft={"20px"}>
                      {invalidFields.map((field) => (
                        <ErrorTxt bold key={`Error-message-${field}`}>
                          {field}
                        </ErrorTxt>
                      ))}
                    </Padded>
                  </Contained>
                </Row>
              )}

              {/* SUBMIT BUTTON */}
              <Contained>
                <Column justifyCenter alignCenter>
                  <SubmitButton onClick={handleSubmit}>
                    Submit Your Order
                  </SubmitButton>
                </Column>
              </Contained>
            </Contained>

            <MiniCartView cart={cart} />
          </FormsAndMiniCart>
        </FormContainer>
      )}
    </>
  );
};
