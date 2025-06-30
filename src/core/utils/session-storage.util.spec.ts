import { describe, it, beforeEach, expect } from 'vitest';
import { SessionStorageUtil } from './session-storage.util';

describe('Session Storage Service', () => {
  const key = 'test';

  beforeEach(() => {
    sessionStorage.removeItem(key);
  });

  it('get', () => {
    const obj = {
      test: 'test'
    };
    sessionStorage.setItem(key, JSON.stringify(obj));
    expect(SessionStorageUtil.get(key)).toEqual(obj);
  });

  it('getItems', () => {
    const obj = {
      test1: 'test',
      test2: 'test',
      test3: 'test'
    };
    sessionStorage.setItem('test1', 'test');
    sessionStorage.setItem('test2', 'test');
    sessionStorage.setItem('test3', 'test');
    expect(SessionStorageUtil.getItems(/test./)).toEqual(obj);
    sessionStorage.clear();
  });

  it('set', () => {
    const obj = {
      test: 'test'
    };
    SessionStorageUtil.set({ key, value: obj });
    SessionStorageUtil.get(key);
    expect(SessionStorageUtil.get(key)).toEqual(obj);
    sessionStorage.clear();
  });

  it('has', () => {
    sessionStorage.setItem(key, 'test');
    expect(SessionStorageUtil.has(key)).toEqual(true);
    sessionStorage.clear();
  });

  it('has - RegExp', () => {
    sessionStorage.setItem('test1', 'test');
    expect(SessionStorageUtil.has(/test./)).toEqual(true);
    sessionStorage.clear();
  });

  it('remove', () => {
    const obj = {
      test: 'test'
    };
    SessionStorageUtil.set({ key, value: JSON.stringify(obj) });
    SessionStorageUtil.remove(key);
    expect(SessionStorageUtil.get(key)).toBeUndefined();
    sessionStorage.clear();
  });

  it('removeItems', () => {
    sessionStorage.setItem('test1', 'test');
    sessionStorage.setItem('test2', 'test');
    sessionStorage.setItem('test3', 'test');
    SessionStorageUtil.removeItems(/test./);
    expect(SessionStorageUtil.getItems(/test./)).toBeUndefined();
    sessionStorage.clear();
  });
});
