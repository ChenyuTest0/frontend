/**
 * This is logger service.
 */
import * as StackTrace from 'stacktrace-js';

import { singleton } from 'tsyringe';
import { ILogger } from './logger';

/**
 * Logging Level
 */
export const Levels = [
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'EVENT',
  'TAP_EVENT',
  'WARN',
  'ERROR',
  'SYSTEM_ERROR',
  'OFF'
];

export const OffLevel = 'OFF';
export const AllLevel = 'ALL';

/**
 * Log message
 *
 * @export
 * @interface ILogMessage
 */
export interface ILogMessage {
  /**
   * Log message
   *
   * @type {string}
   * @memberof ILogMessage
   */
  message: string;
  /**
   * Stack trace
   *
   * @type {string}
   * @memberof ILogMessage
   */
  param?: string;
  /**
   * Stack trace
   *
   * @type {string}
   * @memberof ILogMessage
   */
  stack?: string;
  /**
   * Stack trace
   *
   * @type {string}
   * @memberof ILogMessage
   */
  error?: Error;
}

/**
 * Logger service
 */
@singleton()
export class LoggerService {
  /**
   * LoggerService
   *
   * @static
   * @type {LoggerService}
   * @memberof LoggerService
   */
  public static self: LoggerService;

  /**
   * Loggers
   *
   * @private
   * @type {Array<ILogger>}
   * @memberof LoggerService
   */
  private loggers: Array<ILogger> = [];

  /**
   * Creates an instance of LoggerService.
   * @memberof LoggerService
   */
  constructor() {
    LoggerService.self = this;
    LoggerService.self.loggers = new Array<ILogger>();
  }

  /**
   * Logging for trace
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public trace(log: ILogMessage | string): void {
    LoggerService.self.writeLog('TRACE', this.parseStringMessage(log));
  }

  /**
   * Logging for debug
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public debug(log: ILogMessage | string): void {
    LoggerService.self.writeLog('DEBUG', this.parseStringMessage(log));
  }

  /**
   * Logging for info
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public info(log: ILogMessage | string): void {
    LoggerService.self.writeLog('INFO', this.parseStringMessage(log));
  }

  /**
   * Logging for log
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public log(log: ILogMessage | string): void {
    LoggerService.self.writeLog('LOG', this.parseStringMessage(log));
  }

  /**
   * Logging for warning
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public warn(log: ILogMessage | string): void {
    LoggerService.self.writeLog('WARN', this.parseStringMessage(log));
  }

  /**
   * Logging for error
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public error(log: ILogMessage | string): void {
    this.createLogWithStackTrace('ERROR', log);
  }

  /**
   * Logging for error
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public systemError(log: ILogMessage | string): void {
    this.createLogWithStackTrace('SYSTEM_ERROR', log);
  }

  /**
   * Create log with stack trace
   *
   * @private
   * @param {string} logType
   * @param {(ILogMessage | string)} log
   * @memberof LoggerService
   */
  private createLogWithStackTrace(
    logType: string,
    log: ILogMessage | string
  ): void {
    const formatLog = this.parseStringMessage(log);
    (async () => {
      const stackTrace = formatLog.error
        ? await StackTrace.fromError(formatLog.error, {
            offline: true
          })
        : await StackTrace.get({
            offline: true
          });
      const stringifiedStack = stackTrace.join('\n');
      formatLog.stack = stringifiedStack;
      LoggerService.self.writeLog(logType, formatLog);
    })();
  }

  /**
   * Logging for event
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public event(log: ILogMessage | string): void {
    LoggerService.self.writeLog('EVENT', this.parseStringMessage(log));
  }

  /**
   * Logging for event
   *
   * @param {ILogMessage} log log message
   * @memberof LoggerService
   */
  public tapEvent(log: ILogMessage | string): void {
    LoggerService.self.writeLog('TAP_EVENT', this.parseStringMessage(log));
  }

  /**
   * Add the logger.
   *
   * @param {ILogger} logger logger
   * @memberof LoggerService
   */
  public addLogger(logger: ILogger): void {
    LoggerService.self.loggers.push(logger);
  }

  /**
   * parse string messages
   *
   * @private
   * @param {(ILogMessage | string)} log
   * @returns {ILogMessage}
   * @memberof LoggerService
   */
  private parseStringMessage(log: ILogMessage | string): ILogMessage {
    if (typeof log === 'string' || log instanceof String) {
      return { message: log.toString() };
    }
    return log;
  }

  /**
   * Write a log message.
   *
   * @private
   * @param {string} level log level
   * @param {ILogMessage} log log message
   * @returns {any}
   * @memberof LoggerService
   */
  private writeLog(level: string, log: ILogMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const now = new Date(Date.now());
        LoggerService.self.loggers.forEach(e => e.write(now, level, log));
        resolve();
      } catch (error) {
        reject();
      }
    });
  }
}
