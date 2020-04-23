import styled from "styled-components";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";
import { mediaDevices } from "../DisplayAtMedia";
import { FunctionComponent, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ModalContainer = styled.div<{ state: TransitionStatus }>`
  position: fixed;
  top: ${props => (props.state === ENTERED ? "0px" : "-100vh")};
  right: 0px;

  transition: all 0.3s ease-in-out;

  width: 100%;
  height: 100%;

  z-index: ${props => props.theme.zIndexes.modal};

  background-color: rgba(0, 0, 0, 0.87);

  @supports (
    (-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
  ) {
    background-color: rgba(255, 255, 255, 0);
    -webkit-backdrop-filter: blur(1px) grayscale(100%) brightness(10%);
    backdrop-filter: blur(1px) grayscale(100%) brightness(10%);
  }

  @media ${mediaDevices.tablet} {
    position: absolute;
    top: 71px;
    right: ${props => (props.state === ENTERED ? "0px" : "-415px")};

    width: 410px;
    height: 500px;

    z-index: ${props => props.theme.zIndexes.modalBelowNavigationBar};
  }
`;

type ModalProps = {
  state: TransitionStatus;
  onClose: () => void;
};

export const Modal: FunctionComponent<ModalProps> = ({
  state,
  onClose,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => onClose());

  return (
    <ModalContainer ref={modalRef} state={state}>
      {children}
    </ModalContainer>
  );
};
