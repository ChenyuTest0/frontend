import { describe, expect, test } from 'vitest';
import { ArrayUtil } from './array.util';

describe('ArrayUtil', () => {
  describe('clear', () => {
    test('should clear the array', () => {
      const array = [1, 2, 3];
      ArrayUtil.clear(array);
      expect(array).toEqual([]);
    });
  });

  describe('push', () => {
    test('should push elements to the array', () => {
      const array = [1, 2, 3];
      const elements = [4, 5];
      ArrayUtil.push(array, elements);
      expect(array).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('replace', () => {
    test('should replace the array with new elements', () => {
      const array = [1, 2, 3];
      const elements = [4, 5];
      ArrayUtil.replace(array, elements);
      expect(array).toEqual([4, 5]);
    });
  });
});
