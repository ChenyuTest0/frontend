/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test, beforeEach } from 'vitest';

import { createI18n } from 'vue-i18n';
import { CodeLabelUtil } from './code-label.util';

describe('CodeLabelUtil', () => {
  beforeEach(() => {
    CodeLabelUtil.injectI18n(
      createI18n({
        legacy: false,
        locale: 'en',
        globalInjection: true,
        messages: {
          en: {
            AccountType: {
              '100': 'Savings Account',
              '200': 'Checking Account'
            }
          }
        }
      })
    );
  });

  test('get should return the correct label for a given code', () => {
    const result = CodeLabelUtil.get('AccountType', '100');
    expect(result).toBe('Savings Account');
  });

  test('get should return undefined if the code does not exist', () => {
    const result = CodeLabelUtil.get('AccountType', '999');
    expect(result).toBeUndefined();
  });

  test('getAll should return all labels for a given codename', () => {
    const result = CodeLabelUtil.getAll('AccountType');
    expect(result).toEqual({
      '100': 'Savings Account',
      '200': 'Checking Account'
    });
  });

  test('getTargetElement should return the correct target element', () => {
    const result = CodeLabelUtil['getTargetElement']('AccountType');
    expect(result).toEqual({
      '100': 'Savings Account',
      '200': 'Checking Account'
    });
  });

  test('getLabelElement should return the correct label from a locale message', () => {
    const result = CodeLabelUtil['getLabelElement']('Savings Account');
    expect(result).toBe('Savings Account');
  });
});
