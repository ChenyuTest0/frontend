import { describe, expect, test, vi } from 'vitest';
import { NetworkError, ApiValidationError } from '../errors';
import {
  useApiHandler,
  useShowDialogApiHandler
} from './api-error-handler.composition';

describe('useApiHandler', () => {
  test('should handle API call successfully', async () => {
    const mockExec = vi.fn().mockResolvedValue('success');
    const { handleApi, error, loading } = useApiHandler(mockExec);

    expect(loading.value).toBe(false);
    const result = await handleApi();
    expect(result).toBe('success');
    expect(loading.value).toBe(false);
    expect(error.value).toBeUndefined();
  });

  test('should handle NetworkError', async () => {
    const mockExec = vi
      .fn()
      .mockRejectedValue(new NetworkError('Network error'));
    const { handleApi, error, loading } = useApiHandler(mockExec);

    expect(loading.value).toBe(false);
    await expect(handleApi()).rejects.toThrow(NetworkError);
    expect(loading.value).toBe(false);
    expect(error.value).toBeInstanceOf(NetworkError);
  });

  test('should handle NetworkError with retry', async () => {
    const mockExec = vi
      .fn()
      .mockRejectedValueOnce(new NetworkError('Network error'))
      .mockResolvedValue('success');

    const setFieldError = vi.fn();
    // retryCountを指定する
    const { handleApi, error, loading } = useApiHandler(
      mockExec,
      setFieldError,
      false,
      1
    );

    expect(loading.value).toBe(false);
    const result = await handleApi();
    expect(result).toBe('success');
    expect(loading.value).toBe(false);
    expect(error.value).toBeUndefined();
  });

  test('should handle ApiValidationError', async () => {
    const validationError = new ApiValidationError(
      'Validation error',
      'Name is required'
    );
    const mockExec = vi.fn().mockRejectedValue(validationError);
    const setFieldError = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { handleApi, error, loading } = useApiHandler(
      mockExec,
      setFieldError,
      true
    );

    expect(loading.value).toBe(false);
    await expect(handleApi()).rejects.toThrow(ApiValidationError);
    expect(loading.value).toBe(false);
  });
});

describe('useShowDialogApiHandler', () => {
  test('should always show dialog on validation error', async () => {
    const validationError = new ApiValidationError(
      'Validation error',
      'Name is required'
    );
    const mockExec = vi.fn().mockRejectedValue(validationError);
    const setFieldError = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { handleApi, error, loading } = useShowDialogApiHandler(
      mockExec,
      setFieldError
    );

    expect(loading.value).toBe(false);
    await expect(handleApi()).rejects.toThrow(ApiValidationError);
    expect(loading.value).toBe(false);
  });
});
