import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { NavigationBarSideDrawerLayout } from '../layouts/NavigationBarSideDrawerLayout';

storiesOf("NavigationBarSideDrawerLayout", module).add("story", () => {
  return <NavigationBarSideDrawerLayout />
});
