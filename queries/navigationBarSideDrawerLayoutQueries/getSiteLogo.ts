import { fetchQuery } from "../../util/fetchQuery";
import { SiteLogo } from "../types";

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

export async function getSiteLogo() {
  const res = await fetchQuery(GET_LOGO);
  const { data: {logo } } = await res.json();
  
  if (!logo) {
    throw new Error("Fetch error getting logo");
  }

  const siteLogo: SiteLogo = logo;

  return siteLogo;
}