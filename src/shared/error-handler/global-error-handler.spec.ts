import { container } from 'tsyringe';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ModalUtil } from '../utils/modal.util';
import { globalErrorHandler } from './global-error-handler';
import { ApiValidationError, AuthenticationError } from '@core/errors';
import AlertDialog from '@shared/components/alert-dialog.component.vue';
import { $t } from '@shared/utils/i18n.util';

vi.mock('tsyringe');
vi.mock('../utils/modal.util');
vi.mock('@core/logger/logger.service');
vi.mock('@shared/components/alert-dialog.component.vue');
vi.mock('@shared/utils/i18n.util');

describe('globalErrorHandler', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let loggerMock: any;

  beforeEach(() => {
    loggerMock = {
      systemError: vi.fn()
    };
    container.resolve = vi.fn().mockReturnValue(loggerMock);
  });

  test('should log error and show dialog for general errors', () => {
    const error = new Error('Test error');
    const instance = null;
    const info = 'test info';

    globalErrorHandler(error, instance, info);

    expect(loggerMock.systemError).toHaveBeenCalledWith({
      message: error.message,
      error: error
    });
    expect(ModalUtil.push).toHaveBeenCalledWith(
      AlertDialog,
      expect.any(Object),
      { dismissible: false }
    );
  });

  test('should not show dialog for ApiValidationError if isShowDialog is false', () => {
    const error = new ApiValidationError('Validation error');
    const instance = null;
    const info = 'test info';

    globalErrorHandler(error, instance, info);

    expect(loggerMock.systemError).not.toHaveBeenCalled();
  });

  test('should handle AuthenticationError and set errorHandlerAfterCallback', () => {
    const error = new AuthenticationError('Auth error');
    const instance = null;
    const info = 'test info';

    globalErrorHandler(error, instance, info);

    expect(loggerMock.systemError).toHaveBeenCalledWith({
      message: $t('SystemMessages.SystemErrorAuth'),
      error: error
    });
    expect(ModalUtil.push).toHaveBeenCalledWith(
      AlertDialog,
      expect.any(Object),
      { dismissible: false }
    );
    expect(error.errorHandlerAfterCallback).toBeDefined();
  });
});
