import styled from "styled-components";
import { Row } from "./Row";
import { Txt } from "./Txt";
import { Column } from "./Column";

const FooterContainer = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.green};
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Row justifyEvenly alignCenter>
        <Column>
          <Txt big bold underline padding={"5px 0px"}>Resources</Txt>
          <Txt><FooterLink>Returns</FooterLink></Txt>
          <Txt><FooterLink>Order Status</FooterLink></Txt>
          <Txt><FooterLink>Privacy Policy</FooterLink></Txt>
          <Txt><FooterLink>Terms of Use</FooterLink></Txt>
        </Column>
        <Column>
          <Txt big bold underline padding={"5px 0px"}>About</Txt>
          <Txt><FooterLink>About Us</FooterLink></Txt>
          <Txt><FooterLink>Contact</FooterLink></Txt>
          <Txt><FooterLink>Site Map</FooterLink></Txt>
          <Txt><FooterLink>Careers</FooterLink></Txt>
        </Column>
      </Row>
    </FooterContainer>
  );
};
