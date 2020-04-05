import { getSiteLogo, SiteLogo } from "./getSiteLogo";
import { getNavigationCategories, Category } from "./getCategories";
import { getSearchBoxData, SearchBoxData } from "./getSearchBoxData";

export type NavigationBarSideDrawerData = {
  siteLogo: SiteLogo;
  navCategories: Category[];
  searchBoxData: SearchBoxData;
}

export async function getNavigationBarSideDrawerData() {
  const siteLogo = await getSiteLogo();
  const navCategories = await getNavigationCategories();
  const searchBoxData = await getSearchBoxData();

  const navSideDrawerData: NavigationBarSideDrawerData = {
    siteLogo,
    navCategories,
    searchBoxData
  }

  return navSideDrawerData;
}