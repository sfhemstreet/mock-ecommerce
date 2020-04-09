import { fetchQuery } from '../../util/fetchQuery';

export type ContactPageData = {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
}

const GET_CONTACT_DATA = `
  {
    contactpage(id: 1) {
      title
      subtitle
      email
      phone
      address
    }
  }
`;

export async function getContactPageData() {
  const res = await fetchQuery(GET_CONTACT_DATA);
  const { data: { contactpage } } = await res.json();

  if (!contactpage) {
    throw new Error("Error fetching about contact page data");
  }

  //console.log(contactpage);

  const contact: ContactPageData = contactpage;

  return contact;
}