export const isTaxCodeValid = (taxCode: string) => {
  const result =
    taxCode.length === 16 &&
    /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(taxCode);
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
