/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiSystemError,
  ApiValidationError,
  AuthenticationError,
  MaintenanceError,
  NetworkError
} from '../errors';
import { convertBodyToDate } from './iso8601.util';

/**
 * AxiosのInstanceを作成するFactoryUtil
 *
 * @export
 * @class AxiosFactory
 */
export class AxiosFactory {
  /**
   * アプリで作られたAxiosInstance
   *
   * @private
   * @static
   * @type {*}
   * @memberof AxiosFactory
   */
  private static repositories: any = {};

  /**
   * DefaultのResponseInspector
   *
   * @private
   * @static
   * @param {AxiosRequestConfig<any>} request
   * @memberof AxiosFactory
   */
  private static defaultRequestInspector = (
    request: AxiosRequestConfig<any>
  ) => {
    return request;
  };

  /**
   * DefaultのResponseInspector
   *
   * @private
   * @static
   * @param {AxiosResponse<never>} response
   * @memberof AxiosFactory
   */
  private static defaultResponseInspector = (
    response: AxiosResponse<never>
  ) => {
    // iso8601 -> Date変換
    convertBodyToDate(response.data);
    return response;
  };

  /**
   * DefaultのResponseErrorHandler
   *
   * @private
   * @static
   * @param {*} error
   * @memberof AxiosFactory
   */
  private static defaultResponseErrorInspector = (error: any) => {
    let businessError;
    switch (error?.response?.status) {
      case 400:
        businessError = new ApiValidationError(error);
        break;
      case 401:
        businessError = new AuthenticationError(error);
        break;
      case 500:
        businessError = new ApiSystemError(error);
        break;
      case 503:
        businessError = new MaintenanceError(error);
        break;
      default:
        businessError = new NetworkError(error);
        break;
    }
    return Promise.reject(businessError);
  };

  /**
   * AxiosのInstanceを生成し、返却する
   *
   * @static
   * @param {string} endpoint
   * @param {*} [requestInspector]
   * @param {*} [responseInspector]
   * @memberof AxiosFactory
   */
  public static createInstance(
    endpoint?: string,
    requestInspector?: any,
    responseInspector?: any,
    responseErrorInspector?: any
  ): AxiosInstance {
    const targetEndpoint = endpoint
      ? endpoint
      : import.meta.env.VITE_API_ENDPOINT;
    const defaultTimeout = import.meta.env.VITE_NETWORK_TIMEOUT;
    const repository = axios.create({
      baseURL: targetEndpoint,
      timeout: defaultTimeout,
      adapter: 'fetch'
    });

    repository.interceptors.request.use(
      requestInspector ? requestInspector : AxiosFactory.defaultRequestInspector
    );
    repository.interceptors.response.use(
      responseInspector
        ? responseInspector
        : AxiosFactory.defaultResponseInspector,
      responseErrorInspector
        ? responseErrorInspector
        : AxiosFactory.defaultResponseErrorInspector
    );

    AxiosFactory.repositories[targetEndpoint] = repository;
    return repository;
  }

  /**
   * 既に生成されているAxiosInstanceを取得する。無ければDefaultのInstanceを生成し返却する。
   *
   * @static
   * @param {string} [endpoint]
   * @return {*}  {AxiosInstance}
   * @memberof AxiosFactory
   */
  public static get(endpoint?: string): AxiosInstance {
    const targetEndpoint = endpoint
      ? endpoint
      : import.meta.env.VITE_API_ENDPOINT;

    return AxiosFactory.repositories &&
      AxiosFactory.repositories[targetEndpoint]
      ? AxiosFactory.repositories[targetEndpoint]
      : AxiosFactory.createInstance(targetEndpoint);
  }
}
