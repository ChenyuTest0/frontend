/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test } from 'vitest';
import { DateUtil } from '../utils/date.util';
import { isIso8601, convertBodyToDate } from './iso8601.util';

describe('isIso8601', () => {
  test('should return true for valid ISO8601 strings', () => {
    const validDates = [
      '2023-10-01T12:00:00Z',
      '2023-10-01T12:00:00+09:00',
      '2023-10-01T12:00:00.000Z',
      '2023-10-01'
    ];
    validDates.forEach(date => {
      expect(isIso8601(date)).toBe(true);
    });
  });

  test('should return false for invalid ISO8601 strings', () => {
    const invalidDates = [
      '2023-10-01 12:00:00',
      '2023/10/01',
      '01-10-2023',
      null,
      undefined,
      '',
      'random string'
    ];
    invalidDates.forEach(date => {
      expect(isIso8601(date!)).toBe(false);
    });
  });
});

describe('convertBodyToDate', () => {
  test('should convert ISO8601 strings to Date objects', () => {
    const body = {
      date1: '2023-10-01T12:00:00Z',
      date2: '2023-10-01T12:00:00+09:00',
      nested: {
        date3: '2023-10-01T12:00:00.000Z'
      }
    };

    const expectedBody = {
      date1: DateUtil.createLocalDate('2023-10-01T12:00:00Z'),
      date2: DateUtil.createLocalDate('2023-10-01T12:00:00+09:00'),
      nested: {
        date3: DateUtil.createLocalDate('2023-10-01T12:00:00.000Z')
      }
    };

    convertBodyToDate(body);
    expect(body).toEqual(expectedBody);
  });

  test('should not modify non-ISO8601 strings', () => {
    const body = {
      date1: '2023-10-01 12:00:00',
      date2: 'random string',
      nested: {
        date3: '01-10-2023'
      }
    };

    const expectedBody = { ...body };

    convertBodyToDate(body);
    expect(body).toEqual(expectedBody);
  });

  test('should handle null and undefined bodies', () => {
    expect(convertBodyToDate(null)).toBe(null);
    expect(convertBodyToDate(undefined)).toBe(undefined);
  });

  test('should handle non-object bodies', () => {
    expect(convertBodyToDate('string')).toBe('string');
    expect(convertBodyToDate(123)).toBe(123);
    expect(convertBodyToDate(true)).toBe(true);
  });
});
