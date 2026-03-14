import { describe, it, expect } from 'vitest';
import { isTaxCodeValid, calculateBirthday, isMinor, getSex, getBirthPlace } from './taxCode';

describe('isTaxCodeValid', () => {
  it('should return true for a valid tax code', () => {
    expect(isTaxCodeValid('RSSMRA85M01H501Q')).toBe(true);
  });

  it('should handle lowercase input', () => {
    expect(isTaxCodeValid('rssmra85m01h501q')).toBe(true);
  });

  it('should handle input with leading/trailing spaces', () => {
    expect(isTaxCodeValid('  RSSMRA85M01H501Q  ')).toBe(true);
  });

  it('should return false for an invalid checksum', () => {
    expect(isTaxCodeValid('RSSMRA85M01H501A')).toBe(false);
  });

  it('should return false for a too-short string', () => {
    expect(isTaxCodeValid('RSSMRA85M01')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isTaxCodeValid('')).toBe(false);
  });

  it('should return false for invalid format (numbers in surname)', () => {
    expect(isTaxCodeValid('123MRA85M01H501Z')).toBe(false);
  });

  it('should return false for invalid month character', () => {
    // Valid month chars: A B C D E H L M P R S T — 'Z' is not valid
    expect(isTaxCodeValid('RSSMRA85Z01H501Z')).toBe(false);
  });

  it('should validate multiple known-good tax codes', () => {
    expect(isTaxCodeValid('BNCLRA92D45F205D')).toBe(true);
    expect(isTaxCodeValid('VRDGPP80A01L219M')).toBe(true);
  });
});

describe('calculateBirthday', () => {
  it('should extract birthday for a male born in 1985', () => {
    // M = agosto (index 7), day = 01
    const birthday = calculateBirthday('RSSMRA85M01H501Q');
    expect(birthday.getFullYear()).toBe(1985);
    expect(birthday.getMonth()).toBe(7);
    expect(birthday.getDate()).toBe(1);
  });

  it('should extract birthday for a female (day > 40)', () => {
    // D = aprile (index 3), day = 45 → 45 % 40 = 5
    const birthday = calculateBirthday('BNCLRA92D45F205D');
    expect(birthday.getFullYear()).toBe(1992);
    expect(birthday.getMonth()).toBe(3);
    expect(birthday.getDate()).toBe(5);
  });

  it('should handle years after 2000 (year < 22)', () => {
    const birthday = calculateBirthday('RSSMRA10A01H501B');
    expect(birthday.getFullYear()).toBe(2010);
  });

  it('should handle years before 2000 (year >= 22)', () => {
    const birthday = calculateBirthday('RSSMRA85M01H501Q');
    expect(birthday.getFullYear()).toBe(1985);
  });

  it('should throw for a tax code shorter than 16 characters', () => {
    expect(() => calculateBirthday('ABC')).toThrow('invalid tax code');
  });
});

describe('isMinor', () => {
  it('should return true for someone born less than 18 years ago', () => {
    // Born in 2015
    expect(isMinor('RSSMRA15A01H501G')).toBe(true);
  });

  it('should return false for someone born more than 18 years ago', () => {
    // Born in 1985
    expect(isMinor('RSSMRA85M01H501Q')).toBe(false);
  });
});

describe('getSex', () => {
  it('should return male when day digit < 4', () => {
    // Day = 01, char at position 9 = '0'
    expect(getSex('RSSMRA85M01H501Q')).toBe('male');
  });

  it('should return female when day digit >= 4', () => {
    // Day = 45, char at position 9 = '4'
    expect(getSex('BNCLRA92D45F205D')).toBe('female');
  });
});

describe('getBirthPlace', () => {
  it('should return empty string for an invalid tax code', () => {
    expect(getBirthPlace('INVALID')).toBe('');
  });

  it('should return municipality name for a known code', () => {
    // H501 = Roma
    const place = getBirthPlace('RSSMRA85M01H501Q');
    expect(place).toBe('Roma');
  });

  it('should return empty string for unknown municipality in an invalid code', () => {
    // Checksum won't match → isTaxCodeValid returns false → ''
    expect(getBirthPlace('RSSMRA85M01Z999X')).toBe('');
  });
});
