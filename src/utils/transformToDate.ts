export const transformToDate = (date: string) => {
  const time = new Date(parseInt(date));
  return time.toLocaleDateString();
};
