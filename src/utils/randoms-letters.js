export const randomsLetters = (number) => {
  const characters =
    "ABCHIJKLMNSTUVWXYZabcdehijklpqrstxyz01346789";
  let result = "";
  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
