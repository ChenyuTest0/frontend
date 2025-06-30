// For Testing
// Import to test target
import { describe, it, expect } from 'vitest';
import { StringUtil } from './string.util';

describe('Storage Service', () => {
  it('Escape Regexp String', () => {
    expect(StringUtil.escapeRegexpString('/a-z./')).toEqual('/a-z\\./');
  });

  it('isEmpty', () => {
    expect(StringUtil.isEmpty('')).toBeTruthy();
    expect(StringUtil.isEmpty(null)).toBeTruthy();
    expect(StringUtil.isEmpty(undefined)).toBeTruthy();
    expect(StringUtil.isEmpty({})).toBeTruthy();
  });
});
