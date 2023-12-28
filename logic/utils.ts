export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomItem = <T>(array: Array<T>): T => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
} 

export const getRange = (min: number, max: number) => {
  const list = [];
  for (let i = min; i <= max; i++) {
      list.push(i);
  }
  return list;
}

export const getSum = <T>(array: Array<T>, property: keyof T) => {
  return array.reduce<number>((total, item) => total + (item[property] as number | undefined ?? 0), 0);
}