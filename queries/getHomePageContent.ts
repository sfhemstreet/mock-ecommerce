import { fetchQuery } from "../util/fetchQuery";

export type HomePageContent = {
  title: string;
  subtitle: string;
  content: string;
  desktopCover: {
    url: string;
  }
  laptopCover: {
    url: string;
  }
  tabletCover: {
    url: string;
  }
  mobileCover: {
    url: string;
  }
}

const GET_HOMEPAGE_CONTENT = `
  {
    homepage(id: 1){
      title
      subtitle
      content
      desktopCover {
        url
      }
      laptopCover {
        url
      }
      tabletCover {
        url
      }
      mobileCover {
        url
      }
    }
  }
`;

export async function getHomePageContent() {
  const res = await fetchQuery(GET_HOMEPAGE_CONTENT);
  const { data: { homepage } } = await res.json();

  //console.log(homepage);

  if (!homepage){
    throw new Error("fetch Homepage content error");
  }

  const homePageContent: HomePageContent = homepage;

  return homePageContent;
}