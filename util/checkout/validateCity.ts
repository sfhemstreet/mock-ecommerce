export function validateCity(city: string) {
  if (city.trim().length === 0) return false;

  // Negated set
  const regex = /[^A-Z a-z]+/g;

  return !regex.test(city);
} 