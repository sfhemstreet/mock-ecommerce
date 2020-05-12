import styled from "styled-components";
import { GetStaticProps } from "next";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData,
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Txt } from "../components/Txt";
import Head from "next/head";
import { CheckOutPageContent } from "../components/CheckOutPageContent/CheckOutPageContent";
import { WhiteContainer } from "../components/WhiteContainer";


type CheckOutPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function CheckOutPage({
  navigationBarSideDrawerData,
}: CheckOutPageProps) {
  return (
    <>
      <Head>
        <title>Check Out</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="Check Out Page"></meta>
      </Head>
      <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData}>
        <WhiteContainer>
          <Txt alignCenter padding={"30px 0px"} big bold>
            Check Out
          </Txt>
          <CheckOutPageContent />
        </WhiteContainer>
      </NavigationBarSideDrawerLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();

  return {
    props: {
      navigationBarSideDrawerData,
    },
  };
};
