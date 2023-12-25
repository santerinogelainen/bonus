export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomItem = <T>(array: Array<T>): T => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
} 