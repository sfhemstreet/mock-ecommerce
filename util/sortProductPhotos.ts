type ProductPhoto = {
  name: string;
  url: string;
}

/**
 * Sort a Product photo and thumbnail array by number in file name.
 * Biggest number to sort is double 
 * 
 * @param {ProductPhoto[]} photos 
 */
export function sortProductPhotos(photos: ProductPhoto[]): ProductPhoto[] {
  const photoArr: ProductPhoto[] = JSON.parse(JSON.stringify(photos));
  photoArr.sort((a, b) => {
    const one = findLastNumberInString(a.name);
    const two = findLastNumberInString(b.name);
    return one - two;
  });
  return photoArr;
}

/**
 * Finds last number in string. Only use for finding single and double digit numbers.
 * Returns -1 if no numbers found.
 * 
 * @param str 
 */
export function findLastNumberInString(str: string): number {

  let number = -1;
  const letterArr = str.split('');

  letterArr.forEach((letter, index) => {
    // check if letter is number
    if (letter.match(/[0-9]/)) {
      // look back one letter to see if its a 2 digit number
      if (index - 1 > 0 && letterArr[index - 1].match(/[0-9]/)) {
        number = parseInt(`${letterArr[index - 1]}${letter}`, 10);
      } else {
        number = parseInt(letter, 10);
      }
    }
  });

  return number;
}