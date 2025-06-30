/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAfter, isBefore, isEqual } from 'date-fns';
import * as yup from 'yup';
import { DateUtil } from '@core/utils/date.util';
import { $t } from '@shared/utils/i18n.util';

const YEAR_REGEXP_STRING = '(19[0-9]{2}|20[0-9]{2})';
const MONTH_REGEXP_STRING = '(0?[1-9]|1[0-2])';
const DAY_REGEXP_STRING = '(0?[1-9]|[12][0-9]|3[01])';

// 年（YYYY）
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'year',
  function (errorMsg?: string) {
    return this.test('year', function (value) {
      const { path, createError } = this;
      const regexString = '^' + YEAR_REGEXP_STRING + '$';
      return (
        (value !== undefined && RegExp(regexString).test(value.toString())) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Year')
        })
      );
    });
  }
);

// 月（MM）
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'month',
  function (errorMsg?: string) {
    return this.test('month', function (value) {
      const { path, createError } = this;
      const regexString = '^' + MONTH_REGEXP_STRING + '$';
      return (
        (value !== undefined && RegExp(regexString).test(value.toString())) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Month')
        })
      );
    });
  }
);

// 日（DD）
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'day',
  function (errorMsg?: string) {
    return this.test('day', function (value) {
      const { path, createError } = this;
      const regexString = '^' + DAY_REGEXP_STRING + '$';
      return (
        (value !== undefined && RegExp(regexString).test(value.toString())) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Day')
        })
      );
    });
  }
);

// 半角数字の金額
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'currency',
  function (errorMsg?: string) {
    return this.test('currency', function (value) {
      const { path, createError } = this;
      const regexString = /^([1-9][0-9]*|0)?$/;
      return (
        (value !== undefined && RegExp(regexString).test(value.toString())) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Currency')
        })
      );
    });
  }
);

// パーセント数字(小数部2桁まで)
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'percentage',
  function (errorMsg?: string) {
    return this.test('percentage', function (value) {
      const { path, createError } = this;
      const regexString =
        /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
      return (
        (value !== undefined && RegExp(regexString).test(value.toString())) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Percentage')
        })
      );
    });
  }
);

/**
 * 小数点以上と以下の桁数を指定する。
 * ※符号は桁数としてカウントする。（-12は3桁）
 */
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'customDigitNumber',
  function (
    integerLength: number,
    decimalLength: number,
    errorMsgInteger?: string,
    errorMsgDecimal?: string
  ) {
    return this.test('customDigitNumber', function (value) {
      const { path, createError } = this;
      if (!value) {
        return true;
      }
      const valStr = value.toString();
      const regexString = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
      const valid = valStr.split('.');
      if (valStr.length > 0 && !regexString.test(valStr)) {
        return createError({
          path,
          message: $t('ValidMessages.DecimalNumberFormat')
        });
      }
      if (valid && valid[0].length > integerLength) {
        return createError({
          path,
          message: $t(
            errorMsgInteger ? errorMsgInteger : 'ValidMessages.IntegerNumber',
            { length: integerLength }
          )
        });
      }
      if (valid && valid.length > 1 && valid[1].length > decimalLength) {
        return createError({
          path,
          message: $t(
            errorMsgDecimal ? errorMsgDecimal : 'ValidMessages.DecimalNumber',
            { length: integerLength }
          )
        });
      }
      return true;
    });
  }
);

// Check the number can be full divided by specified divisor
yup.addMethod<yup.NumberSchema>(
  yup.number,
  'divisible',
  function (divisor: number, errorMsg?: string) {
    return this.test('divisible', function (value) {
      const { path, createError } = this;
      return (
        (value !== undefined && divisor !== 0 && value % divisor === 0) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Divisible', {
            divisor: divisor
          })
        })
      );
    });
  }
);

// 全角チェック（全角スペースは含めない）
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidth',
  function (errorMsg?: string) {
    return this.test('fullWidth', function (value) {
      const { path, createError } = this;
      const regex = /^[^ -~｡-ﾟ]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.FullWidth')
        })
      );
    });
  }
);

