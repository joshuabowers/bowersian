export const fromDate = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1
});

export const toDate = (year: number, month: number) =>
  new Date(year, month - 1);
