import styled from "styled-components";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerData, getNavigationBarSideDrawerData } from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { Centered } from "../../components/Centered";
import { Column } from "../../components/Column";
import { Txt } from "../../components/Txt";
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
  navigationBarSideDrawerData,
  
}: FourZeroFourPageProps) {
  return (
    <>
    <Head>
        <title>404: Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="Page not found"></meta>
      </Head>
    <NavigationBarSideDrawerLayout
      data={navigationBarSideDrawerData}
      filterChildrenWhenSideDrawerOpen
    >
      <FourZeroFourContainer>
        <Centered>
          <Column alignCenter>
            <Txt big bold  padding={"40px"}>
              404: Page Not Found 
            </Txt>
            <Txt>
              That product may no longer be sold here.
            </Txt>
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
      navigationBarSideDrawerData,
    }
  };
};