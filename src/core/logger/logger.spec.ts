/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { AbstractLogger } from './logger';
import { Levels } from './logger.service';

// Mock implementation of ILogMessage
const mockLogMessage = {
  message: 'Test log message'
  // Add other properties as needed
};

describe('AbstractLogger', () => {
  class TestLogger extends AbstractLogger {
    public write(datetime: Date, level: string, log: any): void {
      // Mock implementation of write method
      console.log(`${datetime.toISOString()} [${level}]: ${log.message}`);
    }
  }

  test('should create an instance of AbstractLogger', () => {
    const logger = new TestLogger('INFO');
    expect(logger).toBeInstanceOf(AbstractLogger);
  });

  test('should get log level correctly', () => {
    const logger = new TestLogger('INFO|DEBUG');
    expect(logger.logLevel[Levels.findIndex(level => level === 'INFO')]).toBe(
      true
    );
    expect(logger.logLevel[Levels.findIndex(level => level === 'DEBUG')]).toBe(
      true
    );
  });

  test('should throw error for invalid log level', () => {
    expect(() => new TestLogger('INVALID')).toThrow(
      'The log level is invalid.[INVALID]'
    );
  });

  test('should write log message', () => {
    const logger = new TestLogger('INFO');
    const consoleSpy = vi.spyOn(console, 'log');
    const datetime = new Date();
    logger.write(datetime, 'INFO', mockLogMessage);
    expect(consoleSpy).toHaveBeenCalledWith(
      `${datetime.toISOString()} [INFO]: ${mockLogMessage.message}`
    );
    consoleSpy.mockRestore();
  });
});
