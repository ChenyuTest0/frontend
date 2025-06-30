/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { container } from 'tsyringe';
import { ComponentPublicInstance } from 'vue';
import { ModalUtil } from '../utils/modal.util';
import {
  ApiSystemError,
  ApiValidationError,
  AuthenticationError,
  MaintenanceError,
  NetworkError
} from '@core/errors';
import { LoggerService } from '@core/logger/logger.service';
import AlertDialog from '@shared/components/alert-dialog.component.vue';
import { $t } from '@shared/utils/i18n.util';

/**
 * Vueグローバルエラーハンドラ
 * Vueの中で例外が発生した場合ここに入る
 *
 * @param {unknown} err
 * @param {(ComponentPublicInstance | null)} instance
 * @param {string} info
 */
export const globalErrorHandler = (
  error: any,
  instance: ComponentPublicInstance | null,
  info: string
) => {
  const props = createDialogMessage(error);
  console.debug(instance);
  console.debug(info);
  if (error instanceof ApiValidationError && !error.isShowDialog) {
    return;
  }
  const logger = container.resolve(LoggerService);
  logger.systemError({
    message: props?.message,
    error: error
  });

  ModalUtil.push(AlertDialog, props, {
    dismissible: false
  });
};

/**
 * Javascriptのネイティブエラーハンドラを設定する
 */
export const initializeNativeErrorHandler = () => {
  // Javascriptエラーハンドラ
  // Vueの外で例外が発生した場合ここに入る
  window.addEventListener('error', event => {
    const props = createDialogMessage(event.error);
    ModalUtil.push(AlertDialog, props, {
      dismissible: false
    });
  });

  // JavascriptのPromise Rejectionハンドラ
  // Vueの外でハンドリングされていないPromiseのRejectionが発生した場合ここに入る
  window.addEventListener('unhandledrejection', event => {
    const props = createDialogMessage(event.reason);
    ModalUtil.push(AlertDialog, props, {
      dismissible: false
    });
  });
};

/**
 * エラーメッセージをダイアログ表示する
 *
 * @param {*} error
 * @return {*}  {{ message: string; title: string; applicationError: any }}
 */
const createDialogMessage = (
  error: any
): {
  message: string;
  title: string;
  applicationError: any;
} => {
  if (error.promise && error.rejection && error.rejection instanceof Error) {
    error = error.rejection;
  }
  let message = error?.message ? error.message : error.toString();
  const title = $t('SystemMessages.SystemErrorTitle');
  let businessMessage: string | undefined = undefined;
  let businessTitle: string | undefined = undefined;

  if (error.businessMessage) {
    businessMessage = error.businessMessage;
  }
  if (error.businessMessageTitle) {
    businessTitle = error.businessMessageTitle;
  }

  if (error instanceof NetworkError) {
    message = $t('SystemMessages.SystemErrorNetwork');
  }
  if (error instanceof ApiSystemError) {
    message = $t('SystemMessages.SystemErrorApi');
  }
  if (error instanceof AuthenticationError) {
    message = $t('SystemMessages.SystemErrorAuth');
    if (!error.errorHandlerAfterCallback) {
      error.errorHandlerAfterCallback = async () => {
        // HACK: ログアウト処理を記載
        location.href = '/';
      };
    }
  }
  if (error instanceof MaintenanceError) {
    message = $t('SystemMessages.SystemErrorMaintenance');
  }
  // 資産変更検知エラー
  // dynamic importで.jsファイルの読み込みに失敗した場合のみ発火し、リロードを促す
  if (
    error?.message?.indexOf('Failed to fetch dynamically imported') > -1 &&
    error?.message?.endsWith('.js')
  ) {
    businessTitle = $t('SystemMessages.VersionTitle');
    businessMessage = $t('SystemMessages.Version');
    error = new NetworkError(
      undefined,
      businessTitle,
      businessMessage,
      async () => {
        location.reload();
      }
    );
  }

  return {
    message: businessMessage ? businessMessage : message,
    title: businessTitle ? businessTitle : title,
    applicationError: error
  };
};
