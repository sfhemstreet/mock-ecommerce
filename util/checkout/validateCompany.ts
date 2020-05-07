export function validateCompany(company: string) {
  if (company.trim() === "") return true;

  // Negated set
  const regex = /[^A-Z a-z_0-9]+/g;

  return !regex.test(company);
}