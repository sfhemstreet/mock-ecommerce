export function formatCamelCaseToRegularString(camel: string): string {
  const words = new Array<string>();

  for(let i = 0; i < camel.length; i++) {
    const letter = camel[i];

    if (letter === letter.toUpperCase()) {
      words.push(letter);
    } else if (i === 0) {
      words.push(letter.toUpperCase());
    } else {
      words[words.length - 1] = words[words.length - 1] + letter;
    }
  }

  return words.join(" ");
}