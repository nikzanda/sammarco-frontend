import { describe, it, expect, vi, afterEach } from 'vitest';
import { toCurrency, toQuantity, dateToYearMonth, getCurrentSocialYear, getMonths, capitalize } from './utils';

describe('toCurrency', () => {
  it('should format a positive amount in EUR with 2 decimal places', () => {
    const result = toCurrency(1234.5);
    expect(result).toContain('€');
    expect(result).toMatch(/1\.?234,50/);
  });

  it('should format zero', () => {
    const result = toCurrency(0);
    expect(result).toContain('0,00');
  });

  it('should format a negative amount', () => {
    const result = toCurrency(-50);
    expect(result).toContain('50,00');
  });

  it('should respect custom fraction digits', () => {
    const result = toCurrency(9.9, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    expect(result).toContain('10');
  });

  it('should support a different currency', () => {
    const result = toCurrency(100, {}, 'USD');
    expect(result).toContain('100');
  });
});

describe('toQuantity', () => {
  it('should format a number with Italian locale and 2 decimal places', () => {
    const result = toQuantity(1234.5);
    expect(result).toMatch(/1\.?234,50/);
  });

  it('should format zero', () => {
    const result = toQuantity(0);
    expect(result).toBe('0,00');
  });

  it('should respect custom fraction digits', () => {
    const result = toQuantity(3.14159, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    expect(result).toBe('3,1416');
  });
});

describe('dateToYearMonth', () => {
  it('should format a Date object as yyyy-MM', () => {
    const date = new Date(2025, 0, 15); // January 15, 2025
    expect(dateToYearMonth(date)).toBe('2025-01');
  });

  it('should format December correctly', () => {
    const date = new Date(2024, 11, 1); // December 1, 2024
    expect(dateToYearMonth(date)).toBe('2024-12');
  });

  it('should format a timestamp', () => {
    const timestamp = new Date(2025, 5, 1).getTime(); // June 1, 2025
    expect(dateToYearMonth(timestamp)).toBe('2025-06');
  });
});

describe('getCurrentSocialYear', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the current year when month >= September (index 8)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 8, 1)); // September 1, 2025
    expect(getCurrentSocialYear()).toBe(2025);
  });

  it('should return the previous year when month < September', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 7, 31)); // August 31, 2025
    expect(getCurrentSocialYear()).toBe(2024);
  });

  it('should return the previous year in January', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 15)); // January 15, 2026
    expect(getCurrentSocialYear()).toBe(2025);
  });

  it('should return the current year in December', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 11, 31)); // December 31, 2025
    expect(getCurrentSocialYear()).toBe(2025);
  });
});

describe('getMonths', () => {
  it('should return 12 months starting from September of socialYear', () => {
    const months = getMonths(2025);
    expect(months).toHaveLength(12);

    // First month: September 2025
    expect(months[0].getFullYear()).toBe(2025);
    expect(months[0].getMonth()).toBe(8); // September

    // Last month: August 2026
    expect(months[11].getFullYear()).toBe(2026);
    expect(months[11].getMonth()).toBe(7); // August
  });

  it('should have correct order: Sep Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug', () => {
    const months = getMonths(2024);
    const expectedMonths = [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7];
    const expectedYears = [2024, 2024, 2024, 2024, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025];

    months.forEach((month, index) => {
      expect(month.getMonth()).toBe(expectedMonths[index]);
      expect(month.getFullYear()).toBe(expectedYears[index]);
    });
  });
});

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should not change an already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should handle a single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should not change the rest of the string', () => {
    expect(capitalize('hELLO WORLD')).toBe('HELLO WORLD');
  });
});
