import { CheckoutLabel } from "./CheckOutLabel";
import { CheckOutInput } from "./CheckOutInput";
import { StateSelectionBox } from "./StateSelectionBox";
import { Padded } from "../Padded";
import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import { Billing, BillingKeys } from "../../util/checkout/CheckOutFormTypes";
import { Row } from "../Row";
import { validateFieldReducer } from "../../util/checkout/validateFieldReducer";
import { ErrorTxt } from "./ErrorTxt";

type BillingFormProps = {
  billing: Billing;
  onChange: (type: BillingKeys, value: string) => void;
  onBlur: () => void;
  showInvalidFields: boolean;
};

export const BillingForm = ({
  billing,
  onChange,
  onBlur,
  showInvalidFields,
}: BillingFormProps) => {
  const billingForm = Object.keys(billing).map((k) => {
    const key = k as BillingKeys;
    const title = formatCamelCaseToRegularString(key);
    const isValid = showInvalidFields
      ? validateFieldReducer(key, billing[key])
      : true;
    return (
      <Padded padding={"10px"} key={`billing-${key}`}>
        <CheckoutLabel title={title} htmlFor={`billing-${key}`}>
          <Row alignEnd>
            {title}
            {showInvalidFields && !isValid && <ErrorTxt>- Invalid</ErrorTxt>}
          </Row>
        </CheckoutLabel>
        {key === "state" ? (
          <StateSelectionBox
            onSelect={(state) => onChange(key, state)}
            currentSelection={billing.state}
          />
        ) : (
          <CheckOutInput
            id={`billing-${key}`}
            name={`billing-${key}`}
            title={title}
            type={key === "email" ? "email" : "text"}
            value={billing[key]}
            onBlur={(evt) => onBlur()}
            onChange={(evt) => onChange(key, evt.target.value)}
          />
        )}
      </Padded>
    );
  });

  return <>{billingForm}</>;
};
