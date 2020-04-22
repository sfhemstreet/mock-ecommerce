import styled from "styled-components";
import { mediaDevices } from "../../DisplayAtMedia";

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  overflow: scroll;
  padding-top: 3px;

  @media ${mediaDevices.mobileM} {
    width: 340px;
  }

  @media ${mediaDevices.mobileL} {
    width: 400px;
  }

  @media ${mediaDevices.tablet} {
    flex-direction: column;
    width: 100px;
    height: 400px;
    padding-right: 8px;
    padding-top: 0px;
  }

  @media ${mediaDevices.laptopL} {
    flex-direction: column;
    width: 100px;
    height: 580px;
    padding-right: 8px;
    padding-top: 0px;
  }
`;