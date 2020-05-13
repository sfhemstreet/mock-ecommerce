import { formatCamelCaseToRegularString } from "../../util/formatCamelCaseToRegularString";
import styled from 'styled-components';
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
import { CREDIT_CARD_EXPIRATION_MONTHS, getCreditCardExpirationYears } from "../../util/checkout/CreditCardOptions";

const ExpirationDateInput = styled.select`
  width: 60px;
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
              <ExpirationDateInput
                id={`creditcard-${key}-month`}
                name={`creditcard-${key}-month`}
                title={title + " Month"}
                value={creditInfo[key].month}
                onChange={(evt) =>
                  onChange(key, {
                    ...creditInfo.expiration,
                    month: evt.target.value,
                  })
                }
              >
                {CREDIT_CARD_EXPIRATION_MONTHS.map(month => (
                  <option value={month} key={`Expiration-month-${month}`}>
                    {month}
                  </option>
                ))}
              </ExpirationDateInput>
            </Contained>
            <Contained padding={"2px 0px 2px 0px"}>
              <CheckoutLabel title={title} htmlFor={`creditcard-${key}-year`}>
                Year
              </CheckoutLabel>
              <ExpirationDateInput
                id={`creditcard-${key}-year`}
                name={`creditcard-${key}-year`}
                title={title + " Year"}
                value={creditInfo[key].year}
                onChange={(evt) =>
                  onChange(key, {
                    ...creditInfo.expiration,
                    year: evt.target.value,
                  })
                }
              >
                {getCreditCardExpirationYears().map(year => (
                  <option value={year} key={`Expiration-year-${year}`}>
                    {year}
                  </option>
                ))}
              </ExpirationDateInput>
            </Contained>
          </Row>
        )}
      </Padded>
    );
  });

  return <>{creditCardForm}</>;
};
