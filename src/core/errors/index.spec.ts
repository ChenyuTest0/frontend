/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test } from 'vitest';
import {
  ApplicationError,
  NetworkError,
  MaintenanceError,
  AuthenticationError,
  ApiValidationError,
  ApiSystemError,
  ValidationError
} from './index';

describe('Error Classes', () => {
  describe('ApplicationError', () => {
    test('should create an instance of ApplicationError', () => {
      const error = new ApplicationError(
        'Test message',
        'Business message',
        'Business title'
      );
      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.message).toBe('Test message');
      expect(error.businessMessage).toBe('Business message');
      expect(error.businessMessageTitle).toBe('Business title');
    });

    test('should return correct string representation', () => {
      const error = new ApplicationError('Test message');
      expect(error.toString()).toBe('ApplicationError: Test message');
    });
  });

  describe('NetworkError', () => {
    test('should create an instance of NetworkError', () => {
      const httpError = { response: { status: 404, statusText: 'Not Found' } };
      const error = new NetworkError(
        httpError,
        'Business message',
        'Business title'
      );
      expect(error).toBeInstanceOf(NetworkError);
      expect(error.message).toBe('Not Found');
      expect(error.code).toBe(404);
    });
  });

  describe('MaintenanceError', () => {
    test('should create an instance of MaintenanceError', () => {
      const httpError = {
        response: { status: 503, statusText: 'Service Unavailable' }
      };
      const error = new MaintenanceError(httpError);
      expect(error).toBeInstanceOf(MaintenanceError);
      expect(error.message).toBe('Service Unavailable');
      expect(error.code).toBe(503);
    });
  });

  describe('AuthenticationError', () => {
    test('should create an instance of AuthenticationError', () => {
      const httpError = {
        response: { status: 401, statusText: 'Unauthorized' }
      };
      const error = new AuthenticationError(httpError);
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe('Unauthorized');
      expect(error.code).toBe(401);
    });
  });

  describe('ApiValidationError', () => {
    test('should create an instance of ApiValidationError', () => {
      const validationError: ValidationError = {
        error: 'Validation Error',
        fields: [{ field: 'username', message: 'Username is required' }],
        global: [{ message: 'Global error message' }]
      };
      const httpError = {
        response: {
          status: 400,
          statusText: 'Bad Request',
          data: validationError
        }
      };
      const error = new ApiValidationError(httpError);
      expect(error).toBeInstanceOf(ApiValidationError);
      expect(error.message).toBe('');
      expect(error.code).toBe(400);
      expect(error.validationError).toBe(validationError);
    });
  });

  describe('ApiSystemError', () => {
    test('should create an instance of ApiSystemError', () => {
      const httpError = {
        response: { status: 500, statusText: 'Internal Server Error' }
      };
      const error = new ApiSystemError(httpError);
      expect(error).toBeInstanceOf(ApiSystemError);
      expect(error.message).toBe('Internal Server Error');
      expect(error.code).toBe(500);
    });
  });
});
