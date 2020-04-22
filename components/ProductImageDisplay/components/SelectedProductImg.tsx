import styled from "styled-components";
import { mediaDevices } from "../../DisplayAtMedia";


export const SelectedProductImg = styled.img`
  width: 300px;
  height: auto;
  cursor: zoom-in;

  @media ${mediaDevices.mobileM} {
    width: 340px;
  }

  @media ${mediaDevices.mobileL} {
    width: 400px;
  }

  @media ${mediaDevices.tablet} {
    width: 400px;
  }

  @media ${mediaDevices.laptop} {
    width: 500px;
  }

  @media ${mediaDevices.laptopL} {
    width: 680px;
  }

  @media ${mediaDevices.desktop} {
    width: 880px;
  }
`;