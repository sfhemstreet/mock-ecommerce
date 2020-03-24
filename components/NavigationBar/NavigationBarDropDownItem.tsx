import styled from "styled-components";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { NavigationContentItem } from "../../content/navigation/navigationContentTypes";

type NavigationBarDropDownItemProps = {
  navigationContentItem?: NavigationContentItem;
};

export const NavigationBarDropDownItem = ({
  navigationContentItem
}: NavigationBarDropDownItemProps): JSX.Element => {
  return (
    <>
      {navigationContentItem && (
        <Contained height={"150px"}>
          <Txt alignCenter big bold>
            {navigationContentItem.name}
          </Txt>
          <Padded padding={"20px 10px"}>
            <Row justifyEvenly alignStart>
              {navigationContentItem?.items?.map(item => (
                <Column key={`NavDataItem${item.name}`}>
                  <Txt underline padding={"0px 0px 10px 0px"}>
                    {item.name}
                  </Txt>
                  {item.items?.map(subItem => (
                    <Txt
                      padding={"4px 0px"}
                      key={`NavDataSubItem${subItem.name}`}
                    >
                      {subItem.name}
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
