import { ShippingOption } from "../../util/checkout/ShippingOptions";
import { OptionsContainer } from "./OptionsContainer";
import { Txt } from "../Txt";
import { Row } from "../Row";

type OrderSummaryBoxProps = {
  subtotal: number;
  shippingOption: ShippingOption;
  tax?: number;
};

export const OrderSummaryBox = ({
  subtotal,
  shippingOption,
  tax,
}: OrderSummaryBoxProps) => (
  <OptionsContainer>
    <Txt big bold padding={"2px 0px 5px 2px"}>
      Order Summary
    </Txt>
    <Row justifyBetween alignCenter>
      <Txt padding={"0px 4px"}>Subtotal</Txt>{" "}
      <Txt bold padding={"0px 4px"}>
        ${subtotal.toFixed(2)}
      </Txt>
    </Row>
    <Row justifyBetween alignCenter>
      <Txt padding={"4px 4px 0px 4px"}>Shipping</Txt>{" "}
      <Txt bold padding={"4px 4px 0px 4px"}>
        ${shippingOption.price}
      </Txt>
    </Row>
    <Row justifyBetween alignEnd>
      <Txt padding={"4px 4px 0px 4px"}>Estimated Tax</Txt>{" "}
      <Txt small={tax === undefined} bold={tax !== undefined} padding={"4px 4px 0px 4px"}>
        {tax !== undefined ? `$${tax.toFixed(2)}` : "Calculated at Next Step"}
      </Txt>
    </Row>
    <Row justifyBetween alignCenter>
      <Txt big bold padding={"6px 4px 0px 4px"}>
        Total
      </Txt>
      <Txt big bold padding={"6px 4px 0px 4px"}>
        ${(subtotal + shippingOption.price + (tax ?? 0) ).toFixed(2)}
      </Txt>
    </Row>
  </OptionsContainer>
);
