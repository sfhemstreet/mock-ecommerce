import {
  ShippingAddress,
  ShippingAddressKeys,
} from "../../util/checkout/CheckOutFormTypes";
import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import { Padded } from "../Padded";
import { CheckoutLabel } from "./CheckOutLabel";
import { StateSelectionBox } from "./StateSelectionBox";
import { CheckOutInput } from "./CheckOutInput";
import { Row } from "../Row";
import { validateFieldReducer } from "../../util/checkout/validateFieldReducer";
import { ErrorTxt } from "./ErrorTxt";

type ShippingAddressFormProps = {
  shippingAddress: ShippingAddress;
  onChange: (type: ShippingAddressKeys, value: string) => void;
  onBlur: () => void;
  showInvalidFields: boolean;
};

export const ShippingAddressForm = ({
  shippingAddress,
  onChange,
  onBlur,
  showInvalidFields,
}: ShippingAddressFormProps) => {
  const shippingForm = Object.keys(shippingAddress).map((k, index) => {
    const key = k as ShippingAddressKeys;
    const title = formatCamelCaseToRegularString(key);
    const isValid = showInvalidFields
      ? validateFieldReducer(key, shippingAddress[key])
      : true;
    return (
      <Padded padding={"10px"} key={`shipping-${key}-${index}`}>
        <CheckoutLabel title={title} htmlFor={`shipping-${key}`}>
          <Row alignEnd>
            {title}
            {showInvalidFields && !isValid && <ErrorTxt>- Invalid</ErrorTxt>}
          </Row>
        </CheckoutLabel>
        {key === "state" ? (
          <StateSelectionBox
            onSelect={(state) => onChange(key, state)}
            currentSelection={shippingAddress.state}
          />
        ) : (
          <CheckOutInput
            id={`shipping-${key}`}
            name={`shipping-${key}`}
            title={title}
            type={"text"}
            value={shippingAddress[key]}
            onBlur={(evt) => onBlur()}
            onChange={(evt) => onChange(key, evt.target.value)}
          />
        )}
      </Padded>
    );
  });

  return <>{shippingForm}</>;
};
