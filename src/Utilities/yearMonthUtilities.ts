export type YearMonth = {
  year: number;
  month: number;
};

/**
 *
 * @param yearMonth
 */
export const getYearFromNum = (yearMonth: number): number =>
  (yearMonth / 100) | 0;

/**
 * Expects number to be in the format yyyymm
 * @param yearMonth
 */
export const getMonthFromNum = (yearMonth: number): number => yearMonth % 100;

/**
 * Expects number to be in the format yyyymm
 * @param yearMonth
 */
export const getYearMonthFromNum = (yearMonth: number): YearMonth => ({
  year: getYearFromNum(yearMonth),
  month: getMonthFromNum(yearMonth),
});

export const getYearMonthFromDate = (date: Date): YearMonth => ({
  year: date.getFullYear(),
  month: date.getMonth(),
});

export const getNumFromYearMonth = (yearMonth: YearMonth): number =>
  yearMonth.year * 100 + yearMonth.month;

export const getYearMonth = (yearMonth: YearMonth | number): YearMonth =>
  typeof yearMonth === "number" ? getYearMonthFromNum(yearMonth) : yearMonth;

export const getYearMonthNum = (yearMonth: YearMonth | number): number =>
  typeof yearMonth === "number" ? yearMonth : getNumFromYearMonth(yearMonth);

const converter = <T extends unknown>(
  func: (yearMonth: YearMonth) => T
): ((yearMonth: YearMonth | number) => T) => (yearMonth: YearMonth | number) =>
  func(getYearMonth(yearMonth));

export const getNextYearMonth = converter(
  (yearMonth: YearMonth): YearMonth =>
    yearMonth.month === 12
      ? {
          year: yearMonth.year + 1,
          month: 1,
        }
      : {
          year: yearMonth.year,
          month: yearMonth.month + 1,
        }
);

export const isBefore = (
  start: YearMonth | number,
  end: YearMonth | number
): boolean => {
  const numStart = getYearMonthNum(start);
  const numEnd = getYearMonthNum(end);
  return numStart > numEnd;
};

export const getMonthsBetween = (
  a: YearMonth | number,
  b: YearMonth | number
): number => {
  const aYearMonth = getYearMonth(a);
  const bYearMonth = getYearMonth(b);

  return (
    (bYearMonth.year - aYearMonth.year) * 12 +
    bYearMonth.month -
    aYearMonth.month
  );
};

export const getYearsBetween = (
  a: YearMonth | number,
  b: YearMonth | number
): number => getMonthsBetween(a, b) / 12;
