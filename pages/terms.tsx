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

type TermsPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function TermsPage({
  navigationBarSideDrawerData
}: TermsPageProps) {
  return (
    <>
      <Head>
        <title>Terms of Use</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="Terms of use."></meta>
      </Head>
      <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData}>
        <TermsContainer>
          <Centered>
            <TermsText>
              <Column>
                <Txt big bold underline padding={"10px"}>
                  Terms of Use
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore hic amet unde quas? Rerum quis molestias ipsa ullam!
                  Mollitia ducimus cum accusantium dignissimos sint quas
                  obcaecati. Dolore optio veniam voluptatibus?
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Natus, maiores eum sequi odio aspernatur consequatur facilis?
                  Odio iste est, eum repellat alias hic! Totam necessitatibus
                  quae expedita impedit modi corrupti.
                </Txt>
                <Txt padding={"10px"}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Veritatis ad quam nihil! Laboriosam doloribus ex, perspiciatis
                  quas, officia iusto nulla eaque alias delectus porro sequi nam
                  error impedit, et recusandae?
                </Txt>
                <Txt padding={"10px"}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque omnis similique, officiis distinctio sunt dignissimos
                  assumenda laboriosam natus inventore illo ab, quisquam facilis
                  officia eius, dolor velit atque accusantium consectetur!
                </Txt>
                <Txt padding={"10px"}>
                  Terms term term terms, term term, terms... term.{" "}
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
