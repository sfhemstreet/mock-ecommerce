import styled from "styled-components";
import { Category } from "../../../queries/types";
import { OutlinedBox } from "./OutlinedBox";
import { Txt } from "../../Txt";
import { useRouter } from "next/router";
import { accessibleEnterKeyPress } from "../../../util/accessibleEnterKeyPress";

const A = styled.a`
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize};
  font-weight: 400;

  padding: 3px 4px;

  cursor: pointer;

  transition: all 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
  }
`;

type SubCategoriesBoxProps = {
  subcategories: Category[];
};

export const SubCategoriesBox = ({ subcategories }: SubCategoriesBoxProps) => {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push("/products/[productSlug]", `/products/${slug}`);
  };

  return (
    <>
      <Txt>Categories</Txt>
      <OutlinedBox>
        {subcategories.map(cat => (
          <A
            onClick={() => handleClick(cat.slug)}
            onKeyPress={accessibleEnterKeyPress(() => handleClick(cat.slug))}
            tabIndex={0}
            key={`subcategory${cat.id}`}
          >
            {cat.Name}
          </A>
        ))}
      </OutlinedBox>
    </>
  );
};
