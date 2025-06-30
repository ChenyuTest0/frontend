/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pushModal,
  config,
  popModal,
  closeModal,
  openModal,
  Modal
} from 'jenesius-vue-modal';

// モーダルのアニメーションが追加で必要な場合はTransitionTypeを増やし、setTransitionでtransitionを設定する。
export enum ModalTransitionType {
  SLIDE_UP,
  FADE_IN
}

export interface ModalConfig {
  dismissible?: boolean;
  transitionType?: ModalTransitionType;
}

/**
 * jenesius-vue-modalのWrapperクラス
 * plugin側ではconfigの管理がmodalごとにはできないため、本クラスで個別に設定する。
 *
 * @export
 * @class ModalUtil
 */
export class ModalUtil {
  // modalごとの設定を管理
  private static configs: Array<ModalConfig | undefined> = [];

  /**
   * 初期設定を行う
   * animationはmodal-transitionで固定する
   */
  public static initialize() {
    config({
      backgroundClose: true,
      animation: 'modal-transition',
      scrollLock: true,
      escClose: true
    });
  }

  /**
   * modalをpushする。
   * pushする前にconfig、transitionを変更する
   *
   * @static
   * @param {any} component
   * @param {any} [params]
   * @param {ModalConfig} [modalConfig]
   * @return {*}  {Promise<Modal>}
   * @memberof ModalUtil
   */
  public static async push(
    component: any,
    params?: any,
    modalConfig?: ModalConfig
  ): Promise<Modal> {
    this.setConfig(modalConfig);
    this.configs.push(modalConfig);

    return pushModal(component, params);
  }

  /**
   * Modalを開く前に全てのModalを閉じる
   * openする前にconfig、transitionを変更する
   *
   * @static
   * @param {any} component
   * @param {any} [params]
   * @param {ModalConfig} [modalConfig]
   * @return {*}  {Promise<Modal>}
   * @memberof ModalUtil
   */
  public static async open(
    component: any,
    params?: any,
    modalConfig?: ModalConfig
  ): Promise<Modal> {
    this.setConfig(modalConfig);
    this.configs = [modalConfig];

    return openModal(component, params);
  }

  /**
   * modalをpopする。
   *
   * @static
   * @return {*}  {Promise<void>}
   * @memberof ModalUtil
   */
  public static async pop(): Promise<void> {
    await popModal();
    this.configs.pop();
    // animationの完了を待ち、現在開いているModalのconfigに戻す
    setTimeout(
      () => this.setConfig(this.configs[this.configs.length - 1]),
      300
    );
  }

  /**
   * 全てのmodalを閉じる
   *
   * @static
   * @return {*}  {Promise<void>}
   * @memberof ModalUtil
   */
  public static async closeAll(): Promise<void> {
    closeModal();
    this.configs = [];
    // animationの完了を待つ
    setTimeout(() => this.setConfig(), 300);
  }

  /**
   * ModalのConfigを設定する
   * Configが渡されていない場合はデフォルトの値を設定する
   *
   * @param modalConfig
   */
  private static setConfig(modalConfig?: ModalConfig): void {
    config({ backgroundClose: modalConfig?.dismissible ?? true });
    this.setTransition(
      modalConfig?.transitionType ?? ModalTransitionType.FADE_IN
    );
  }

  /**
   * TransitionType別にglobal.scssに定義されているstyleを書き換える
   *
   * @param transitionType
   * @returns
   */
  private static setTransition(transitionType: ModalTransitionType): void {
    const root = document.documentElement;
    const modalTransitionKey = '--modal-transition';

    switch (transitionType) {
      case ModalTransitionType.SLIDE_UP: {
        root.style.setProperty(modalTransitionKey, 'translateY(100%)');
        break;
      }
      case ModalTransitionType.FADE_IN: {
        root.style.setProperty(modalTransitionKey, 'translateY(-60px)');
        break;
      }
      default: {
        root.style.setProperty(modalTransitionKey, 'translateY(-60px)');
        break;
      }
    }
  }
}
