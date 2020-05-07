export function validateZipCode(zipcode: string) {
  zipcode = zipcode.replace(/\D/g, "");

  return zipcode.length >= 5;
}