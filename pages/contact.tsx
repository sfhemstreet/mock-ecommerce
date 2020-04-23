import styled from "styled-components";
import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import {
  getContactPageData,
  ContactPageData
} from "../queries/page/getContactPageData";
import { Txt } from "../components/Txt";
import { Centered } from "../components/Centered";
import { Column } from "../components/Column";
import { Row } from "../components/Row";
import Head from "next/head";

const ContactPageContainer = styled.div`
  width: 100%;
  height: 700px;

  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

type ContactPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  contactPageData: ContactPageData;
};

export default function ContactPage({
  navigationBarSideDrawerData,
  contactPageData
}: ContactPageProps) {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBarSideDrawerLayout
        data={navigationBarSideDrawerData}
        filterChildrenWhenSideDrawerOpen
      >
        <ContactPageContainer>
          <Centered padding={"30px"}>
            <Column alignCenter>
              <Txt big bold underline padding={"5px"}>
                {contactPageData.title}
              </Txt>
              <Txt big padding={"5px 5px 30px 5px"}>
                {contactPageData.subtitle}
              </Txt>
              <Column alignBaseline justifyEvenly>
                <Row alignCenter>
                  <Txt underline padding={"5px"}>
                    Email:{" "}
                  </Txt>
                  <Txt padding={"5px"}>{contactPageData.email}</Txt>
                </Row>
                <Row alignCenter>
                  <Txt underline padding={"5px"}>
                    Phone:{" "}
                  </Txt>
                  <Txt padding={"5px"}>{contactPageData.phone}</Txt>
                </Row>
                <Row alignCenter>
                  <Txt underline padding={"5px"}>
                    Address:
                  </Txt>
                  <Txt padding={"5px"}>{contactPageData.address}</Txt>
                </Row>
              </Column>
            </Column>
          </Centered>
        </ContactPageContainer>
      </NavigationBarSideDrawerLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const contactPageData = await getContactPageData();

  return {
    props: {
      navigationBarSideDrawerData,
      contactPageData
    }
  };
};
