import { describe, expect, test, vi, beforeEach } from 'vitest';
import { LoggerService, ILogMessage } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  test('should initialize with no loggers', () => {
    expect(loggerService['loggers'].length).toBe(0);
  });

  test('should add a logger', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    expect(loggerService['loggers'].length).toBe(1);
  });

  test('should log trace message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'trace message' };
    loggerService.trace(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'TRACE',
      logMessage
    );
  });

  test('should log debug message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'debug message' };
    loggerService.debug(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'DEBUG',
      logMessage
    );
  });

  test('should log info message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'info message' };
    loggerService.info(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'INFO',
      logMessage
    );
  });

  test('should log warn message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'warn message' };
    loggerService.warn(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'WARN',
      logMessage
    );
  });

  test('should log event message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'event message' };
    loggerService.event(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'EVENT',
      logMessage
    );
  });

  test('should log tap event message', () => {
    const mockLogger = { write: vi.fn() };
    loggerService.addLogger(mockLogger);
    const logMessage: ILogMessage = { message: 'tap event message' };
    loggerService.tapEvent(logMessage);
    expect(mockLogger.write).toHaveBeenCalledWith(
      expect.any(Date),
      'TAP_EVENT',
      logMessage
    );
  });
});
