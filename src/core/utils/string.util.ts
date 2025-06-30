import sanitizeHtml from 'sanitize-html';

/**
 * StringUtil
 *
 * @export
 * @class StringUtil
 */
export class StringUtil {
  /**
   * 正規表現における特殊文字をエスケープする
   *
   * @static
   * @param {string} target エスケープ対象文字列
   * @returns {string} エスケープ結果
   * @memberof StringUtil
   */
  public static escapeRegexpString(target: string): string {
    const regexp = new RegExp(/[\\^$.*+?()[\]{}|]/g);
    return target.replace(regexp, '\\$&');
  }

  /**
   * 対象が空かどうかを確認する
   *
   * @static
   * @param {*} target
   * @return {*}  {boolean}
   * @memberof StringUtil
   */
  public static isEmpty(target: unknown): boolean {
    return (
      target === null ||
      target === undefined ||
      target === '' ||
      Object.keys(target).length <= 0
    );
  }
  /**
   * v-htmlに渡す値などにXSS対策を行う
   *
   * @static
   * @param {string} value
   * @return {*}  {string}
   * @memberof StringUtil
   */
  public static sanitizeHtml(value: string): string {
    return sanitizeHtml(value);
  }
}
