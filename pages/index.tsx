import styled from "styled-components";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Column } from "../components/Column";
import { Padded } from "../components/Padded";

const Text = styled.p`
  max-width: 500px;
  padding: 20px;
`;

const Img = styled.img`
  width: 300px;
  max-width: 600px;
  height: auto;
`;

const Home = (): JSX.Element => (
  <NavigationBarSideDrawerLayout>
    <Padded padding={"20px"}>
      <Column justifyEnd alignCenter reverse>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, et
          impedit commodi libero nobis at, aliquam porro repellat enim
          distinctio velit omnis, id officia est ipsum quas voluptatibus magni
          culpa.
        </Text>
        <Img src="/images/mountainbike_huge.jpg" />
      </Column>
    </Padded>
  </NavigationBarSideDrawerLayout>
);

export default Home;
