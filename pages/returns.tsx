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

const ReturnsContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

const ReturnsText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  padding: 50px;
`;

type ReturnsPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
};

export default function ReturnsPage({
  navigationBarSideDrawerData
}: ReturnsPageProps) {
  return (
    <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData}>
      <ReturnsContainer>
        <Centered>
          <ReturnsText>
            <Column>
              <Txt big bold underline padding={"10px"}>
                Return Policy
              </Txt>
              <Txt padding={"10px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                hic amet unde quas? Rerum quis molestias ipsa ullam! Mollitia
                ducimus cum accusantium dignissimos sint quas obcaecati. Dolore
                optio veniam voluptatibus?
              </Txt>
              <Txt padding={"10px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
                maiores eum sequi odio aspernatur consequatur facilis? Odio iste
                est, eum repellat alias hic! Totam necessitatibus quae expedita
                impedit modi corrupti.
              </Txt>
              <Txt padding={"10px"}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Veritatis ad quam nihil! Laboriosam doloribus ex, perspiciatis
                quas, officia iusto nulla eaque alias delectus porro sequi nam
                error impedit, et recusandae?
              </Txt>
              <Txt padding={"10px"}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                omnis similique, officiis distinctio sunt dignissimos assumenda
                laboriosam natus inventore illo ab, quisquam facilis officia
                eius, dolor velit atque accusantium consectetur!
              </Txt>
              <Txt padding={"10px"}>THERE ARE NO RETURNS.</Txt>
            </Column>
          </ReturnsText>
        </Centered>
      </ReturnsContainer>
    </NavigationBarSideDrawerLayout>
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
