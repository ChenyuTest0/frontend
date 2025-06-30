/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test, beforeEach, vi } from 'vitest';
import { changeLocale, $t, $te, getCurrentLocale, i18n } from './i18n.util';
import { NotificationCenterUtil } from './notification-center.util';

// モックデータの作成
const mockJaMessages = {
  ValidMessages: {
    Default: 'デフォルトメッセージ',
    Required: '必須項目です',
    OneOf: '次の値のいずれかでなければなりません: {values}',
    NotOneOf: '次の値のいずれかであってはなりません: {values}',
    EqualLength: '{length}文字でなければなりません',
    MinLength: '{min}文字以上でなければなりません',
    MaxLength: '{max}文字以下でなければなりません',
    Pattern: 'パターンに一致しません: {regex}',
    Email: '有効なメールアドレスでなければなりません',
    URL: '有効なURLでなければなりません',
    UUID: '有効なUUIDでなければなりません',
    Trim: '前後に空白を含んではいけません',
    LowerCase: '小文字でなければなりません',
    UpperCase: '大文字でなければなりません',
    Min: '{min}以上でなければなりません',
    Max: '{max}以下でなければなりません',
    MoreThan: '{min}より大きくなければなりません',
    LessThen: '{max}より小さくなければなりません',
    Positive: '正の数でなければなりません',
    Negative: '負の数でなければなりません',
    HalfWidthInteger: '半角整数でなければなりません'
  }
};

describe('i18n and locale change tests', () => {
  beforeEach(() => {
    // i18nの設定をリセット
    i18n.global.locale.value = 'ja';
    i18n.global.setLocaleMessage('ja', mockJaMessages);
    i18n.global.setLocaleMessage('en', mockJaMessages);
  });

  test('should change locale and emit event', () => {
    const emitSpy = vi.spyOn(NotificationCenterUtil, 'emit');
    changeLocale('en');
    expect(i18n.global.locale.value).toBe('en');
    expect(emitSpy).toHaveBeenCalledWith('LocaleChanged');
  });

  test('should get current locale', () => {
    expect(getCurrentLocale()).toBe('ja');
    changeLocale('en');
    expect(getCurrentLocale()).toBe('en');
  });

  test('should translate messages correctly', () => {
    expect($t('ValidMessages.Required')).toBe('必須項目です');
    changeLocale('en');
    expect($t('ValidMessages.Required')).toBe('必須項目です'); // モックデータが同じなので結果も同じ
  });

  test('should check if translation key exists', () => {
    expect($te('ValidMessages.Required')).toBe(true);
    expect($te('NonExistentKey')).toBe(false);
  });
});