// 全角チェック（全角スペース含む）
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthAndSpace',
  function (errorMsg?: string) {
    return this.test('fullWidthAndSpace', function (value) {
      const { path, createError } = this;
      // eslint-disable-next-line no-irregular-whitespace, no-control-regex
      const regex = /^[^\x01-\x7E\xA1-\xDF]*$/g;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.FullWidthAndSpace')
        })
      );
    });
  }
);

// 全角英数
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthAlphanumeric',
  function (errorMsg?: string) {
    return this.test('fullWidthAlphanumeric', function (value) {
      const { path, createError } = this;
      const regex = /^[０-９ａ-ｚＡ-Ｚ]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(
            errorMsg ? errorMsg : 'ValidMessages.FullWidthAlphanumeric'
          )
        })
      );
    });
  }
);

// 全角カナ
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthKana',
  function (errorMsg?: string) {
    return this.test('fullWidthKana', function (value) {
      const { path, createError } = this;
      const regex = /^[゠-ヿ]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.FullWidthKana')
        })
      );
    });
  }
);

// 全角カナ（全角スペース含む）
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthKanaAndSpace',
  function (errorMsg?: string) {
    return this.test('fullWidthKanaAndSpace', function (value) {
      const { path, createError } = this;
      // eslint-disable-next-line no-irregular-whitespace
      const regex = /^[゠-ヿ　]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(
            errorMsg ? errorMsg : 'ValidMessages.FullWidthKanaAndSpace'
          )
        })
      );
    });
  }
);

// 全角英字
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthAlphabet',
  function (errorMsg?: string) {
    return this.test('fullWidthAlphabet', function (value) {
      const { path, createError } = this;
      const regex = /^[Ａ-Ｚ]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.FullWidthAlphabet')
        })
      );
    });
  }
);

// 全角数字
yup.addMethod<yup.StringSchema>(
  yup.string,
  'fullWidthNumeral',
  function (errorMsg?: string) {
    return this.test('fullWidthNumeral', function (value) {
      const { path, createError } = this;
      const regex = /^[０-９]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.FullWidthNumeral')
        })
      );
    });
  }
);

// 半角英数
yup.addMethod<yup.StringSchema>(
  yup.string,
  'halfWidthAlphanumeric',
  function (errorMsg: string) {
    return this.test('halfWidthAlphanumeric', function (value) {
      const { path, createError } = this;
      const regex = /^[a-zA-Z0-9]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(
            errorMsg ? errorMsg : 'ValidMessages.HalfWidthAlphanumeric'
          )
        })
      );
    });
  }
);

// 半角英字
yup.addMethod<yup.StringSchema>(
  yup.string,
  'halfWidthAlphabet',
  function (errorMsg: string) {
    return this.test('halfWidthAlphabet', function (value) {
      const { path, createError } = this;
      const regex = /^[a-zA-Z]+$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.HalfWidthAlphabet')
        })
      );
    });
  }
);

// 半角カナ
yup.addMethod<yup.StringSchema>(
  yup.string,
  'halfWidthKana',
  function (errorMsg: string) {
    return this.test('halfWidthKana', function (value) {
      const { path, createError } = this;
      const regex = /^[ｦ-ﾟ]+$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.HalfWidthKana')
        })
      );
    });
  }
);

