import { addSeconds, getUnixTime } from 'date-fns';
import { setActivePinia, createPinia, defineStore } from 'pinia';
import { describe, expect, test, beforeEach, vi } from 'vitest';
import { PiniaHelperUtil } from './pinia-helper.util';

describe('PiniaHelperUtil', () => {
  let piniaHelperUtil: PiniaHelperUtil;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = defineStore('test', {
      state: () => ({
        data: 'initial'
      }),
      actions: {
        $reset() {
          this.data = 'initial';
        }
      }
    })();
    piniaHelperUtil = new PiniaHelperUtil();
    piniaHelperUtil.setLimitedTargetStore(store);
    localStorage.clear();
    vi.useFakeTimers();
  });

  test('limitedLocalStorage setItem and getItem', () => {
    const key = 'testKey';
    const value = 'testValue';
    const amount = 60; // 1 minute

    const limitedStorage = piniaHelperUtil.limitedLocalStorage(amount);

    // Set item in localStorage
    limitedStorage.setItem(key, value);

    // Check if the item is set correctly
    expect(localStorage.getItem(key)).toBe(value);

    // Check if the expiration time is set correctly
    const expireTime = localStorage.getItem(`${key}_timer`);
    expect(expireTime).not.toBeNull();
    expect(Number(expireTime)).toBe(
      getUnixTime(addSeconds(new Date(), amount))
    );

    // Get item from localStorage
    const storedValue = limitedStorage.getItem(key);
    expect(storedValue).toBe(value);
  });

  test('limitedLocalStorage getItem with expired key', () => {
    const key = 'testKey';
    const value = 'testValue';
    const amount = 60; // 1 minute

    const limitedStorage = piniaHelperUtil.limitedLocalStorage(amount);

    // Set item in localStorage
    limitedStorage.setItem(key, value);

    // Fast-forward time to expire the key
    vi.advanceTimersByTime(amount * 1000 + 1000);

    // Get item from localStorage
    const storedValue = limitedStorage.getItem(key);
    expect(storedValue).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
    expect(localStorage.getItem(`${key}_timer`)).toBeNull();
  });

  test('setStoreResetTimeout resets store after expiration', () => {
    const key = 'testKey';
    const value = 'testValue';
    const amount = 60; // 1 minute

    const limitedStorage = piniaHelperUtil.limitedLocalStorage(amount);

    // Set item in localStorage
    limitedStorage.setItem(key, value);

    // Fast-forward time to expire the key
    vi.advanceTimersByTime(amount * 1000 + 1000);

    // Check if the store is reset
    expect(store.data).toBe('initial');
  });
});
