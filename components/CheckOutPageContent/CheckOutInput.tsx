import styled from "styled-components";
import { mediaDevices } from "../DisplayAtMedia";

export const CheckOutInput = styled.input<{ small?: boolean }>`
  width: ${(props) => (props.small ? "60px" : "250px")};
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
    width: ${(props) => (props.small ? "60px" : "290px")};
  }

  @media ${mediaDevices.tablet} {
    width: ${(props) => (props.small ? "60px" : "250px")};
  }
`;