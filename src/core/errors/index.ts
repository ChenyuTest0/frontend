/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError } from 'ts-custom-error';

/**
 * Default validation error for ACTS
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
  error: string;
  fields: Array<ValidFieldsError>;
  global: Array<ValidGlobalError>;
}

/**
 * Single field error
 *
 * @export
 * @interface ValidFieldsError
 */
export interface ValidFieldsError {
  field: string;
  message: string;
}

/**
 * Multiple field error
 *
 * @export
 * @interface ValidGlobalError
 */
export interface ValidGlobalError {
  message: string;
}

/**
 * Application Default Error
 *
 * @export
 * @class ApplicationError
 * @implements {Error}
 */
export class ApplicationError extends CustomError {
  /**
   * for Error dialog message
   *
   * @type {string}
   * @memberof ApplicationError
   */
  public businessMessage: string | undefined;

  /**
   * for Error dialog title
   *
   * @type {string}
   * @memberof ApplicationError
   */
  public businessMessageTitle: string | undefined;

  /**
   * error code
   *
   * @type {number}
   * @memberof ApplicationError
   */
  // tslint:disable-next-line: typedef
  public code = 0;

  /**
   * error handler after callback
   *
   * @private
   * @memberof ApplicationError
   */
  public errorHandlerAfterCallback: (() => Promise<void>) | undefined;

  /**
   * When the dialog is displayed, skip showing the dialog in duplicate.
   *
   * @type {false}
   * @memberof ApplicationError
   */
  public skipWhileStackDialog = false;

  /**
   *Creates an instance of ApplicationError.
   * @param {string} [message]
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof ApplicationError
   */
  public constructor(
    message?: string,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog = false
  ) {
    super(message);
    this.businessMessage = businessMessage;
    this.businessMessageTitle = businessMessageTitle;
    this.errorHandlerAfterCallback = errorHandlerAfterCallback;
    this.skipWhileStackDialog = skipWhileStackDialog;
  }

  /**
   * Returns a string that represents the current object.
   *
   * @returns A string that represents the current object.
   * @memberof ApplicationError
   */
  public toString(): string {
    return this.name + ': ' + this.message;
  }
}

/**
 * Application Network Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
export class NetworkError extends ApplicationError {
  /**
   *Creates an instance of NetworkError.
   * @param {HttpErrorResponse} httpError
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof NetworkError
   */
  constructor(
    public httpError: any,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog = false
  ) {
    super(
      httpError?.response?.statusText,
      businessMessage,
      businessMessageTitle,
      errorHandlerAfterCallback,
      skipWhileStackDialog
    );
    this.code = httpError?.response?.status;
  }
}

/**
 * Maintenance error
 *
 * @export
 * @class MaintenanceError
 * @extends {ApplicationError}
 */
export class MaintenanceError extends NetworkError {}

/**
 * Application Authentication Error
 *
 * @export
 * @class AuthenticationError
 * @extends {ApplicationError}
 */
// tslint:disable-next-line:max-classes-per-file
export class AuthenticationError extends NetworkError {}

/**
 * Application API Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
// tslint:disable-next-line:max-classes-per-file
export class ApiValidationError extends NetworkError {
  public validationError: ValidationError;
  public isShowDialog = false;

  /**
   *Creates an instance of ApiValidationError.
   * @param {HttpErrorResponse} httpError
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof ApiValidationError
   */
  constructor(
    public httpError: any,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog = false
  ) {
    super(
      httpError?.response?.statusText,
      businessMessage,
      businessMessageTitle,
      errorHandlerAfterCallback,
      skipWhileStackDialog
    );
    // for ApiValidationError
    this.validationError = httpError?.response?.data;
    this.code = httpError?.response?.status;
  }
}

/**
 * Application API Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
// tslint:disable-next-line:max-classes-per-file
export class ApiSystemError extends NetworkError {}
