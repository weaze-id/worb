import EventEmitter from "eventemitter3";
import { useEffect, useRef, useState } from "react";

/**
 * Represents a reactive container for a value that can be observed for changes.
 * @template T - The type of value stored in the Orb.
 */
export class Orb<T> {
  private _value: T;
  private _eventEmitter: EventEmitter;

  /**
   * Creates an instance of Orb.
   * @param {T} value - The initial value of the Orb.
   */
  constructor(value: T) {
    this._value = value;
    this._eventEmitter = new EventEmitter();
  }

  /**
   * Gets the current value stored in the Orb.
   * @type {T}
   */
  public get value() {
    return this._value;
  }

  /**
   * Sets a new value for the Orb and emits a change event if the value has changed.
   * @type {T}
   */
  public set value(newValue: T) {
    if (this._value === newValue) {
      return;
    }

    this._value = newValue;
    this._eventEmitter.emit("orb:changed");
  }

  /**
   * Adds a listener function to be notified when the Orb's value changes.
   * @param {() => void} listener - The listener function to be added.
   */
  public addListener(listener: () => void) {
    this._eventEmitter.on("orb:changed", listener);
  }

  /**
   * Removes a previously added listener function from being notified of changes.
   * @param {() => void} listener - The listener function to be removed.
   */
  public removeListener(listener: () => void) {
    this._eventEmitter.removeListener("orb:changed", listener);
  }

  /**
   * Disposes of the Orb by removing all its listeners.
   */
  public dispose() {
    this._eventEmitter.removeAllListeners();
  }
}

/**
 * Creates a new Orb instance with the provided initial value.
 * @template T - The type of value stored in the Orb.
 * @param {T} value - The initial value of the Orb.
 * @returns {Orb<T>} A new Orb instance.
 */
export function createOrb<T>(value: T): Orb<T> {
  return new Orb(value);
}

/**
 * Creates and returns a new Orb instance with the provided initial value.
 * This hook is intended for creating and reusing a single Orb instance.
 * @template T - The type of value stored in the Orb.
 * @param {T} value - The initial value of the Orb.
 * @returns {Orb<T>} The created Orb instance.
 */
export function useCreateOrb<T>(value: T): Orb<T> {
  const orb = useRef(new Orb(value));
  return orb.current;
}

/**
 * Custom React hook that allows observing and updating the value of an Orb.
 * @template T - The type of value stored in the Orb.
 * @param {Orb<T>} orb - The Orb instance to be observed.
 * @returns {[T, (value: T) => void]} A tuple containing the current value and a function to update the value.
 */
export const useOrb = <T>(orb: Orb<T>): [T, (value: T) => void] => {
  const [state, setState] = useState(orb.value);

  useEffect(() => {
    const orbListener = () => {
      setState(orb.value);
    };

    orb.addListener(orbListener);

    return () => {
      orb.removeListener(orbListener);
    };
  }, [orb]);

  /**
   * Updates the value stored in the Orb instance.
   * @param {T} value - The new value to be set in the Orb.
   */
  const setValue = (value: T) => {
    orb.value = value;
  };

  return [state, setValue];
};
