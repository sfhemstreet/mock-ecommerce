import styled, { WithThemeFnInterface } from "styled-components";
import { useState } from "react";
import { Transition } from "react-transition-group";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Row } from "../Row";
import { Contained } from "../Contained";
import { ENTERED, TransitionStatus } from "react-transition-group/Transition";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";

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

const OptionsContainer = styled.div<{state: TransitionStatus}>`
  position: absolute;
  top: 40px;
  left: -1px;

  width: 180px;
  max-height: ${props => (props.state === ENTERED ? "185px" : "0px")};

  overflow-y: scroll;

  padding: 5px;
  background-color: white;

  border: solid 1px ${props => props.theme.colors.black};

  z-index: 3;

  transition: all 0.3s ease-in-out;
`;

const ProductSelectBoxContainer = styled.div`
  width: 300px;
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
`;

const ProductSelectBoxModalBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px) grayscale(100%);
  z-index: 6;

  transition: backdrop-filter 0.3s ease-in-out;
`;

const ProductSelectBoxModal = styled.div<{ state: TransitionStatus }>`
  position: absolute;
  bottom: ${props => props.state === ENTERED ? "50px" : "-300px"};
  left: 0px;

  transition: all 0.3s ease-in-out;

  width: 100%;
  max-height: 300px;

  border-top: solid 1px ${props => props.theme.colors.black};
  border-bottom: solid 1px ${props => props.theme.colors.black};

  background-color: white;
`;

const ModalScrollArea = styled.div`
  width: 100%;
  height: 200px;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const ProductSelectBoxModalItem = styled.div`
  width: 100%;
  height: 40px;

  border-bottom: solid 1px ${props => props.theme.colors.transparentBlack};
  padding: 5px;

  display: flex;
  align-items: center;
`;

const ProductSelectBoxModalTitle = styled(ProductSelectBoxModalItem)`
  border-bottom: solid 1px ${props => props.theme.colors.black};
`;

type ProductSelectBoxProps = {
  label: string;
  options: SelectBoxOption[];
  onChange: (option: string) => void;
};

export const ProductOptionSelectBox = ({
  label,
  options,
  onChange
}: ProductSelectBoxProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelection = (index: number) => {
    setIsActive(false);
    setSelectedIndex(index);
    onChange(options[selectedIndex].text);
  };

  return (
    <>
      <ProductSelectBoxContainer>
        <Row
          justifyBetween
          alignCenter
          onClick={() => setIsActive(!isActive)}
          onKeyPress={accessibleEnterKeyPress(() => setIsActive(!isActive))}
          tabIndex={0}
        >
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
              enter: 50,
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
                onClick={() => setIsActive(!isActive)}
                onKeyPress={accessibleEnterKeyPress(() =>
                  setIsActive(!isActive)
                )}
              >
                <ProductSelectBoxModal state={state}>
                  <ProductSelectBoxModalTitle>
                    <Txt bold padding={"0px 0px 0px 30px"}>{label}:</Txt>
                  </ProductSelectBoxModalTitle>
                  <ModalScrollArea>
                    {options.map((option, index) => (
                      <ProductSelectBoxModalItem
                        onClick={() => handleSelection(index)}
                        onKeyPress={accessibleEnterKeyPress(() =>
                          handleSelection(index)
                        )}
                        tabIndex={0}
                      >
                        <Row justifyAround alignCenter>
                          {option.visual && (
                            <Padded padLeft={"10px"}>{option.visual}</Padded>
                          )}
                          <Txt padding={"0px 0px 0px 10px"}>{option.text}</Txt>
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
