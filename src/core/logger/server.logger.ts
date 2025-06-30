/**
 * Define the logger for send the message to server
 */

import { AbstractLogger } from './logger';
import { ILogMessage } from './logger.service';
import { AxiosFactory } from '@core/http/axios-factory';

/**
 * Configuration for server log
 * @export
 * @interface IServerLoggerConfig
 */
export interface IServerLoggerConfig {
  /**
   * log level
   *
   * @type {string}
   * @memberof IServerLoggerConfig
   */
  level: string;
  /**
   * Url for server
   *
   * @type {string}
   * @memberof IServerLoggerConfig
   * @example
   *   url: 'http://localhost/log'
   */
  url: string;
}

/**
 * Server logger
 */
export class ServerLogger extends AbstractLogger {
  /**
   * Creates an instance of ServerLogger.
   * @param {IServerLoggerConfig} config configuration for server log
   * @memberof ServerLogger
   */
  constructor(private config: IServerLoggerConfig) {
    super(config.level);
  }

  /**
   * Write a log message.
   *
   * @param {Date} datetime date and time for log
   * @param {string} level log level
   * @param {ILogMessage} log log message
   * @returns {void} Noting
   * @memberof ConsoleLogger
   */
  public write(datetime: Date, level: string, log: ILogMessage): void {
    if (!this.config.url) {
      return;
    }

    // if no message or the log level is less than the environ
    if (!this.isValid(level)) {
      return;
    }

    // create a body
    const body = {
      datetime: datetime,
      level: level,
      message: log.message,
      param: log.param,
      stack: log.stack
    };

    AxiosFactory.get().post(this.config.url, body).then().catch();
  }
}
