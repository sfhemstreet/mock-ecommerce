import { Contained } from "../Contained";
import { Row } from "../Row";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { Column } from "../Column";
import { Category } from "../../queries/types";


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
          <Txt alignCenter big bold>
            {navigationContentItem.Name}
          </Txt>
          <Padded padding={"20px 10px"}>
            <Row justifyEvenly alignStart>
              {navigationContentItem?.SubCategories?.map(item => (
                <Column key={`NavDataItem${item.Name}`}>
                  <Txt underline padding={"0px 0px 10px 0px"}>
                    {item.Name}
                  </Txt>
                  {item.SubCategories?.map(subItem => (
                    <Txt
                      padding={"4px 0px"}
                      key={`NavDataSubItem${subItem.Name}`}
                    >
                      {subItem.Name}
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
