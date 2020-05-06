import styled from "styled-components";
import { useState, useRef } from "react";
import { Transition } from "react-transition-group";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Row } from "../Row";
import { Contained } from "../Contained";
import { ENTERED, TransitionStatus } from "react-transition-group/Transition";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export type SelectBoxOption = {
  text: string;
  visual?: JSX.Element;
};

const Option = styled.div`
  width: 100%;
  height: 40px;

  font-size: ${props => props.theme.typography.fontSize};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  border-top: solid 1px ${props => props.theme.colors.transparentBlack};
`;

const DropDownArrow = styled.div<{ shouldPointDown: boolean }>`
  width: 13px;
  height: 13px;

  border-bottom: solid 3px ${props => props.theme.colors.black};
  border-right: solid 3px ${props => props.theme.colors.black};

  position: relative;
  top: ${props => (props.shouldPointDown ? "0px" : "5px")};

  transform: ${props =>
    props.shouldPointDown ? "rotate(45deg)" : "rotate(-135deg)"};
  transition: all 0.3s ease-in-out;
`;

const OptionsContainer = styled.div<{ state: TransitionStatus }>`
  position: absolute;
  top: 40px;
  left: -1px;

  width: 180px;
  max-height: ${props => (props.state === ENTERED ? "180px" : "0px")};

  overflow-y: scroll;

  padding: 5px;
  background-color: white;

  border: solid 1px ${props => props.theme.colors.black};

  z-index: ${props => props.theme.zIndexes.productOptionSelecter};

  transition: all 0.3s ease-in-out;

  @media ${mediaDevices.laptopL} {
    width: 290px;
  }
`;

const ProductSelectBoxContainer = styled.div`
  width: 290px;
  height: 30px;

  padding: 5px;

  font-size: ${props => props.theme.typography.fontSize};
  border: solid 1px ${props => props.theme.colors.black};

  display: flex;
  align-items: center;

  position: relative;

  @media ${mediaDevices.tablet} {
    width: 180px;
  }

  @media ${mediaDevices.laptopL} {
    width: 290px;
  }
`;

const ProductSelectBoxModalBackground = styled.div<{ state: TransitionStatus }>`
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 100%;

  z-index: ${props => props.theme.zIndexes.modal};

  transition: all 0.3s linear;
  opacity: ${props => (props.state === ENTERED ? 1 : 0)};

  background-color: rgba(0, 0, 0, 0.8);

  @supports (
    (-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
  ) {
    background-color: rgba(255, 255, 255, 0);
    -webkit-backdrop-filter: blur(1px) grayscale(100%) brightness(30%);
    backdrop-filter: blur(1px) grayscale(100%) brightness(30%);
  }
`;

const ProductSelectBoxModal = styled.div<{ state: TransitionStatus }>`
  position: absolute;
  bottom: ${props => (props.state === ENTERED ? "50px" : "-300px")};
  left: 0px;

  transition: all 0.3s ease-in-out;

  width: 100%;
  max-height: 300px;
  height: auto;

  border-top: solid 1px ${props => props.theme.colors.black};
  border-bottom: solid 1px ${props => props.theme.colors.black};

  background-color: white;
`;

const ModalScrollArea = styled.div`
  width: 100%;
  max-height: 250px;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const ProductSelectBoxModalItem = styled.div<{ isFiltered?: boolean }>`
  width: 100%;
  height: 40px;

  border-bottom: ${props =>
    props.isFiltered
      ? "none"
      : `solid 1px ${props.theme.colors.transparentBlack}`};
  border-top: ${props =>
    props.isFiltered
      ? "none"
      : `solid 1px ${props.theme.colors.transparentBlack}`};
  padding: 5px;

  display: flex;
  align-items: center;

  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
`;

const ProductSelectBoxModalTitle = styled(ProductSelectBoxModalItem)`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.black};
  border-bottom: none;
