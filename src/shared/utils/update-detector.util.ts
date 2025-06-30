import { ApplicationError } from '../../core/errors/index';
import { ModalUtil } from './modal.util';
import AlertDialog from '@shared/components/alert-dialog.component.vue';
import { $t } from '@shared/utils/i18n.util';

/**
 * SPAのHTMLが更新されているか検知してダイアログを出す
 *
 * @export
 * @class UpdateDetector
 */
export class UpdateDetector {
  private static previousHtmlHash: number;

  /**
   * index.htmlのハッシュ値を比較し、アップデートを検知、ダイアログを表示する
   * 通信に失敗した場合は終了する
   *
   * @static
   * @return {*} {Promise<void>}
   * @memberof UpdateDetector
   */
  public static async checkUpdatesInCode(): Promise<void> {
    try {
      const response = await fetch('/index.html', { cache: 'no-store' });
      if (response.status !== 200) {
        return;
      }
      const htmlHash = UpdateDetector.createHash(await response.text());
      if (!UpdateDetector.previousHtmlHash) {
        UpdateDetector.previousHtmlHash = htmlHash;
        return;
      }
      if (UpdateDetector.previousHtmlHash !== htmlHash) {
        UpdateDetector.previousHtmlHash = htmlHash;
        const error = new ApplicationError();
        error.errorHandlerAfterCallback = async () => {
          location.reload();
        };

        ModalUtil.push(
          AlertDialog,
          {
            title: $t('SystemMessages.VersionTitle'),
            message: $t('SystemMessages.Version'),
            applicationError: error
          },
          { dismissible: false }
        );
      }
    } catch (_err) {
      // 何もしない
    }
  }

  /**
   * 定期的にアップデートの確認を実行する。
   * defaultは10分
   *
   * @static
   * @param {number} [interval=10 * 60 * 1000] 実行時間（ミリ秒）
   * @memberof UpdateDetector
   */
  public static checkUpdatesInCodeInterval(
    interval: number = 10 * 60 * 1000
  ): void {
    UpdateDetector.checkUpdatesInCode();
    setInterval(async () => {
      await UpdateDetector.checkUpdatesInCode();
    }, interval);
  }

  /**
   * HTMLのハッシュ値を求める
   *
   * @private
   * @static
   * @param {string} html ハッシュ化対象のHTML
   * @return {*}  {number} ハッシュ
   * @memberof UpdateDetector
   */
  private static createHash(html: string): number {
    const len = html.length;
    let hash = 0;
    if (len === 0) return hash;
    let i;
    for (i = 0; i < len; i++) {
      hash = (hash << 5) - hash + html.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
