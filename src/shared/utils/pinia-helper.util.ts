/* eslint-disable @typescript-eslint/ban-types */
import { addSeconds, getUnixTime } from 'date-fns';
import { Store } from 'pinia';

// keyにタイマー用のpostfixをつける
const pt = (key: string): string => {
  return `${key}_timer`;
};

/**
 * PiniaのHelper
 *
 * @export
 * @class PiniaHelperUtil
 */
export class PiniaHelperUtil {
  private timeoutId = 0;
  private store!: Store;

  /**
   * 時限的なStoreCacheを提供する
   *
   * @param {number} amount 有効期限秒。1日有効であれば、1*24*60*60など入力
   * @return {*}  {(Pick<Storage, 'getItem' | 'setItem'>)}
   * @memberof PiniaHelperUtil
   */
  public limitedLocalStorage(
    amount: number
  ): Pick<Storage, 'getItem' | 'setItem'> {
    return {
      // Storageから情報がリストアされる際に1度のみ呼ばれる
      getItem: (key: string): string | null => {
        const expire = localStorage.getItem(pt(key));
        const nowTime = getUnixTime(new Date());
        // 期限切れのStorageは削除する
        if (expire && Number(expire) < nowTime) {
          localStorage.removeItem(pt(key));
          localStorage.removeItem(key);
        }
        // 期限内であればブラウザ上でタイマーを有効化する
        if (expire && Number(expire) >= nowTime) {
          this.setStoreResetTimeout(key, Number(expire) - nowTime);
        }
        return localStorage.getItem(key);
      },
      // Storeがアップデートされる度に呼ばれる
      setItem: (key: string, value: string): void => {
        // 有効期限と値をLocalStorageに記録する
        const expire = addSeconds(new Date(), amount);
        localStorage.setItem(pt(key), getUnixTime(expire).toString());
        localStorage.setItem(key, value);
        this.setStoreResetTimeout(key, amount);
      }
    };
  }

  /**
   * リセットを行う場合のStoreを登録する
   *
   * @param {Store} store
   * @memberof PiniaHelperUtil
   */
  public setLimitedTargetStore(store: Store): void {
    this.store = store;
  }

  /**
   * オンメモリ上での時限的なリセット処理
   *
   * @private
   * @param {string} key
   * @param {number} amount
   * @memberof PiniaHelperUtil
   */
  private setStoreResetTimeout(key: string, amount: number) {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      localStorage.removeItem(pt(key));
      localStorage.removeItem(key);
      if (this.store) {
        this.store.$reset();
      }
    }, amount * 1000);
  }
}
