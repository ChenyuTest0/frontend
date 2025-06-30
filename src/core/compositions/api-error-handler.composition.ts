import { reactive, Ref, toRefs } from 'vue';
import { ApiValidationError, NetworkError } from '../errors';
import { $t } from '@/shared/utils/i18n.util';

/**
 * API通信でのエラーハンドリングCompositionAPIのResultParameter
 *
 * @export
 * @template T useApiHandlerに設定したジェネリック型
 * @param {() => Promise<T | undefined>} handleApi 実行対象の処理
 * @param {Ref<NetworkError | undefined>} error Axiosから返却されたエラーオブジェクト
 * @param {Ref<boolean>} loading APIが実行中かどうか
 */
export type useApiHandlerResult<T> = {
  handleApi: () => Promise<T | undefined>;
  error: Ref<NetworkError | undefined>;
  loading: Ref<boolean>;
};

export type useApiHandler = {
  <T>(
    exec: () => Promise<T>,
    setFieldError?: unknown,
    isShowDialog?: boolean,
    retryCount?: number
  ): useApiHandlerResult<T>;
};

/**
 * API通信でのエラーハンドリングを含めたCompositionAPIを返却する
 * 常にisShowDialog=trueで実行する
 *
 * @export
 * @template T もし [exec] に返却値がある場合はここで型を定義する。無い場合は<void>を設定する。
 * @param {() => Promise<T>} exec 実行対象の処理
 * @param {* | undefined} setFieldError vee-validateのsetFieldErrorオブジェクトを渡す
 * @return {useApiHandlerResult<T>} CompositionAPIを返却する
 */
export const useShowDialogApiHandler: useApiHandler = <T>(
  exec: () => Promise<T>,
  setFieldError?: unknown | undefined,
  isShowDialog = true,
  retryCount = 0
): useApiHandlerResult<T> => {
  return useApiHandler<T>(exec, setFieldError, isShowDialog, retryCount);
};

/**
 * API通信でのエラーハンドリングを含めたCompositionAPIを返却する
 *
 * @export
 * @template T もし [exec] に返却値がある場合はここで型を定義する。無い場合は<void>を設定する。
 * @param {() => Promise<T>} exec 実行対象の処理
 * @param {* | undefined} setFieldError vee-validateのsetFieldErrorオブジェクトを渡す
 * @param {boolean} [isShowDialog=false] trueを設定すると、Httpエラーが発生している場合、それをダイアログ表示する。
 *                                       400エラーが発生している場合、Globalカラムに設定されたエラーメッセージを表示する。
 * @param {number} [retryCount=0] NetworkErrorが発生した場合にリトライを行う回数
 * @return {useApiHandlerResult<T>} CompositionAPIを返却する
 */
export const useApiHandler: useApiHandler = <T>(
  exec: () => Promise<T>,
  setFieldError?: unknown | undefined,
  isShowDialog = false,
  retryCount = 0
): useApiHandlerResult<T> => {
  const state = reactive<{
    error: NetworkError | undefined;
    loading: boolean;
  }>({
    error: undefined,
    loading: false
  });

  const handleApiError = (error: unknown) => {
    if (error instanceof NetworkError) {
      state.error = error;
    }
    if (!(error instanceof ApiValidationError)) {
      throw error;
    }

    let globalErrorMessage = '';
    if (setFieldError && setFieldError instanceof Function) {
      error.validationError?.fields?.forEach(field => {
        setFieldError(field.field, field.message);
      });
      error.validationError?.global?.forEach(field => {
        globalErrorMessage = field.message;
        setFieldError('global', field.message);
      });
    }
    if (!setFieldError && isShowDialog) {
      if (error.validationError?.fields?.length) {
        globalErrorMessage = $t('SystemMessages.SystemErrorValidate');
      }
      error.validationError?.global?.forEach(field => {
        globalErrorMessage = field.message;
      });
    }

    error.businessMessage = globalErrorMessage;
    error.isShowDialog = globalErrorMessage === '' ? false : isShowDialog;

    throw error;
  };

  const handleApi = async () => {
    state.loading = true;

    let result: T | undefined;
    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        await exec().then(localResult => {
          result = localResult;
        });
        break;
      } catch (error) {
        if (error instanceof NetworkError && attempts < retryCount) {
          attempts++;
        } else {
          state.loading = false;
          handleApiError(error);
        }
      }
    }
    state.loading = false;
    return result;
  };

  return {
    handleApi,
    ...toRefs(state)
  };
};
