import styled from "styled-components";
import { Row } from "./Row";
import { Txt } from "./Txt";
import { Contained } from "./Contained";

const CategoryLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

type CategoryLinkBoxProps = {
  mainCategory: {
    id: string;
    Name: string;
  };
  subCategory: {
    id: string;
    Name: string;
  };
};

export const CategoryLinkBox = ({
  mainCategory,
  subCategory
}: CategoryLinkBoxProps): JSX.Element => {
  return (
    <Contained width={"370px"} padding={"5px"}>
      <Row>
        <Txt small>
          <CategoryLink>{mainCategory.Name}</CategoryLink>
        </Txt>
        &nbsp;<small>></small>&nbsp;
        <Txt small>
          <CategoryLink>{subCategory.Name}</CategoryLink>
        </Txt>
      </Row>
    </Contained>
  );
};
