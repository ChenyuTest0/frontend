/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Define the ILogger interface
 */
import { AllLevel, ILogMessage, Levels, OffLevel } from './logger.service';

/**
 * Interface for logger
 */
export interface ILogger {
  /**
   * Write a log message.
   *
   * @param {Date} datetime date and time for log
   * @param {string} level log level
   * @param {ILogMessage} log log message
   * @memberof ILogger
   */
  write(datetime: Date, level: string, log: ILogMessage): void;
}
/**
 * Define basic logger
 */
export abstract class AbstractLogger implements ILogger {
  /**
   * Index of Levels for Log level
   *
   * @type {any}
   * @memberof AbstractLogger
   */
  public logLevel: any;

  /**
   * Gets the log level
   *
   * @private
   * @param {string} level string of log level
   * @returns {any} indexes of Levels for log level based
   * @memberof AbstractLogger
   */
  private getLogLevel(level: string): any {
    let targetLevels = {} as any;

    level.split('|').forEach(parsedLevel => {
      const i = Levels.findIndex(element => element === parsedLevel);
      if (i === -1) {
        throw new Error('The log level is invalid.[' + level + ']');
      }
      targetLevels[i] = true;
    });
    return targetLevels;
  }

  /**
   * Check the log level for can output or not.
   *
   * @protected
   * @param {string} level log level
   * @returns {boolean} true if log level is valid; otherwise, false.
   * @memberof AbstractLogger
   */
  protected isValid(level: string): boolean {
    if (level === OffLevel) {
      return false;
    }
    if (level === AllLevel) {
      return true;
    }
    const i = Levels.findIndex(element => element === level);
    return this.logLevel[i] ? true : false;
  }

  /**
   * Creates an instance of AbstractLogger.
   * @param {string} level log level
   * @memberof AbstractLogger
   */
  constructor(level: string) {
    this.logLevel = this.getLogLevel(level);
  }

  /**
   * Write a log message.
   *
   * @abstract
   * @param {Date} datetime date and time for log
   * @param {string} level log level
   * @param {ILogMessage} log log message
   * @memberof AbstractLogger
   */
  public abstract write(datetime: Date, level: string, log: ILogMessage): void;
}
