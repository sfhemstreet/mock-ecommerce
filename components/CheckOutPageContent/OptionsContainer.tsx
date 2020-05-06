import styled from "styled-components";
import { mediaDevices } from "../DisplayAtMedia";

export const OptionsContainer = styled.form`
  margin: 35px 0px;

  padding: 0px 5px 0px 10px ;

  width: 95%;
  height: auto;

  @media ${mediaDevices.mobileM} {
    width: 95%;
    padding: 0px 5px 0px 10px ;
  }

  @media ${mediaDevices.tablet} {
    margin: 2px 2px 30px 2px;
    width: 300px;
  }
`;