import styled from "styled-components";
import { mediaDevices } from "../../DisplayAtMedia";

export const SelectedPhotoModalBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 100vh;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  background-color: ${props => props.theme.colors.transparentBlack};

  z-index: ${props => props.theme.zIndexes.modal};

  @media ${mediaDevices.tablet} {
    justify-content: center;
  }
`;