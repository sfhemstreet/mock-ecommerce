import { ShippingOption, SHIPPING_OPTIONS } from "../../util/checkout/ShippingOptions";
import { Txt } from "../Txt";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { SelectBox } from "./SelectBox";
import { OptionsContainer } from "./OptionsContainer";

type ShippingOptionsSelectionBoxProps = {
  onSelect: (option: ShippingOption) => void;
  shippingOption: ShippingOption;
};

export const ShippingOptionsSelectionBox = ({
  onSelect,
  shippingOption,
}: ShippingOptionsSelectionBoxProps) => (
  <OptionsContainer>
    <Txt big bold padding={"2px 0px 5px 2px"}>
      Shipping Option
    </Txt>
    {SHIPPING_OPTIONS.map((option, index) => (
      <Contained
        padding={"0px 0px 5px 4px"}
        key={`ShippingOption-${option.text}`}
      >
        <Row alignCenter justifyBetween>
          <Row alignCenter justifyStart>
            <SelectBox
              label={`Shipping option, ${option.text}, priced at $${option.price}`}
              onClick={() => onSelect(SHIPPING_OPTIONS[index])}
              isSelected={SHIPPING_OPTIONS[index].text === shippingOption.text}
            />
            <Txt small padding={"0px 4px"}>
              {option.text}
            </Txt>
          </Row>

          <Txt small bold>
            {option.price === 0 ? "Free!" : `$${option.price}`}
          </Txt>
        </Row>
      </Contained>
    ))}
  </OptionsContainer>
);
