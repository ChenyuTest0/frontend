/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test, beforeEach } from 'vitest';
import { DateUtil } from './date.util';

describe('DateUtil', () => {
  beforeEach(() => {
    DateUtil.setDefaultTimeZone('Asia/Tokyo');
  });

  test('toISO8601DateString formats date correctly', () => {
    const date = new Date(Date.UTC(2023, 0, 1, 0, 0, 0));
    const result = DateUtil.toISO8601DateString(date);
    expect(result).toBe('2023-01-01T09:00:00+09:00');
  });

  test('createLocalDate creates date correctly without timezone', () => {
    const dateStr = '2023-01-01';
    const result = DateUtil.createLocalDate(dateStr);
    expect(result.toISOString()).toBe(new Date('2023/01/01').toISOString());
  });

  test('createLocalDate creates date correctly with timezone', () => {
    DateUtil.setDefaultTimeZone('Asia/Tokyo');
    const dateStr = '2023-01-01';
    const result = DateUtil.createLocalDate(dateStr);
    expect(result.toISOString()).toBe(
      new Date('2023-01-01T00:00:00+09:00').toISOString()
    );
  });

  test('createTargetLocalDate returns current date without timezone', () => {
    const result = DateUtil.createTargetLocalDate();
    expect(result).toBeInstanceOf(Date);
  });

  test('createTargetLocalDate returns date with timezone offset', () => {
    DateUtil.setDefaultTimeZone('Asia/Tokyo');
    const result = DateUtil.createTargetLocalDate();
    const offset = DateUtil.getTimezoneOffset();
    expect(result.getTime()).toBeCloseTo(Date.now() + offset, -2);
  });

  test('getFullYear returns correct year', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getFullYear(date);
    expect(result).toBe(2023);
  });

  test('getMonth returns correct month', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getMonth(date);
    expect(result).toBe(0); // January is 0
  });

  test('getDate returns correct date', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getDate(date);
    expect(result).toBe(1);
  });

  test('getDay returns correct day', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getDay(date);
    expect(result).toBe(0); // Sunday is 0
  });

  test('getMinutes returns correct minutes', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getMinutes(date);
    expect(result).toBe(0);
  });

  test('getSeconds returns correct seconds', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getSeconds(date);
    expect(result).toBe(0);
  });

  test('getHours returns correct hours', () => {
    DateUtil.setDefaultTimeZone('Asia/Tokyo');
    const date = new Date('2023-01-01T00:00:00Z');
    const result = DateUtil.getHours(date);
    expect(result).toBe(9);
  });

  test('format returns correctly formatted date', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const formatString = 'yyyy-MM-dd';
    const result = DateUtil.format(date, formatString);
    expect(result).toBe('2023-01-01');
  });

  test('setDefaultTimeZone sets timezone and offset correctly', () => {
    DateUtil.setDefaultTimeZone('Asia/Tokyo');
    expect(DateUtil.timezone).toBe('Asia/Tokyo');
    expect(DateUtil.offset).toBe('+09:00');
  });
});
