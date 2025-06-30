import { format } from 'date-fns';

import { AbstractLogger } from './logger';
import { ILogMessage } from './logger.service';

/**
 * Configuration for console log
 * @export
 * @interface IConsoleLoggerConfig
 */
export interface IConsoleLoggerConfig {
  /**
   * Log level
   *
   * @type {string}
   * @memberof IConsoleLoggerConfig
   */
  level: string;
}

/**
 * Console logger
 */
export class ConsoleLogger extends AbstractLogger {
  /**
   * Creates an instance of ConsoleLogger.
   * @param {IConsoleLoggerConfig} config Configuration for console logger
   * @memberof ConsoleLogger
   */
  constructor(config: IConsoleLoggerConfig) {
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
    // if no message or the log level is less than the environ
    if (!this.isValid(level)) {
      return;
    }

    let color: string;

    switch (level) {
      case 'EVENT':
        return;
      case 'TAP_EVENT':
      case 'TRACE':
        color = 'blue';
        break;
      case 'DEBUG':
        color = 'teal';
        break;
      case 'INFO':
      case 'LOG':
        color = 'gray';
        break;
      case 'WARN':
      case 'ERROR':
      case 'SYSTEM_ERROR':
        color = 'red';
        break;
      case 'OFF':
      default:
        return;
    }

    if (!log.stack) {
      log.stack = '';
    }
    if (!log.param) {
      log.param = '';
    }
    if (log?.error) {
      console.error(log.error);
    }
    console.log(
      `%c${format(datetime, 'yyyy-MM-dd HH:mm:ss.SSS')} [${level}] ${
        log.message
      }${log.param} ${log.stack}`,
      `color:${color}`
    );
  }
}
