import styled from "styled-components";
import { useRouter } from 'next/router';
import { Row } from "./Row";
import { Txt } from "./Txt";
import { Contained } from "./Contained";

const CategoryLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  transition: color 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.green};
  }
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
  const router = useRouter();

  return (
    <Contained width={"370px"} padding={"5px"}>
      <Row>
        <Txt small>
          <CategoryLink onClick={() => router.push(`/category/${mainCategory.id}`)}>{mainCategory.Name}</CategoryLink>
        </Txt>
        &nbsp;<small>></small>&nbsp;
        <Txt small>
          <CategoryLink onClick={() => router.push(`/products/${subCategory.id}`)}>{subCategory.Name}</CategoryLink>
        </Txt>
      </Row>
    </Contained>
  );
};
