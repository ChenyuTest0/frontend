export interface Listener<T> {
  (event: T): unknown;
}

export interface Disposable {
  dispose(): unknown;
}

export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOunces: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  };

  once = (listener: Listener<T>): void => {
    this.listenersOunces.push(listener);
  };

  off = (listener: Listener<T>) => {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  };

  emit = (event: T) => {
    /** Update any general listeners */
    this.listeners.forEach(listener => listener(event));

    /** Clear the `once` queue */
    this.listenersOunces.forEach(listener => listener(event));
    this.listenersOunces = [];
  };

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on(e => te.emit(e));
  };
}
