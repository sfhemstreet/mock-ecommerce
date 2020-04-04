import { Row } from "./Row";
import { Txt } from "./Txt";
import { Contained } from "./Contained";

type CategoryLinkBoxProps = {
  mainCategory: {
    id: number;
    Name: string;
  };
  subCategory: {
    id: number;
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
        <Txt small>{mainCategory.Name}</Txt>&nbsp;<small>></small>&nbsp;
        <Txt small>{subCategory.Name}</Txt>
      </Row>
    </Contained>
  );
};
