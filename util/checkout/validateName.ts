export function validateName(name: string) {
  if (name.trim().length === 0) return false;

  // I mean someones name could have numbers in it... 
  // Negated set 
  const regex = /[^A-Za-z 0-9]+/g;

  return !regex.test(name);
}