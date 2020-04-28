import styled from "styled-components";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { Category } from "../../queries/types";
import Link from "next/link";

const A = styled.a`
  text-decoration: none;
  cursor: pointer;

  transition: color 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.green};
  }
`;

type NavigationBarDropDownItemProps = {
  navigationContentItem?: Category;
};

export const NavigationBarDropDownItem = ({
  navigationContentItem
}: NavigationBarDropDownItemProps): JSX.Element => {
  return (
    <>
      {navigationContentItem && (
        <Contained height={"150px"}>
          <Padded padding={"20px 10px"}>
            <Row justifyEvenly alignStart>
              {navigationContentItem?.SubCategories?.map(item => (
                <Column key={`NavDataItem${item.Name}`}>
                  <Txt big bold padding={"0px 0px 10px 0px"}>
                    <Link href={`/category/${item.slug}`}>
                      <A>{item.Name}</A>
                    </Link>
                  </Txt>
                  {item.SubCategories?.map(subItem => (
                    <Txt
                      padding={"4px 0px"}
                      key={`NavDataSubItem${subItem.Name}`}
                    >
                      <Link href={`/products/${subItem.slug}`}>
                        <A>{subItem.Name}</A>
                      </Link>
                    </Txt>
                  ))}
                </Column>
              ))}
            </Row>
          </Padded>
        </Contained>
      )}
    </>
  );
};
