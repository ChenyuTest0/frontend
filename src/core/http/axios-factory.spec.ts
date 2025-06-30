/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { ApiValidationError } from '../errors';
import { AxiosFactory } from './axios-factory';

describe('AxiosFactory', () => {
  test('should create an Axios instance with default settings', () => {
    const instance = AxiosFactory.createInstance();
    expect(instance.defaults.baseURL).toBe(import.meta.env.VITE_API_ENDPOINT);
    expect(instance.defaults.timeout).toBe(
      import.meta.env.VITE_NETWORK_TIMEOUT
    );
  });

  test('should use custom request and response inspectors if provided', () => {
    const customRequestInspector = vi.fn(config => config);
    const customResponseInspector = vi.fn(response => response);

    const instance = AxiosFactory.createInstance(
      undefined,
      customRequestInspector,
      customResponseInspector
    );

    (instance.interceptors.request as any).handlers[0].fulfilled({
      url: 'test'
    });
    (instance.interceptors.response as any).handlers[0].fulfilled({
      data: 'test'
    });

    expect(customRequestInspector).toHaveBeenCalled();
    expect(customResponseInspector).toHaveBeenCalled();
  });

  test('should handle response errors correctly', async () => {
    const instance = AxiosFactory.createInstance();
    const error = { response: { status: 400 } };

    try {
      await (instance.interceptors.response as any).handlers[0].rejected(error);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiValidationError);
    }
  });

  test('should return existing instance if already created', () => {
    const endpoint = 'http://example.com';
    const instance1 = AxiosFactory.createInstance(endpoint);
    const instance2 = AxiosFactory.get(endpoint);

    expect(instance1).toBe(instance2);
  });

  test('should create a new instance if not already created', () => {
    const endpoint = 'http://new-endpoint.com';
    const instance = AxiosFactory.get(endpoint);

    expect(instance.defaults.baseURL).toBe(endpoint);
  });
});
