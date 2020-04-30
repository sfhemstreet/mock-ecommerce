import styled from "styled-components";
import { GetStaticProps } from "next";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Txt } from "../components/Txt";
import Head from "next/head";
import { Contained } from "../components/Contained";
import { CheckOutPageContent } from "../components/CheckOutPageContent/CheckOutPageContent";

const CheckOutContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

type CheckOutPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function CheckOutPage({
  navigationBarSideDrawerData
}: CheckOutPageProps) {
  return (
    <>
      <Head>
        <title>Careers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="Check Out Page"></meta>
      </Head>
      <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData}>
        <Txt alignCenter padding={"60px"} big bold>
          Check Out
        </Txt>
        <Contained minHeight={"600px"}>
          <CheckOutPageContent />
        </Contained>
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