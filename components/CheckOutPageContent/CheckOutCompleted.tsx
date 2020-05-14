import { ShoppingCart } from "../../storage/shoppingCart/shoppingCartTypes";
import { CheckOutForm } from "../../storage/checkout/checkoutTypes";
import { Txt } from "../Txt";
import { deleteCheckOutForm } from "../../storage/checkout/checkoutActions";
import { mutateCheckoutForm, mutateShoppingCart } from "../../storage/storage";
import { removeAllItemsFromShoppingCart } from "../../storage/shoppingCart/shoppingCartActions";
import { Column } from "../Column";
import { FlexBox } from "../FlexBox";
import { MiniCartView } from "./MiniCartView";
import { Contained } from "../Contained";
import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import {
  BillingKeys,
  ShippingAddressKeys,
} from "../../util/checkout/CheckOutFormTypes";

type CheckOutCompletedProps = {
  cart: ShoppingCart;
  form: CheckOutForm;
};

export const CheckOutCompleted = ({ cart, form }: CheckOutCompletedProps) => {
  mutateCheckoutForm(deleteCheckOutForm());
  mutateShoppingCart(removeAllItemsFromShoppingCart());

  const billingInfo = Object.keys(form.billing).map((k) => {
    const key = k as BillingKeys;
    return (
      <Txt>
        {`${formatCamelCaseToRegularString(key)}: ${form.billing[key]}`}
      </Txt>
    );
  });

  const shippingInfo = Object.keys(form.shippingAddress).map((k) => {
    const key = k as ShippingAddressKeys;
    return (
      <Txt>
        {`${formatCamelCaseToRegularString(key)}: ${form.shippingAddress[key]}`}
      </Txt>
    );
  });

  return (
    <div>
      <Txt bold big alignCenter>
        Successful!
      </Txt>
      <Txt alignCenter padding={"20px"}>
        {`Thank you ${form.billing.firstName} for your order. We will work on getting it out to you right away!`}
      </Txt>
      <Column alignCenter>
        <Contained padding={"10px"}>
          <FlexBox>
            <Contained padding={"20px"}>
              <Txt bold underline>
                Billing
              </Txt>
              {billingInfo}
            </Contained>
            <Contained padding={"20px"}>
              <Txt bold underline>
                Shipping
              </Txt>
              <Txt>{`Shipping Option: ${form.shippingOption.text}`}</Txt>
              {shippingInfo}
            </Contained>
          </FlexBox>
        </Contained>
        <MiniCartView cart={cart} />
      </Column>
    </div>
  );
};
