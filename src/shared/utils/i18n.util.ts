/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import merge from 'deepmerge';
import { Composer, createI18n } from 'vue-i18n';
import { setLocale } from 'yup';

/*
 * vue-i18nの設定
 * 実案件で多言語が必要無ければ日本語以外の言語設定を消していくこと
 */
import { NotificationCenterUtil } from './notification-center.util';
import codeEn from '@/assets/i18n/code.en.yaml';
import codeJa from '@/assets/i18n/code.ja.yaml';
import labelEn from '@/assets/i18n/label.en.yaml';
import labelJa from '@/assets/i18n/label.ja.yaml';
import messageEn from '@/assets/i18n/message.en.yaml';
import messageJa from '@/assets/i18n/message.ja.yaml';

const ja = merge(merge(codeJa, labelJa) as any, messageJa) as any;
const en = merge(merge(codeEn, labelEn) as any, messageEn) as any;
console.log(ja);
export const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  globalInjection: true,
  messages: {
    ja: ja,
    en: en
  }
});

// 利用可能な言語のType定義
export type SupportLocale = 'ja' | 'en';

/**
 * 言語設定を変更する
 *
 * @param {SupportLocale} locale 変更先の言語
 */
export const changeLocale = (locale: SupportLocale) => {
  // vue-i18nの言語設定をここで切り替える
  i18n.global.locale.value = locale;

  // validatorのラベルもここで切り替える
  setLocale({
    mixed: {
      default: () => $t('ValidMessages.Default'),
      required: () => $t('ValidMessages.Required'),
      oneOf: (valid: any) =>
        $t('ValidMessages.OneOf', { values: valid.values }),
      notOneOf: (valid: any) =>
        $t('ValidMessages.NotOneOf', { values: valid.values }),
      defined: () => $t('ValidMessages.Required')
    },
    string: {
      length: (valid: any) =>
        $t('ValidMessages.EqualLength', { length: valid.length }),
      min: (valid: any) => $t('ValidMessages.MinLength', { min: valid.min }),
      max: (valid: any) => $t('ValidMessages.MaxLength', { max: valid.max }),
      matches: (valid: any) =>
        $t('ValidMessages.Pattern', { regex: valid.regex }),
      email: () => $t('ValidMessages.Email'),
      url: () => $t('ValidMessages.URL'),
      uuid: () => $t('ValidMessages.UUID'),
      trim: () => $t('ValidMessages.Trim'),
      lowercase: () => $t('ValidMessages.LowerCase'),
      uppercase: () => $t('ValidMessages.UpperCase')
    },
    number: {
      min: (valid: any) => $t('ValidMessages.Min', { min: valid.min }),
      max: (valid: any) => $t('ValidMessages.Max', { max: valid.max }),
      moreThan: (valid: any) =>
        $t('ValidMessages.MoreThan', { min: valid.min }),
      lessThan: (valid: any) =>
        $t('ValidMessages.LessThen', { max: valid.max }),
      positive: () => $t('ValidMessages.Positive'),
      negative: () => $t('ValidMessages.Negative'),
      integer: () => $t('ValidMessages.HalfWidthInteger')
    }
  });

  // 言語が変更された事を全体通知する
  NotificationCenterUtil.emit('LocaleChanged');
};

// ラベルを取得するだけのメソッド。
// ただしここから取得されるラベルはあくまでもスナップショットである事に注意。
// 言語が変更された場合でも既に取得している箇所については元のラベルが表示される。
// @ts-ignore
export const $t = i18n.global.t;

// 該当のラベルが存在するかの確認
export const $te = (key: string): boolean => {
  return (i18n.global as Composer).te(key);
};

// 現在のLocaleを取得する
export const getCurrentLocale = (): SupportLocale => {
  return i18n.global.locale.value;
};
