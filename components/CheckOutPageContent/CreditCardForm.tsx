import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import { Padded } from "../Padded";
import { CheckoutLabel } from "./CheckOutLabel";
import { CheckOutInput } from "./CheckOutInput";
import { Row } from "../Row";
import { Contained } from "../Contained";
import {
  CreditCardInfo,
  CreditCardInfoKeys,
} from "../../util/checkout/CheckOutFormTypes";
import { validateCreditCard } from "../../util/checkout/validateCreditCard";
import { ErrorTxt } from "./ErrorTxt";

type CreditCardFormProps = {
  creditInfo: CreditCardInfo;
  onChange: (
    type: CreditCardInfoKeys,
    value: string | { year: string; month: string }
  ) => void;
  showInvalidFields: boolean;
};

export const CreditCardForm = ({
  creditInfo,
  onChange,
  showInvalidFields,
}: CreditCardFormProps) => {
  const validationObject = showInvalidFields
    ? validateCreditCard(creditInfo)
    : {
        cardNumber: true,
        cardSecurityCode: true,
        expiration: true,
      };
  const creditCardForm = Object.keys(creditInfo).map((k) => {
    const key = k as CreditCardInfoKeys;
    const title = formatCamelCaseToRegularString(key);
    const isValid = validationObject[key];
    return (
      <Padded padding={"10px"} key={`creditcard-${key}`}>
        <CheckoutLabel title={title} htmlFor={`creditcard-${key}`}>
          <Row alignEnd>
            {title} {showInvalidFields && !isValid && <ErrorTxt>- Invalid</ErrorTxt>}
          </Row>
        </CheckoutLabel>
        {(key === "cardNumber" || key === "cardSecurityCode") && (
          <CheckOutInput
            small={key === "cardSecurityCode"}
            id={`creditcard-${key}`}
            name={`creditcard-${key}`}
            title={title}
            type={"text"}
            value={creditInfo[key]}
            onChange={(evt) => onChange(key, evt.target.value)}
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
                onChange={(evt) =>
                  onChange(key, {
                    ...creditInfo.expiration,
                    month: evt.target.value,
                  })
                }
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
                onChange={(evt) =>
                  onChange(key, {
                    ...creditInfo.expiration,
                    year: evt.target.value,
                  })
                }
              />
            </Contained>
          </Row>
        )}
      </Padded>
    );
  });

  return <>{creditCardForm}</>;
};
