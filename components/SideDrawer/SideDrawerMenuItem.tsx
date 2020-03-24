import styled from "styled-components";
import { NavigationContentItem } from "../../content/navigation/navigationContentTypes";
import { Padded } from "../Padded";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";

const SideDrawerMenuItemContainer = styled.div<{ hasBottomBorder: boolean, width: string }>`
  width: ${props => props.width};
  height: 60px;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.transparentWhite};
  border-top-width: 1px;

  ${props =>
    props.hasBottomBorder &&
    `border-bottom-style: solid;
    border-bottom-color: ${props.theme.colors.transparentWhite};
    border-bottom-width: 1px;`}

  display: flex;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
  }
`;

type SideDrawerMenuItemProps = {
  navigationContentItem: NavigationContentItem;
  onClick: (item: NavigationContentItem) => void;
  width: string;
  hasBottomBorder?: boolean;
};

/**
 * For use in Column of SideDrawer,
 * displays the `name` field of NavigationContentItem 
 * 
 * @param {NavigationContentItem} navigationContentItem NavigationItem to display. 
 * @param {(item: NavigationContentItem) => void} onClick function to call when item is clicked.
 * @param {boolean} hasBottomBorder Adds border to bottom of container, use for last items.
 */
export const SideDrawerMenuItem = ({
  navigationContentItem,
  width,
  onClick,
  hasBottomBorder = false
}: SideDrawerMenuItemProps): JSX.Element => {
  return (
    <SideDrawerMenuItemContainer
      hasBottomBorder={hasBottomBorder}
      width={width}
      onClick={() => onClick(navigationContentItem)}
      onKeyPress={accessibleEnterKeyPress(() => onClick(navigationContentItem))}
      tabIndex={0}
    >
      <Padded padLeft={"50px"}>{navigationContentItem.name}</Padded>
    </SideDrawerMenuItemContainer>
  );
};
