import styled from "styled-components";
import { mediaDevices } from "../../DisplayAtMedia";

export const ProductImageDisplayContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${mediaDevices.mobileM} {
    width: 340px;
  }

  @media ${mediaDevices.mobileL} {
    width: 400px;
  }

  @media ${mediaDevices.tablet} {
    flex-direction: row-reverse;
    width: 510px;
  }

  @media ${mediaDevices.laptop} {
    flex-direction: row-reverse;
    width: 610px;
  }

  @media ${mediaDevices.laptopL} {
    flex-direction: row-reverse;
    width: 790px;
  }

  @media ${mediaDevices.desktop} {
    flex-direction: row-reverse;
    width: 1000px;
  }
`;