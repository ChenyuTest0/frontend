/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/**
 * Define the storage service uses session storage
 *
 * @export
 * @class SessionStorageUtil
 */
export class SessionStorageUtil {
  /**
   * Gets the value from storage
   *
   * @param {string} key storage key
   * @returns {*} value
   * @memberof SessionStorageUtil
   */
  public static get(key: string): string {
    const item = sessionStorage.getItem(key);
    return item !== null ? JSON.parse(item) : undefined;
  }

  /**
   * Get the key/value of the specified key from session storage.
   * Key can be set as regular expression.
   * If the key is not set, return all key/value.
   *
   * @static
   * @param {string | RegExp} key
   * @returns {object}
   * @memberof SessionStorageUtil
   */
  public static getItems(
    key: string | RegExp
  ): Record<string, string> | undefined {
    const results = {} as Record<string, string>;

    for (const item in sessionStorage) {
      if (
        sessionStorage.hasOwnProperty(item) &&
        (item.match(key) || (!key && typeof item === 'string'))
      ) {
        const value = sessionStorage.getItem(item);
        if (value !== null) {
          results[item] = value;
        }
      }
    }
    return Object.keys(results).length ? results : undefined;
  }

  /**
   * Determine whether the key is included in session storage or not
   *
   * @static
   * @param {string} key
   * @returns {boolean}
   * @memberof SessionStorageUtil
   */
  public static has(key: string | RegExp): boolean {
    if (typeof key === 'string') {
      return sessionStorage.hasOwnProperty(key);
    }
    let result = false;
    for (const item in sessionStorage) {
      if (
        sessionStorage.hasOwnProperty(item) &&
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
   * @memberof SessionStorageUtil
   */
  public static set({ key, value }: { key: string; value: any }): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove the specified item.
   *
   * @param {string} key storage key
   * @memberof SessionStorageUtil
   */
  public static remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Remove the all session storage items matching the key
   *
   * @static
   * @param {string | RegExp} key
   * @memberof SessionStorageUtil
   */
  public static removeItems(key: string | RegExp): void {
    for (const item in sessionStorage) {
      if (sessionStorage.hasOwnProperty(item) && item.match(key)) {
        sessionStorage.removeItem(item);
      }
    }
  }
}
