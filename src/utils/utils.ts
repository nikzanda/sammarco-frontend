import { format } from 'date-fns';

const { REACT_APP_SOCIAL_YEAR } = process.env;

export const toCurrency = (
  amount: number,
  { minimumFractionDigits = 2, maximumFractionDigits = 2 }: Intl.NumberFormatOptions = {},
  currency: string = 'EUR'
) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);

export const toQuantity = (
  quantity: number,
  { minimumFractionDigits = 2, maximumFractionDigits = 2 }: Intl.NumberFormatOptions = {}
) => Number(quantity).toLocaleString('it-IT', { minimumFractionDigits, maximumFractionDigits });

export const dateToYearMonth = (date: Date | number) => {
  const result = format(date, 'yyyy-MM');
  return result;
};

export const getYears = (): [number, number] => {
  const year = parseInt(REACT_APP_SOCIAL_YEAR!, 10);
  return [year, year + 1];
};

export const getMonths = (): [Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date] => {
  const result = getYears().reduce((acc: Date[], year, index) => {
    switch (index) {
      case 0:
        acc.push(...[8, 9, 10, 11].map((monthNumber) => new Date(year, monthNumber)));
        break;

      case 1:
        acc.push(...[0, 1, 2, 3, 4, 5, 6, 7].map((monthNumber) => new Date(year, monthNumber)));
        break;
    }

    return acc;
  }, []);
  return result as [Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date];
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
