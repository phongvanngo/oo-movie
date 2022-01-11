export const numberToDate = (number: number): String => {
  const numdate = number;
  const date = new Date(numdate);
  return date.toLocaleString('en-GB');
};
