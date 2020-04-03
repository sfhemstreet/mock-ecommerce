import { fetchQuery } from "../util/fetchQuery";

const GET_LOGO = `
  {
    logo(id: 1) {
      NormalLogo {
        url
      }
      SmallLogo {
        url
      }
    }
  }
`;

export type SiteLogo = {
  NormalLogo: {
    url: string;
  }
  SmallLogo: {
    url: string;
  }
}

export async function getSiteLogo() {
  const res = await fetchQuery(GET_LOGO);
  const { data: {logo } } = await res.json();
  
  if (!logo) {
    throw new Error("Fetch error getting logo");
  }

  const siteLogo: SiteLogo = logo;

  return siteLogo;
}