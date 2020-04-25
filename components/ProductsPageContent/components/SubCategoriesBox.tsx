import styled from "styled-components";
import { Category } from "../../../queries/types";
import { OutlinedBox } from "./OutlinedBox";
import Link from "next/link";
import { Txt } from "../../Txt";

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
  subcategories: Category[]
}

export const SubCategoriesBox = ({subcategories}: SubCategoriesBoxProps) => {
  return (
    <>
    <Txt>Categories</Txt>
    <OutlinedBox>
      {subcategories.map(cat => (
        <Link href={`/products/${cat.slug}`} key={`subcategory${cat.id}`}>
          <A>{cat.Name}</A>
        </Link>
      ))}
    </OutlinedBox>
    </>
  );
}