`;

type ProductSelectBoxProps = {
  label: string;
  options: SelectBoxOption[];
  onChange: (option: string) => void;
  startIndex?: number;
};

export const ProductOptionSelectBox = ({
  label,
  options,
  onChange,
  startIndex = 0
}: ProductSelectBoxProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  const selectorRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectorRef, () => setIsActive(false));

  function handleSelection(index: number) {
    setIsActive(false);
    setSelectedIndex(index);
    onChange(options[index].text);
  }

  return (
    <>
      <ProductSelectBoxContainer
        onClick={() => setIsActive(!isActive)}
        onKeyPress={accessibleEnterKeyPress(() => setIsActive(!isActive))}
        tabIndex={0}
        ref={selectorRef}
        aria-label={`${label}`}
      >
        <Row justifyBetween alignCenter>
          <Contained>
            <Row alignCenter>
              {options[selectedIndex].visual && (
                <Padded padLeft={"10px"}>
                  {options[selectedIndex].visual}
                </Padded>
              )}
              <Txt padding={"0px 0px 0px 10px"}>
                {options[selectedIndex].text}
              </Txt>
            </Row>
          </Contained>
          {options.length > 1 && (
            <Contained width={"20px"} height={"20px"} padding={"5px"}>
              <DropDownArrow shouldPointDown={!isActive} />
            </Contained>
          )}
        </Row>
        {options.length > 1 && (
          <Transition
            in={isActive}
            timeout={{
              enter: 0,
              exit: 300
            }}
            mountOnEnter
            unmountOnExit
          >
            {state => (
              <DisplayAtMedia tablet laptop desktop>
                <OptionsContainer state={state}>
                  {options.map((option, index) => (
                    <Option
                      onClick={() => handleSelection(index)}
                      onKeyPress={accessibleEnterKeyPress(() =>
                        handleSelection(index)
                      )}
                      tabIndex={0}
                      key={`dropDownOption${option.text}${index}`}
                    >
                      {option.visual && (
                        <Padded padLeft={"10px"}>{option.visual}</Padded>
                      )}
                      <Txt padding={"0px 0px 0px 10px"}>{option.text}</Txt>
                    </Option>
                  ))}
                </OptionsContainer>
              </DisplayAtMedia>
            )}
          </Transition>
        )}
      </ProductSelectBoxContainer>
      {options.length > 1 && (
        <Transition
          in={isActive}
          timeout={{
            enter: 50,
            exit: 300
          }}
          mountOnEnter
          unmountOnExit
        >
          {state => (
            <DisplayAtMedia mobile>
              <ProductSelectBoxModalBackground
                state={state}
                onClick={() => setIsActive(!isActive)}
                onKeyPress={accessibleEnterKeyPress(() =>
                  setIsActive(!isActive)
                )}
              >
                <ProductSelectBoxModal state={state}>
                  <ProductSelectBoxModalTitle>
                    <Txt bold padding={"0px 0px 0px 30px"}>
                      {label}:
                    </Txt>
                  </ProductSelectBoxModalTitle>
                  <ModalScrollArea>
                    {options.map((option, index) => (
                      <ProductSelectBoxModalItem
                        onClick={() => handleSelection(index)}
                        onKeyPress={accessibleEnterKeyPress(() =>
                          handleSelection(index)
                        )}
                        tabIndex={0}
                        key={`modalDropDownOption${option.text}${index}`}
                        isFiltered={index !== selectedIndex}
                      >
                        <Row justifyAround alignCenter>
                          {option.visual && (
                            <Padded padLeft={"10px"}>{option.visual}</Padded>
                          )}
                          <Txt
                            bold={index === selectedIndex}
                            padding={"0px 0px 0px 10px"}
                          >
                            {option.text}
                          </Txt>
                        </Row>
                      </ProductSelectBoxModalItem>
                    ))}
                  </ModalScrollArea>
                </ProductSelectBoxModal>
              </ProductSelectBoxModalBackground>
            </DisplayAtMedia>
          )}
        </Transition>
      )}
    </>
  );
};
