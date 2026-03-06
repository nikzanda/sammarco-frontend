import { municipalities } from '../constants';

const ODD_MAP: Record<string, number> = {
  0: 1,
  1: 0,
  2: 5,
  3: 7,
  4: 9,
  5: 13,
  6: 15,
  7: 17,
  8: 19,
  9: 21,
  A: 1,
  B: 0,
  C: 5,
  D: 7,
  E: 9,
  F: 13,
  G: 15,
  H: 17,
  I: 19,
  J: 21,
  K: 2,
  L: 4,
  M: 18,
  N: 20,
  O: 11,
  P: 3,
  Q: 6,
  R: 8,
  S: 12,
  T: 14,
  U: 16,
  V: 10,
  W: 22,
  X: 25,
  Y: 24,
  Z: 23,
};

const EVEN_MAP: Record<string, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

const TAX_CODE_REGEX = /^[A-Z]{6}\d{2}[A-EHLMPR-T]\d{2}[A-Z]\d{3}[A-Z]$/;

export const isTaxCodeValid = (taxCode: string) => {
  const code = taxCode.trim().toUpperCase();
  if (!TAX_CODE_REGEX.test(code)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const char = code[i];
    sum += i % 2 === 0 ? ODD_MAP[char] : EVEN_MAP[char];
  }

  const expectedCheck = String.fromCharCode((sum % 26) + 65);
  const result = code[15] === expectedCheck;
  return result;
};

export const calculateBirthday = (taxCode: string) => {
  if (taxCode.length !== 16) {
    throw new Error('invalid tax code');
  }

  const year = parseInt(taxCode.substring(6, 8), 10);
  const month = 'ABCDEHLMPRST'.indexOf(taxCode.charAt(8));
  const day = parseInt(taxCode.substring(9, 11), 10) % 40; // Rimuove il bit di genere

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    throw new Error('invalid tax code');
  }

  // Aggiunge 1900 o 2000 all'anno a seconda se è maggiore o minore di 22
  // Questo perché il codice fiscale non specifica il secolo
  const fullYear = year + (year < 22 ? 2000 : 1900);

  return new Date(fullYear, month, day);
};

export const isMinor = (taxCode: string) => {
  const birthday = calculateBirthday(taxCode);
  const today = new Date();

  birthday.setFullYear(birthday.getFullYear() + 18);

  const result = today < birthday;
  return result;
};

export const getSex = (taxCode: string): 'male' | 'female' => {
  const sexChar = parseInt(taxCode.charAt(9), 10);
  const result = sexChar >= 4 ? 'female' : 'male';
  return result;
};

export const getBirthPlace = (taxCode: string): string => {
  if (!isTaxCodeValid(taxCode)) {
    return '';
  }

  const municipality = taxCode.slice(11, 15);
  const result = municipalities[municipality];
  return result || '';
};
