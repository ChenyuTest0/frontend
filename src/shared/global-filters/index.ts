import { StringUtil } from '@/core/utils/string.util';
import { DateUtil } from '@core/utils/date.util';

const FIELD_PLACEHOLDER = '@@Field';

/**
 * Globalで定義するフィルタを宣言する。
 * 処理が大きいフィルタを作る場合は処理を別のファイルに書き出すか、Componentにしてしまう。
 * ex) Nl2Br Component
 */
export const filters = {
  // 数値カンマ区切り
  commaSeparatedNum(value: string | number) {
    if (!value) {
      return;
    }
    return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  },
  // "¥"prefix + 数値カンマ区切り
  currencyJPY(value: string) {
    if (!value) {
      return;
    }
    return '¥' + this.commaSeparatedNum(value);
  },
  // "$"prefix + 数値カンマ区切り
  currencyUSD(value: string) {
    if (!value) {
      return;
    }
    return '$' + this.commaSeparatedNum(value);
  },
  // DateUtilのformatを直接Htmlテンプレートから利用する
  formatDate(value: Date, format: string) {
    if (!value || !format) {
      return;
    }
    return DateUtil.format(value, format);
  },
  // サーバーサイドから返却されたエラーメッセージの`@@Field`を置換する
  validationMessage(value: string, label: string) {
    if (!value || StringUtil.isEmpty(label)) {
      return value;
    }
    return value.replace(FIELD_PLACEHOLDER, label);
  },
  // v-htmlに渡す値などにXSS対策を行う
  sanitizeHtml(value: string) {
    if (StringUtil.isEmpty(value)) {
      return value;
    }
    return StringUtil.sanitizeHtml(value);
  }
};
