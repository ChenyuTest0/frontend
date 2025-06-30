import { describe, it, beforeEach, expect } from 'vitest';
import { LocalStorageUtil } from './local-storage.util';

describe('Local Storage Service', () => {
  const key = 'test';

  beforeEach(() => {
    localStorage.removeItem(key);
  });

  it('get', () => {
    const obj = {
      test: 'test'
    };
    localStorage.setItem(key, JSON.stringify(obj));
    expect(LocalStorageUtil.get(key)).toEqual(obj);
  });

  it('getItems', () => {
    const obj = {
      test1: 'test',
      test2: 'test',
      test3: 'test'
    };
    localStorage.setItem('test1', 'test');
    localStorage.setItem('test2', 'test');
    localStorage.setItem('test3', 'test');
    expect(LocalStorageUtil.getItems(/test./)).toEqual(obj);
    localStorage.clear();
  });

  it('set', () => {
    const obj = {
      test: 'test'
    };
    LocalStorageUtil.set({ key, value: obj });
    LocalStorageUtil.get(key);
    expect(LocalStorageUtil.get(key)).toEqual(obj);
    localStorage.clear();
  });

  it('has', () => {
    localStorage.setItem(key, 'test');
    expect(LocalStorageUtil.has(key)).toEqual(true);
    localStorage.clear();
  });

  it('has - RegExp', () => {
    localStorage.setItem('test1', 'test');
    expect(LocalStorageUtil.has(/test./)).toEqual(true);
    localStorage.clear();
  });

  it('remove', () => {
    const obj = {
      test: 'test'
    };
    LocalStorageUtil.set({ key, value: JSON.stringify(obj) });
    LocalStorageUtil.remove(key);
    expect(LocalStorageUtil.get(key)).toBeUndefined();
    localStorage.clear();
  });

  it('removeItems', () => {
    localStorage.setItem('test1', 'test');
    localStorage.setItem('test2', 'test');
    localStorage.setItem('test3', 'test');
    LocalStorageUtil.removeItems(/test./);
    expect(LocalStorageUtil.getItems(/test./)).toBeUndefined();
    localStorage.clear();
  });
});
