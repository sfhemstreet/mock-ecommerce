import styled from "styled-components";
import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Txt } from "../components/Txt";
import { Centered } from "../components/Centered";
import { Column } from "../components/Column";
import { Row } from "../components/Row";
import Head from "next/head";

const FourZeroFourContainer = styled.div`
  width: 100%;
  height: 700px;

  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

type FourZeroFourPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function FourZeroFourPage({
  navigationBarSideDrawerData
}: FourZeroFourPageProps) {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="Content not found."></meta>
      </Head>
      <NavigationBarSideDrawerLayout
        data={navigationBarSideDrawerData}
        filterChildrenWhenSideDrawerOpen
      >
        <FourZeroFourContainer>
          <Centered>
            <Column alignCenter>
              <Txt big bold padding={"40px"}>
                404: Page Not Found
              </Txt>
              <Txt>Sorry :(</Txt>
            </Column>
          </Centered>
        </FourZeroFourContainer>
      </NavigationBarSideDrawerLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();

  return {
    props: {
      navigationBarSideDrawerData
    }
  };
};
