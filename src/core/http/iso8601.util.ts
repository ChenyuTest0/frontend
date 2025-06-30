/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateUtil } from '../utils/date.util';

// ISO8601判別用の正規表現
export const iso8601regex =
  /(^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$)|(^\d{4}-\d\d-\d\dT\d\d:\d\d?(([+-]\d\d:\d\d)|Z)?$)|(^\d{4}-\d\d-\d\d?$)/;

/**
 * Iso8601形式かを判別する
 *
 * @param {string} value
 * @return {*}  {boolean} trueならIso8601
 */
export const isIso8601 = (value: string): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return iso8601regex.test(value);
};

/**
 * AxiosのResponseBodyより、Iso8601形式の日付が返却された場合Date型へ変換する
 *
 * @param {*} body AxiosのBody
 * @return {*}  {void}
 */
export const convertBodyToDate = (body: any): void => {
  if (body === null || body === undefined) {
    return body;
  }

  if (typeof body !== 'object') {
    return body;
  }

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIso8601(value)) {
      body[key] = DateUtil.createLocalDate(value);
    } else if (typeof value === 'object') {
      convertBodyToDate(value);
    }
  }
};
