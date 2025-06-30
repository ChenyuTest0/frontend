/**
 * timeout decorator
 *
 * @export
 * @param {number} [milliseconds=0]
 * @returns
 */
export function Timeout(milliseconds = 0): unknown {
  return (_target: unknown, _name: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]): void {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, milliseconds);
    };

    return descriptor;
  };
}