// 半角英数字と記号だけ（空白文字は入力不可）入力できるバリデーション
yup.addMethod<yup.StringSchema>(
  yup.string,
  'alphanumericAndSymbol',
  function (errorMsg: string) {
    return this.test('alphanumericAndSymbol', function (value) {
      const { path, createError } = this;
      const regex = /^[0-9a-zA-Z!-/:-@¥[-`{-~]*$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(
            errorMsg ? errorMsg : 'ValidMessages.AlphanumericAndSymbol'
          )
        })
      );
    });
  }
);

// アルファベットと数字と記号が１文字以上含まれていること
yup.addMethod<yup.StringSchema>(
  yup.string,
  'safetyPassword',
  function (errorMsg: string) {
    return this.test('safetyPassword', function (value) {
      const { path, createError } = this;
      // eslint-disable-next-line no-useless-escape
      const regex = /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]*$/i;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.SafetyPassword')
        })
      );
    });
  }
);

// 電話番号
yup.addMethod<yup.StringSchema>(
  yup.string,
  'telephone',
  function (errorMsg: string) {
    return this.test('telephone', function (value) {
      const { path, createError } = this;
      const regex = /^([0-9]{10,11}|[0-9]{2,4}-[0-9]{2,4}-[0-9]{4})$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.Telephone')
        })
      );
    });
  }
);

// 郵便番号
yup.addMethod<yup.StringSchema>(
  yup.string,
  'postalCode',
  function (errorMsg: string) {
    return this.test('postalCode', function (value) {
      const { path, createError } = this;
      const regex = /^([0-9]{3}-[0-9]{4}|[0-9]{7})$/;
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.PostalCode')
        })
      );
    });
  }
);

// Validate the currentDate format by delimiters
yup.addMethod<yup.StringSchema>(
  yup.string,
  'validatorDateFormat',
  function (separator = '-') {
    return this.test('validatorDateFormat', function (value) {
      const { path, createError } = this;
      const escapedDelimiter = separator.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
      const dateRegexString: string =
        '^' +
        YEAR_REGEXP_STRING +
        escapedDelimiter +
        MONTH_REGEXP_STRING +
        escapedDelimiter +
        DAY_REGEXP_STRING +
        '$';
      const regex = RegExp(dateRegexString);
      return (
        (value !== undefined && regex.test(value)) ||
        createError({
          path,
          message: $t('ValidMessages.ValidatorDateFormat')
        })
      );
    });
  }
);

/**
 * valueの日付文字列がseparatorを使った正しい日付になっているかの確認
 *
 * @param {string} separator
 * @param {string} value
 * @return {*}  {boolean}
 */
const checkDateFormat = (separator: string, value: string): boolean => {
  const escapedDelimiter = separator.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  const dateRegexString: string =
    '^' +
    YEAR_REGEXP_STRING +
    escapedDelimiter +
    MONTH_REGEXP_STRING +
    escapedDelimiter +
    DAY_REGEXP_STRING +
    '$';
  const regex = RegExp(dateRegexString);
  return regex.test(value);
};

/**
 * 2つの日付を比較する
 * pastがtrueの場合、値がbaseDateより前にあるかどうかをチェックする
 * pastがfalseの場合、値がbaseDateより後にあるかどうかをチェックする
 */
yup.addMethod<yup.StringSchema>(
  yup.string,
  'compareDates',
  function (
    past: boolean,
    baseDate = '',
    separator = '-',
    errorMsgPast?: string,
    errorMsgFuture?: string
  ) {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    return this.test('compareDates', function (value) {
      const { path, createError } = this;

      if (value && typeof value !== 'string') {
        value = DateUtil.format(value as any, 'yyyy-MM-dd');
      }
      if (!value) {
        return true;
      }

      if (!checkDateFormat(separator, value)) {
        return createError({
          path,
          message: $t('ValidMessages.ValidatorDateFormat')
        });
      }

      baseDate =
        baseDate.length > 0
          ? baseDate.split(separator).join('-')
          : DateUtil.format(new Date(), 'yyyy-MM-dd');

      const baseDateObject = DateUtil.createLocalDate(baseDate);
      const comparedDateObject = DateUtil.createLocalDate(
        value.split(separator).join('-')
      );

      let messageKey = undefined;

      if (
        past &&
        (isBefore(baseDateObject, comparedDateObject) ||
          isEqual(baseDateObject, comparedDateObject))
      ) {
        messageKey = errorMsgPast ? errorMsgPast : 'ValidMessages.PastDate';
      }

      if (
        !past &&
        (isAfter(baseDateObject, comparedDateObject) ||
          isEqual(baseDateObject, comparedDateObject))
      ) {
        messageKey = errorMsgFuture
          ? errorMsgFuture
          : 'ValidMessages.FutureDate';
      }

      if (messageKey) {
        return createError({
          path,
          message: $t(messageKey, {
            baseDate: baseDate
          })
        });
      }
      return true;
    });
  }
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  'futureDate',
  function (baseDate = '', separator = '-', errorMsg?: string) {
    return this.compareDates(false, baseDate, separator, undefined, errorMsg);
  }
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  'pastDate',
  function (baseDate = '', separator = '-', errorMsg?: string) {
    return this.compareDates(true, baseDate, separator, errorMsg, undefined);
  }
);

// 絵文字を入力チェック
yup.addMethod<yup.StringSchema>(
  yup.string,
  'ignoreEmoji',
  function (errorMsg?: string) {
    return this.test('ignoreEmoji', function (value) {
      const { path, createError } = this;
      const withEmojis = /\p{Extended_Pictographic}/u;
      return (
        (value !== undefined && !withEmojis.test(value)) ||
        createError({
          path,
          message: $t(errorMsg ? errorMsg : 'ValidMessages.IgnoreEmoji')
        })
      );
    });
  }
);

// 絵文字を含む最大文字数をカウントするバリデーション処理
yup.addMethod<yup.StringSchema>(
  yup.string,
  'containsEmojiMax',
  function (maxLength: number, errorMsg?: string) {
    return this.test('containsEmojiMax', function (value) {
      const segmenter = new Intl.Segmenter('ja', {
        granularity: 'grapheme'
      });
      const { path, createError } = this;
      const messageKey = errorMsg ? errorMsg : 'ValidMessages.MaxLength';
      const message = $t(messageKey, { max: maxLength });
      return (
        (value !== undefined &&
          [...segmenter.segment(value)].length < maxLength + 1) ||
        createError({
          path,
          message: message
        })
      );
    });
  }
);

// 絵文字を含む最小文字数をカウントするバリデーション処理
yup.addMethod<yup.StringSchema>(
  yup.string,
  'containsEmojiMin',
  function (minLength: number, errorMsg?: string) {
    return this.test('containsEmojiMin', function (value) {
      const segmenter = new Intl.Segmenter('ja', {
        granularity: 'grapheme'
      });
      const { path, createError } = this;
      const messageKey = errorMsg ? errorMsg : 'ValidMessages.MinLength';
      const message = $t(messageKey, { min: minLength });
      return (
        (value !== undefined &&
          [...segmenter.segment(value)].length > minLength - 1) ||
        createError({
          path,
          message: message
        })
      );
    });
  }
);

declare module 'yup' {
  interface NumberSchema {
    year(errorMsg?: string): NumberSchema;
    month(errorMsg?: string): NumberSchema;
    day(errorMsg?: string): NumberSchema;
    currency(errorMsg?: string): NumberSchema;
    percentage(errorMsg?: string): NumberSchema;
    customDigitNumber(
      integerLength: number,
      decimalLength: number,
      errorMsgInteger?: string,
      errorMsgDecimal?: string
    ): NumberSchema;
    divisible(divisor: number, errorMsg?: string): NumberSchema;
  }

  interface StringSchema {
    fullWidth(errorMsg?: string): StringSchema;
    fullWidthAndSpace(errorMsg?: string): StringSchema;
    fullWidthAlphanumeric(errorMsg?: string): StringSchema;
    fullWidthKana(errorMsg?: string): StringSchema;
    fullWidthKanaAndSpace(errorMsg?: string): StringSchema;
    fullWidthAlphabet(errorMsg?: string): StringSchema;
    fullWidthNumeral(errorMsg?: string): StringSchema;
    halfWidthAlphanumeric(errorMsg?: string): StringSchema;
    halfWidthAlphabet(errorMsg?: string): StringSchema;
    halfWidthKana(errorMsg?: string): StringSchema;
    alphanumericAndSymbol(errorMsg?: string): StringSchema;
    safetyPassword(errorMsg?: string): StringSchema;
    telephone(errorMsg?: string): StringSchema;
    postalCode(errorMsg?: string): StringSchema;
    validatorDateFormat(separator?: string, errorMsg?: string): StringSchema;
    compareDates(
      past: boolean,
      baseDate?: string,
      separator?: string,
      errorMsgPast?: string,
      errorMsgFuture?: string
    ): StringSchema;
    futureDate(
      baseDate?: string,
      separator?: string,
      errorMsg?: string
    ): StringSchema;
    pastDate(
      baseDate?: string,
      separator?: string,
      errorMsg?: string
    ): StringSchema;
    ignoreEmoji(errorMsg?: string): StringSchema;
    containsEmojiMax(maxLength: number, errorMsg?: string): StringSchema;
    containsEmojiMin(minLength: number, errorMsg?: string): StringSchema;
  }
}

export default yup;
