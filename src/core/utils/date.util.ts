import { format as localFormat } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

/**
 * DateUtil
 *
 * @export
 * @class DateUtil
 */
export class DateUtil {
  /**
   * 標準タイムゾーン設定
   *
   * @private
   * @type {string}
   * @memberof DateUtils
   */
  public static timezone: string;
  public static offset: string;
  private static dateFnsDayToDay: Array<number> = [1, 2, 3, 4, 5, 6, 0];

  /**
   * ISO8601形式に日付を変換する
   *
   * @static
   * @param {Date} date
   * @return {*}  {string}
   * @memberof DateUtil
   */
  public static toISO8601DateString(date: Date): string {
    const addZero = (time: string | number): string => ('0' + time).slice(-2);
    return (
      date.getFullYear() +
      '-' +
      addZero(date.getMonth() + 1) +
      '-' +
      addZero(date.getDate()) +
      'T' +
      addZero(date.getHours()) +
      ':' +
      addZero(date.getMinutes()) +
      ':' +
      addZero(date.getSeconds()) +
      '+' +
      addZero(date.getTimezoneOffset() / -60) +
      ':00'
    );
  }

  /**
   * ローカルのTZでDateを作成する。
   *
   * @static
   * @param {String} value
   * @return {*}  {string}
   * @memberof DateUtil
   */
  public static createLocalDate(value: string): Date {
    let tempValue = value;
    if (DateUtil.timezone && value.length <= 10) {
      tempValue = `${value}T00:00:00${DateUtil.offset}`;
    } else if (!DateUtil.timezone && value.length <= 10) {
      tempValue = value.replace(/-/g, '/');
    }
    return new Date(tempValue);
  }

  /**
   * 指定されたTZの日付を返却する
   *
   * @return {*}  {Date}
   * @memberof DateUtil
   */
  public static createTargetLocalDate(): Date {
    if (!DateUtil.timezone) {
      return new Date();
    }
    const offset = DateUtil.getTimezoneOffset();
    return new Date(Date.now() + offset);
  }

  /**
   * TZのオフセット値を秒で取得する
   *
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getTimezoneOffset(): number {
    if (!DateUtil.timezone) {
      return 0;
    }
    const localOffset = localFormat(new Date(), 'XXX');

    const localOffsetMs = DateUtil.getOffsetMS(
      localOffset === 'Z' ? '00:00' : localOffset
    );
    const targetOffsetMs = DateUtil.getOffsetMS(DateUtil.offset);
    return targetOffsetMs - localOffsetMs;
  }

  /**
   * getOffsetMS
   *
   * @private
   * @static
   * @param {string} offset
   * @return {*}  {number}
   * @memberof DateUtil
   */
  private static getOffsetMS(offset: string): number {
    const localOffset = offset.split(':');
    const localOffsetHour = Number(localOffset[0]);
    const localOffsetMin =
      localOffsetHour > 0 ? +Number(localOffset[1]) : -Number(localOffset[1]);

    return (localOffsetHour * 60 + localOffsetMin) * 60 * 1000;
  }

  /**
   * アプリに設定されたTZでの日生成
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getFullYear(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 'yyyy', {
            timeZone: DateUtil.timezone
          })
        )
      : date.getFullYear();
  }

  /**
   * アプリに設定されたTZでの月生成
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getMonth(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 'MM', {
            timeZone: DateUtil.timezone
          })
        ) - 1
      : date.getMonth();
  }

  /**
   * アプリに設定されたTZでの日生成
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getDate(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 'dd', {
            timeZone: DateUtil.timezone
          })
        )
      : date.getDate();
  }

  /**
   * アプリに設定されたTZでの曜日取得
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getDay(date: Date): number {
    return DateUtil.timezone
      ? DateUtil.dateFnsDayToDay[
          Number(
            format(toZonedTime(date, DateUtil.timezone), 'i', {
              timeZone: DateUtil.timezone
            })
          ) - 1
        ]
      : date.getDay();
  }

  /**
   * アプリに設定されたTZでの分取得
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getMinutes(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 'm', {
            timeZone: DateUtil.timezone
          })
        )
      : date.getMinutes();
  }

  /**
   * アプリに設定されたTZでの秒取得
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getSeconds(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 's', {
            timeZone: DateUtil.timezone
          })
        )
      : date.getSeconds();
  }

  /**
   * アプリに設定されたTZでの時間取得
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static getHours(date: Date): number {
    return DateUtil.timezone
      ? Number(
          format(toZonedTime(date, DateUtil.timezone), 'H', {
            timeZone: DateUtil.timezone
          })
        )
      : date.getHours();
  }

  /**
   * アプリに設定されたTZでのフォーマット
   *
   * @static
   * @return {*}  {number}
   * @memberof DateUtil
   */
  public static format(date: Date, formatString: string): string {
    return DateUtil.timezone
      ? format(toZonedTime(date, DateUtil.timezone), formatString, {
          timeZone: DateUtil.timezone
        })
      : localFormat(date, formatString);
  }

  /**
   * Utilの標準のタイムゾーンを設定する
   *
   * @static
   * @param {string} timeZone
   * @memberof DateUtil
   */
  public static setDefaultTimeZone(timeZone: string): void {
    DateUtil.timezone = timeZone;
    const offset = format(new Date(), 'XXX', { timeZone: timeZone });
    DateUtil.offset = offset === 'Z' ? '00:00' : offset;
  }
}
