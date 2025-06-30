import { container } from 'tsyringe';
import { LoggerService } from '../logger/logger.service';

/**
 * Classのトレースログを吐き出すDecorator
 *
 * @export
 * @return {*}
 */
export function Trace() {
  return (target: unknown) => {
    if (!(target instanceof Function)) {
      return;
    }
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName
      );

      if (!descriptor) {
        continue;
      }

      const originalMethod = descriptor.value;

      const isMethod = originalMethod instanceof Function;

      if (!isMethod) {
        continue;
      }

      descriptor.value = function (...args: unknown[]) {
        container
          .resolve(LoggerService)
          .trace(`[${target.name}][${propertyName}] Entering`);

        const now = Date.now();
        const result = originalMethod.apply(this, args);

        const exitLog = () => {
          container
            .resolve(LoggerService)
            .trace(
              `[${target.name}][${propertyName}] Exiting ${Date.now() - now}ms`
            );
        };

        if (typeof result === 'object' && typeof result.then === 'function') {
          const promise = result.then(exitLog);

          if (typeof promise.catch === 'function') {
            promise.catch((e: unknown) => e);
          }
        } else {
          exitLog();
        }

        return result;
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}
