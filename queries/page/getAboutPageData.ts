import { fetchQuery } from '../../util/fetchQuery';

export type AboutPageData = {
  people: {
    id: number;
    job: string;
    name: string;
  }[]
}

const GET_ABOUT_DATA = `
  {
    aboutpage(id: 1) {
      data
    }
  }
`;

export async function getAboutPageData() {
  const res = await fetchQuery(GET_ABOUT_DATA);
  const { data: { aboutpage : { data }}} = await res.json();

  if (!data) {
    throw new Error("Error fetching about page data");
  }

  //console.log(data);

  const peeps: AboutPageData = data;

  return peeps;
}