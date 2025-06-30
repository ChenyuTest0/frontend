/* eslint-disable @typescript-eslint/no-explicit-any */
import { i18n } from './i18n.util';

/**
 * 多言語化処理を利用し、code.{locale}.yamlからラベルを取得する
 *
 * @export
 * @class CodeLabelUtil
 */
export class CodeLabelUtil {
  private static labelI18n = i18n;
  public static injectI18n(newI18n: any) {
    CodeLabelUtil.labelI18n = newI18n;
  }

  /**
   * 単一のコードを取得する。
   * コードが無ければundefinedを返却する。
   *
   * @static
   * @param {string} codename 取得対象のコード名称 ex) "AccountType"
   * @param {string} code 取得対象のコード ex) "100"
   * @return {*}  {(string | undefined)}
   * @memberof CodeLabelUtil
   */
  public static get(codename: string, code: string): string | undefined {
    const target = CodeLabelUtil.getTargetElement(codename);
    if (!target) {
      return undefined;
    }
    const localeMessage = target[code];
    return CodeLabelUtil.getLabelElement(localeMessage);
  }

  /**
   * コード一覧のRecordを返却する。
   * コードが無ければundefinedを返却する。
   *
   * @static
   * @param {string} codename 取得対象のコード名称 ex) "AccountType"
   * @return {*}  {(Record<string, string> | undefined)}
   * @memberof CodeLabelUtil
   */
  public static getAll(codename: string): Record<string, string> | undefined {
    const target = CodeLabelUtil.getTargetElement(codename);
    if (!target) {
      return undefined;
    }
    const result: Record<string, string> = {};
    for (const key in target) {
      const localeMessage = target[key];
      result[key] = CodeLabelUtil.getLabelElement(localeMessage);
    }
    return result;
  }

  /**
   * vue-i18nの親エレメントを取得する
   *
   * @private
   * @static
   * @param {string} codename
   * @return {*}  {string}
   * @memberof CodeLabelUtil
   */
  private static getTargetElement(codename: string): any {
    const target = CodeLabelUtil.labelI18n?.global?.getLocaleMessage(
      CodeLabelUtil.labelI18n.global.locale.value
    )[codename];
    if (!target || target?.source) {
      return undefined;
    }
    return target;
  }

  /**
   * vue-i18nの子エレメントの内容をParseし、文字列を返却する
   *
   * @private
   * @static
   * @param {*} target
   * @return {*}  {(string | undefined)}
   * @memberof CodeLabelUtil
   */
  private static getLabelElement(localeMessage: any): string {
    let result;
    console.log(localeMessage);
    if (localeMessage?.source) {
      result = localeMessage.source as string;
    } else if (localeMessage?.loc?.source) {
      result = localeMessage?.loc?.source as string;
    } else if (
      localeMessage &&
      {}.toString.call(localeMessage) === '[object Function]'
    ) {
      result = localeMessage({ normalize: (v: string[]) => v[0] });
    } else if (
      typeof localeMessage === 'string' ||
      localeMessage instanceof String
    ) {
      result = localeMessage;
    } else if (localeMessage?.b?.s) {
      result = localeMessage?.b?.s as string;
    }
    return result;
  }
}
