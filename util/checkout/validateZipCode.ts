export function validateZipCode(zipcode: string) {
  if (zipcode.length < 5) return false;

  const regex = /[^0-9\- ]+/g;

  return !regex.test(zipcode);
}