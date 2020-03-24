export type NavigationContentItem = {
  name: string;
  url: string;
  items?: NavigationContentItem[];
};

export type NavigationContent = {
  headers: NavigationContentItem[]
}