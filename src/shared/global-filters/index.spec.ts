import { describe, expect, test, vi } from 'vitest';
import { filters } from './index';
import { StringUtil } from '@/core/utils/string.util';
import { DateUtil } from '@core/utils/date.util';

describe('Filters', () => {
  test('commaSeparatedNum', () => {
    expect(filters.commaSeparatedNum(1234567)).toBe('1,234,567');
    expect(filters.commaSeparatedNum('1234567')).toBe('1,234,567');
  });

  test('currencyJPY', () => {
    expect(filters.currencyJPY('1234567')).toBe('¥1,234,567');
  });

  test('currencyUSD', () => {
    expect(filters.currencyUSD('1234567')).toBe('$1,234,567');
  });

  test('formatDate', () => {
    const date = new Date(2023, 0, 1);
    const format = 'yyyy-MM-dd';
    const formattedDate = '2023-01-01';
    DateUtil.format = vi.fn().mockReturnValue(formattedDate);

    expect(filters.formatDate(date, format)).toBe(formattedDate);
  });

  test('validationMessage', () => {
    const message = 'This is an @@Field error.';
    const label = 'Email';
    const expectedMessage = 'This is an Email error.';
    StringUtil.isEmpty = vi.fn().mockReturnValue(false);

    expect(filters.validationMessage(message, label)).toBe(expectedMessage);
  });
});
