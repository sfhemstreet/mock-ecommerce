import styled from "styled-components";
import { STATES_TAXES } from "../../util/checkout/StatesTaxes";
import { mediaDevices } from "../DisplayAtMedia";

const StateInput = styled.select`
  width: 290px;
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

  @media ${mediaDevices.mobileM} {
    width: 330px;
  }

  @media ${mediaDevices.tablet} {
    width: 290px;
  }
`;

type StateSelectionBoxProps = {
  onSelect: (state: string) => void;
  currentSelection: string;
};

export const StateSelectionBox = ({
  onSelect,
  currentSelection,
}: StateSelectionBoxProps) => (
  <StateInput
    id={`shipping-state`}
    name="shipping-state"
    placeholder={currentSelection === "" ? "Select State" : currentSelection}
    onChange={(evt) => onSelect(evt.target.value)}
    value={currentSelection}
  >
    <option value="" >Select State</option>
    {STATES_TAXES.map((s) => (
      <option value={s.state} key={`state-option-${s.state}`}>
        {s.state}
      </option>
    ))}
  </StateInput>
);
