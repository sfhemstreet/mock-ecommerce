import styled from "styled-components";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { Category } from "../../queries/types";
import { useRouter } from "next/router";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { useRef, useEffect } from "react";

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
  giveFocus?: boolean;
};

/**
 * Displays the navigtion content inside the Navigation Drop Down.
 *  
 * @param navigationContentItem 
 * @param giveFocus
 */
export const NavigationBarDropDownItem = ({
  navigationContentItem,
  giveFocus
}: NavigationBarDropDownItemProps): JSX.Element => {
  const router = useRouter();
  const startRef = useRef<HTMLAnchorElement>(null);

  const handleMainLink = (item: Category) => {
    router.push("/category/[categorySlug]", `/category/${item.slug}`);
  };

  const handleSubLink = (item: Category) => {
    router.push("/products/[subcategorySlug]", `/products/${item.slug}`);
  };

  useEffect(() => {
    if (giveFocus && startRef && startRef.current) {
      startRef.current.focus();
    }
  }, [])

  return (
    <>
      {navigationContentItem && (
        <Contained height={"150px"} >
          <Padded padding={"20px 10px"}>
            <Row justifyEvenly alignStart>
              {navigationContentItem?.SubCategories?.map((item, index) => (
                <Column key={`NavDataItem${item.Name}`}>
                  <Txt big bold padding={"0px 0px 10px 0px"}>
                    {index === 0 ? (
                      <A
                        ref={startRef}
                        onClick={() => handleMainLink(item)}
                        onKeyPress={accessibleEnterKeyPress(() =>
                          handleMainLink(item)
                        )}
                        tabIndex={0}
                      >
                        {item.Name}
                      </A>
                    ) : (
                      <A
                        onClick={() => handleMainLink(item)}
                        onKeyPress={accessibleEnterKeyPress(() =>
                          handleMainLink(item)
                        )}
                        tabIndex={0}
                      >
                        {item.Name}
                      </A>
                    )}
                  </Txt>
                  {item.SubCategories?.map(subItem => (
                    <Txt
                      padding={"4px 0px"}
                      key={`NavDataSubItem${subItem.Name}`}
                    >
                      <A
                        onClick={() => handleSubLink(subItem)}
                        onKeyPress={accessibleEnterKeyPress(() =>
                          handleSubLink(subItem)
                        )}
                        tabIndex={0}
                      >
                        {subItem.Name}
                      </A>
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
