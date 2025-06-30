import { describe, expect, test } from 'vitest';
import * as yup from 'yup';
import './number-string.validator';

// テストケースのセットアップ
describe('Yup Custom Methods', () => {
  // 年（YYYY）のテスト
  test('year validation', async () => {
    const schema = yup.number().year();
    await expect(schema.isValid(2023)).resolves.toBe(true);
    await expect(schema.isValid(1899)).resolves.toBe(false);
    await expect(schema.isValid(2100)).resolves.toBe(false);
  });

  // 月（MM）のテスト
  test('month validation', async () => {
    const schema = yup.number().month();
    await expect(schema.isValid(1)).resolves.toBe(true);
    await expect(schema.isValid(12)).resolves.toBe(true);
    await expect(schema.isValid(13)).resolves.toBe(false);
  });

  // 日（DD）のテスト
  test('day validation', async () => {
    const schema = yup.number().day();
    await expect(schema.isValid(1)).resolves.toBe(true);
    await expect(schema.isValid(31)).resolves.toBe(true);
    await expect(schema.isValid(32)).resolves.toBe(false);
  });

  // 半角数字の金額のテスト
  test('currency validation', async () => {
    const schema = yup.number().currency();
    await expect(schema.isValid(1000)).resolves.toBe(true);
    await expect(schema.isValid(-1000)).resolves.toBe(false);
    await expect(schema.isValid(1000.5)).resolves.toBe(false);
  });

  // パーセント数字(小数部2桁まで)のテスト
  test('percentage validation', async () => {
    const schema = yup.number().percentage();
    await expect(schema.isValid(50)).resolves.toBe(true);
    await expect(schema.isValid(100)).resolves.toBe(true);
    await expect(schema.isValid(100.01)).resolves.toBe(false);
  });

  // 小数点以上と以下の桁数を指定するテスト
  test('customDigitNumber validation', async () => {
    const schema = yup.number().customDigitNumber(3, 2);
    await expect(schema.isValid(123.45)).resolves.toBe(true);
    await expect(schema.isValid(1234.56)).resolves.toBe(false);
    await expect(schema.isValid(123.456)).resolves.toBe(false);
  });

  // 指定した除数で割り切れるかのテスト
  test('divisible validation', async () => {
    const schema = yup.number().divisible(5);
    await expect(schema.isValid(10)).resolves.toBe(true);
    await expect(schema.isValid(11)).resolves.toBe(false);
  });

  // 全角チェック（全角スペースは含めない）のテスト
  test('fullWidth validation', async () => {
    const schema = yup.string().fullWidth();
    await expect(schema.isValid('テスト')).resolves.toBe(true);
    await expect(schema.isValid('test')).resolves.toBe(false);
  });

  // 全角チェック（全角スペース含む）のテスト
  test('fullWidthAndSpace validation', async () => {
    const schema = yup.string().fullWidthAndSpace();
    await expect(schema.isValid('テスト　')).resolves.toBe(true);
    await expect(schema.isValid('テスト ')).resolves.toBe(false);
    await expect(schema.isValid('test ')).resolves.toBe(false);
    await expect(schema.isValid('test　')).resolves.toBe(false);
  });

  // 全角英数のテスト
  test('fullWidthAlphanumeric validation', async () => {
    const schema = yup.string().fullWidthAlphanumeric();
    await expect(schema.isValid('ＡＢＣ１２３')).resolves.toBe(true);
    await expect(schema.isValid('ABC123')).resolves.toBe(false);
  });

  // 全角カナのテスト
  test('fullWidthKana validation', async () => {
    const schema = yup.string().fullWidthKana();
    await expect(schema.isValid('カナ')).resolves.toBe(true);
    await expect(schema.isValid('かな')).resolves.toBe(false);
  });

  // 全角カナ（全角スペース含む）のテスト
  test('fullWidthKanaAndSpace validation', async () => {
    const schema = yup.string().fullWidthKanaAndSpace();
    await expect(schema.isValid('カナ　')).resolves.toBe(true);
    await expect(schema.isValid('かな ')).resolves.toBe(false);
  });

  // 全角英字のテスト
  test('fullWidthAlphabet validation', async () => {
    const schema = yup.string().fullWidthAlphabet();
    await expect(schema.isValid('ＡＢＣ')).resolves.toBe(true);
    await expect(schema.isValid('ABC')).resolves.toBe(false);
  });

  // 全角数字のテスト
  test('fullWidthNumeral validation', async () => {
    const schema = yup.string().fullWidthNumeral();
    await expect(schema.isValid('１２３')).resolves.toBe(true);
    await expect(schema.isValid('123')).resolves.toBe(false);
  });

  // 半角英数のテスト
  test('halfWidthAlphanumeric validation', async () => {
    const schema = yup.string().halfWidthAlphanumeric();
    await expect(schema.isValid('ABC123')).resolves.toBe(true);
    await expect(schema.isValid('ＡＢＣ１２３')).resolves.toBe(false);
  });

  // 半角英字のテスト
  test('halfWidthAlphabet validation', async () => {
    const schema = yup.string().halfWidthAlphabet();
    await expect(schema.isValid('ABC')).resolves.toBe(true);
    await expect(schema.isValid('ＡＢＣ')).resolves.toBe(false);
  });

  // 半角カナのテスト
  test('halfWidthKana validation', async () => {
    const schema = yup.string().halfWidthKana();
    await expect(schema.isValid('ｶﾅ')).resolves.toBe(true);
    await expect(schema.isValid('カナ')).resolves.toBe(false);
  });

  // 半角英数字と記号だけ（空白文字は入力不可）のテスト
  test('alphanumericAndSymbol validation', async () => {
    const schema = yup.string().alphanumericAndSymbol();
    await expect(schema.isValid('ABC123!@#')).resolves.toBe(true);
    await expect(schema.isValid('ABC 123')).resolves.toBe(false);
  });

  // アルファベットと数字と記号が１文字以上含まれていることのテスト
  test('safetyPassword validation', async () => {
    const schema = yup.string().safetyPassword();
    await expect(schema.isValid('Abc123!')).resolves.toBe(true);
    await expect(schema.isValid('Abc123')).resolves.toBe(false);
  });

  // 電話番号のテスト
  test('telephone validation', async () => {
    const schema = yup.string().telephone();
    await expect(schema.isValid('09012345678')).resolves.toBe(true);
    await expect(schema.isValid('090-1234-5678')).resolves.toBe(true);
    await expect(schema.isValid('090-123-45678')).resolves.toBe(false);
  });

  // 郵便番号のテスト
  test('postalCode validation', async () => {
    const schema = yup.string().postalCode();
    await expect(schema.isValid('123-4567')).resolves.toBe(true);
    await expect(schema.isValid('1234567')).resolves.toBe(true);
    await expect(schema.isValid('1234-567')).resolves.toBe(false);
  });

  // 日付フォーマットのテスト
  test('validatorDateFormat validation', async () => {
    const schema = yup.string().validatorDateFormat('-');
    // eslint-disable-next-line sonarjs/no-duplicate-string
    await expect(schema.isValid('2023-01-01')).resolves.toBe(true);
    await expect(schema.isValid('2023/01/01')).resolves.toBe(false);
  });

  // 過去日付のテスト
  test('pastDate validation', async () => {
    const schema = yup.string().pastDate('2023-01-01');
    await expect(schema.isValid('2022-12-31')).resolves.toBe(true);
    await expect(schema.isValid('2023-01-01')).resolves.toBe(false);
  });

  // 未来日付のテスト
  test('futureDate validation', async () => {
    const schema = yup.string().futureDate('2023-01-01');
    await expect(schema.isValid('2023-01-02')).resolves.toBe(true);
    await expect(schema.isValid('2023-01-01')).resolves.toBe(false);
  });

  // 絵文字を入力チェックのテスト
  test('ignoreEmoji validation', async () => {
    const schema = yup.string().ignoreEmoji();
    await expect(schema.isValid('テスト')).resolves.toBe(true);
    await expect(schema.isValid('テスト😊')).resolves.toBe(false);
  });

  // 絵文字を含む最大文字数をカウントするバリデーション処理のテスト
  test('containsEmojiMax validation', async () => {
    const schema = yup.string().containsEmojiMax(5);
    await expect(schema.isValid('テスト😊')).resolves.toBe(true);
    await expect(schema.isValid('テスト😊😊😊😊😊')).resolves.toBe(false);
  });

  // 絵文字を含む最小文字数をカウントするバリデーション処理のテスト
  test('containsEmojiMin validation', async () => {
    const schema = yup.string().containsEmojiMin(5);
    await expect(schema.isValid('テスト😊')).resolves.toBe(false);
    await expect(schema.isValid('テスト😊😊😊😊😊')).resolves.toBe(true);
  });
});
