import { getSiteLogo } from "./getSiteLogo";
import { getNavigationCategories } from "./getNavigationCategories";
import { Category, SiteLogo } from "../types";


export type NavigationBarSideDrawerData = {
  siteLogo: SiteLogo;
  navCategories: Category[];
}

export async function getNavigationBarSideDrawerData() {
  const siteLogo = await getSiteLogo();
  const navCategories = await getNavigationCategories();

  const navSideDrawerData: NavigationBarSideDrawerData = {
    siteLogo,
    navCategories,
  }

  return navSideDrawerData;
}