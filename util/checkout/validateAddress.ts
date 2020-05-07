export function validateAddress(address: string) {
  if (address.trim().length === 0) return false;

  const regex = /[^A-Z a-z0-9]+/g;

  return !regex.test(address);
}