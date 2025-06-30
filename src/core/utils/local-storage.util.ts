/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/**
 * Define the storage service uses local storage
 *
 * @export
 * @class LocalStorageUtil
 */
export class LocalStorageUtil {
  /**
   * Gets the value from storage
   *
   * @param {string} key storage key
   * @returns {*} value
   * @memberof LocalStorageUtil
   */
  public static get(key: string): string {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : undefined;
  }

  /**
   * Get the key/value of the specified key from local storage.
   * Key can be set as regular expression.
   * If the key is not set, return all key/value.
   *
   * @static
   * @param {string | RegExp} [key]
   * @returns {Record<string, string>}
   * @memberof LocalStorageUtil
   */
  public static getItems(
    key: string | RegExp
  ): Record<string, string> | undefined {
    const results = {} as Record<string, string>;

    for (const item in localStorage) {
      if (
        localStorage.hasOwnProperty(item) &&
        (item.match(key) || (!key && typeof item === 'string'))
      ) {
        const value = localStorage.getItem(item);
        if (value !== null) {
          results[item] = value;
        }
      }
    }
    return Object.keys(results).length ? results : undefined;
  }

  /**
   * Determine whether the key is included in local storage or not
   *
   * @static
   * @param {string | RegExp} key
   * @returns {boolean}
   * @memberof LocalStorageUtil
   */
  public static has(key: string | RegExp): boolean {
    if (typeof key === 'string') {
      return localStorage.hasOwnProperty(key);
    }
    let result = false;
    for (const item in localStorage) {
      if (
        localStorage.hasOwnProperty(item) &&
        (item.match(key) || (!key && typeof item === 'string'))
      ) {
        result = true;
        break;
      }
    }
    return result;
  }

  /**
   * Sets the value to storage
   *
   * @param {string} key storage key
   * @param {*} value store value
   * @memberof LocalStorageUtil
   */
  public static set({ key, value }: { key: string; value: any }): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove the specified item.
   *
   * @param {string} key storage key
   * @memberof LocalStorageUtil
   */
  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Remove the all local storage items matching the key
   *
   * @static
   * @param {string | RegExp} key
   * @memberof LocalStorageUtil
   */
  public static removeItems(key: string | RegExp): void {
    for (const item in localStorage) {
      if (localStorage.hasOwnProperty(item) && item.match(key)) {
        localStorage.removeItem(item);
      }
    }
  }
}
