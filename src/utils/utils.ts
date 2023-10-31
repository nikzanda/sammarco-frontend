import { format } from 'date-fns';

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
