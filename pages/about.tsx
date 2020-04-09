import styled from "styled-components";
import { GetStaticProps } from "next";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayout/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Txt } from "../components/Txt";
import { Column } from "../components/Column";
import { Centered } from "../components/Centered";
import { getAboutPageData, AboutPageData } from "../queries/page/getAboutPageData";
import { Padded } from "../components/Padded";
import { FlexBox } from "../components/FlexBox";

const AboutContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

const AboutImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

type AboutUsPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  aboutPageData: AboutPageData;
};

export default function AboutUsPage({
  navigationBarSideDrawerData,
  aboutPageData
}: AboutUsPageProps) {
  return (
    <NavigationBarSideDrawerLayout data={navigationBarSideDrawerData} filterChildrenWhenSideDrawerOpen>
      <AboutContainer>
        <Txt big bold underline alignCenter padding={"30px"}>
          About Us
        </Txt>
        <Centered padding={"50px"}>
          <FlexBox alignCenter justifyCenter>
            {aboutPageData.people.map(person => (
              <Padded key={`aboutperson${person.id}`} padding={"25px"}>
                <Column alignCenter justifyCenter>
                  <Txt big bold>{person.job}</Txt>
                  <AboutImg
                    src={`https://robohash.org/${person.id}?size=200x200`}
                    alt={`${person.job}: ${person.name}`}
                  />
                  <Txt bold padding={"3px"}>{person.name}</Txt>
                </Column>
              </Padded>
            ))}
          </FlexBox>
        </Centered>
      </AboutContainer>
    </NavigationBarSideDrawerLayout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const aboutPageData = await getAboutPageData();

  return {
    props: {
      navigationBarSideDrawerData,
      aboutPageData
    }
  };
};
