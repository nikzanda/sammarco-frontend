import { UploadFile } from 'antd';
import { format } from 'date-fns';
import { EmailAttachmentInput } from '../gql/graphql';

export const FIRST_SOCIAL_YEAR = 2023;

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

export const getCurrentSocialYear = (): number => {
  const today = new Date();
  const result = today.getMonth() < 8 ? today.getFullYear() - 1 : today.getFullYear();
  return result;
};

export const getMonths = (
  socialYear: number
): [Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date, Date] => {
  const years: [number, number] = [socialYear, socialYear + 1];
  const result = years.reduce((acc: Date[], year, index) => {
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

export const getURLTab = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const result = params.get('tab');
  return result;
};

export const setURLTab = (tabName: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tabName);
  window.history.replaceState({}, '', url);
};

export const readFileAsDataURL = async (file: File) => {
  const dataUri = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  return dataUri;
};

export const resolveAttachmentsUpload = async (files: UploadFile[]): Promise<EmailAttachmentInput[]> => {
  const filesDataUri = await Promise.all(files.map(({ originFileObj }) => readFileAsDataURL(originFileObj! as File)));

  const result = files.map(
    ({ originFileObj }, index): EmailAttachmentInput => ({
      path: filesDataUri[index] as string,
      filename: originFileObj!.name,
    })
  );

  return result;
};
