/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ArrayUtils
 *
 * @export
 * @class ArrayUtils
 */
export class ArrayUtil {
  /**
   * Array Clear
   *
   * @static
   * @param {any[]} target
   * @memberof ArrayUtils
   */
  public static clear(target: any[]): void {
    target.splice(0, target.length);
  }

  /**
   * Array push
   *
   * @static
   * @param {any[]} target
   * @param {any[]} elements
   * @memberof ArrayUtils
   */
  public static push(target: any[], elements: any[]): void {
    Array.prototype.push.apply(target, elements);
  }

  /**
   * Array replace
   *
   * @static
   * @param {any[]} target
   * @param {any[]} elements
   * @memberof ArrayUtils
   */
  public static replace(target: any[], elements: any[]): void {
    ArrayUtil.clear(target);
    ArrayUtil.push(target, elements);
  }
}
