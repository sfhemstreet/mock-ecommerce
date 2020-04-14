import { getSiteLogo, SiteLogo } from "./getSiteLogo";
import { getNavigationCategories, Category } from "./getCategories";


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