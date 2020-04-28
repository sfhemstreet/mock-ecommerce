import styled from "styled-components";
import { GetStaticProps } from "next";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Txt } from "../components/Txt";
import { Column } from "../components/Column";
import { Centered } from "../components/Centered";
import Head from "next/head";

const TermsContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

const TermsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  padding: 50px;
`;

type PrivacyPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function PrivacyPage({
  navigationBarSideDrawerData
}: PrivacyPageProps) {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData}>
        <TermsContainer>
          <Centered>
            <TermsText>
              <Column>
                <Txt big bold underline padding={"10px"}>
                  Privacy Policy
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Distinctio necessitatibus, iusto iste voluptates qui
                  dignissimos vel nesciunt ab officia voluptate incidunt
                  praesentium hic laudantium accusamus amet tempore iure.
                  Maxime, enim.
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita quisquam nemo ad laborum culpa quia eum repellendus
                  deserunt nesciunt aliquam architecto temporibus, odit minima
                  sapiente asperiores similique veritatis! Id, animi.
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae, quisquam id quia libero dolorem nesciunt quibusdam
                  consectetur, non debitis cum quos ullam facere. In doloribus
                  sit dignissimos nemo dolorem illum?
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dicta impedit veniam repudiandae rerum natus omnis esse
                  quibusdam dolore consequatur repellat. Libero ad dolore
                  pariatur temporibus blanditiis quasi labore aut et.
                </Txt>
              </Column>
            </TermsText>
          </Centered>
        </TermsContainer>
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
