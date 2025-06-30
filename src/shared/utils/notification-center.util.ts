import { Disposable, Listener, TypedEvent } from '@core/helper/typed-emitter';

// 通知したいイベントを定義する
export type ApplicationEvent = 'Login' | 'Logout' | 'LocaleChanged';

/**
 * Eventの全体通知用のUtil
 * ソースコードの可読性が著しく失われるため、ログアウト時のStoreの一斉リセットなど用途は限って利用すること
 *
 * @export
 * @class NotificationCenterUtil
 */
export class NotificationCenterUtil {
  private static appEvent = new TypedEvent<ApplicationEvent>();

  /**
   * Listenerの登録を行う
   * disposeを実行するか、offがコールされるまでイベントは発行されるため注意
   *
   * @static
   * @param {Listener<ApplicationEvent>} listener
   * @return {*}  {Disposable}
   * @memberof NotificationCenterUtil
   */
  public static on(listener: Listener<ApplicationEvent>): Disposable {
    return NotificationCenterUtil.appEvent.on(listener);
  }

  /**
   * Listenerの登録を行う
   * イベントは一度のみ発行される
   *
   * @static
   * @param {Listener<ApplicationEvent>} listener
   * @memberof NotificationCenterUtil
   */
  public static once(listener: Listener<ApplicationEvent>): void {
    NotificationCenterUtil.appEvent.once(listener);
  }

  /**
   * Listenerの解除を行う
   *
   * @static
   * @param {Listener<ApplicationEvent>} listener
   * @memberof NotificationCenterUtil
   */
  public static off(listener: Listener<ApplicationEvent>): void {
    NotificationCenterUtil.appEvent.off(listener);
  }

  /**
   * イベントの一斉送信を行う
   *
   * @static
   * @param {ApplicationEvent} event
   * @memberof NotificationCenterUtil
   */
  public static emit(event: ApplicationEvent): void {
    NotificationCenterUtil.appEvent.emit(event);
  }
}
