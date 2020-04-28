import Link from "next/link";
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
          <Txt big bold underline padding={"5px 0px"}>
            Resources
          </Txt>
          <Txt>
            <Link href={"/returns"}>
              <FooterLink>Returns</FooterLink>
            </Link>
          </Txt>
          <Txt>
            <Link href={"/privacy"}>
              <FooterLink>Privacy Policy</FooterLink>
            </Link>
          </Txt>
          <Txt>
            <Link href={"/terms"}>
              <FooterLink>Terms of Use</FooterLink>
            </Link>
          </Txt>
        </Column>
        <Column>
          <Txt big bold underline padding={"5px 0px"}>
            About
          </Txt>
          <Txt>
            <Link href={"/about"}>
              <FooterLink>About Us</FooterLink>
            </Link>
          </Txt>
          <Txt>
            <Link href={"/contact"}>
              <FooterLink>Contact</FooterLink>
            </Link>
          </Txt>
          <Txt>
            <Link href={"/careers"}>
              <FooterLink>Careers</FooterLink>
            </Link>
          </Txt>
        </Column>
      </Row>
    </FooterContainer>
  );
};
