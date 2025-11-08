// Type definitions for iblokz-data
// Project: https://github.com/iblokz/data
// Definitions by: iblokz-data contributors

/**
 * Array utilities for immutable operations
 */
export namespace arr {
  /**
   * Immutably adds an item to an array
   */
  export function add<T>(arr: T[], item: T): T[];
  
  /**
   * Immutably removes the first occurrence of an item from an array
   */
  export function remove<T>(arr: T[], item: T): T[];
  
  /**
   * Immutably toggles an item in an array
   */
  export function toggle<T>(arr: T[], item: T): T[];
  
  /**
   * Checks if an array or comma-separated string contains an element
   */
  export function contains<T>(a: T[] | string, el: T): boolean;
}

/**
 * Object utilities for immutable operations
 */
export namespace obj {
  /**
   * Creates an object with a single key-value pair
   */
  export function keyValue<T>(k: string, v: T): { [key: string]: T };
  
  /**
   * Checks if a value is a plain object literal
   */
  export function isLiteral(o: any): boolean;
  
  /**
   * Creates a shallow clone of an object
   */
  export function clone<T extends object>(o: T): T;
  
  /**
   * Gets a nested value from an object using a path
   */
  export function sub<T>(o: any, p: string | string[]): T | undefined;
  
  /**
   * Immutably updates a value in an object at a given path
   */
  export function patch<T extends object>(o: T, k: string | string[], v: any): T;
  
  /**
   * Reduces an object to a single value
   */
  export function reduce<T, R>(
    o: { [key: string]: T },
    reduceFn: (accumulator: R, key: string, value: T, index: number, originalObject: { [key: string]: T }) => R,
    initial?: R
  ): R;
  
  /**
   * Immutably maps over an object's values
   */
  export function map<T, R>(
    o: { [key: string]: T },
    mapFn: (key: string, value: T, index: number, originalObject: { [key: string]: T }) => R
  ): { [key: string]: R };
  
  /**
   * Immutably filters an object's properties
   */
  export function filter<T>(
    o: { [key: string]: T },
    filterFn: (key: string, value: T, index: number, originalObject: { [key: string]: T }) => boolean
  ): { [key: string]: T };
  
  /**
   * Recursively traverses an object tree
   */
  export function traverse<T extends object>(
    tree: T,
    fn: (key: string, value: any, index: number, parent: any) => any
  ): T;
  
  /**
   * Chains multiple method calls on an object
   */
  export function chainCall<T>(o: T, chain: [string, ...any[]][]): any;
  
  /**
   * Pattern matching utility
   */
  export function switch<T>(value: any, cases: { [key: string]: T }): T | false;
}

/**
 * String utilities
 */
export namespace str {
  /**
   * Capitalizes the first character of a string
   */
  export function capitalize(chunk: string): string;
  
  /**
   * Converts a string to camelCase
   */
  export function toCamelCase(str: string, glue?: string): string;
  
  /**
   * Converts a camelCase string to a delimited format
   */
  export function fromCamelCase(str: string, glue?: string): string;
  
  /**
   * Converts a singular word to plural
   */
  export function singularToPlural(str: string): string;
  
  /**
   * Converts a plural word to singular
   */
  export function pluralToSingular(str: string): string;
  
  /**
   * Converts a string to document ID format
   */
  export function toDocumentId(str: string, glue?: string, suffix?: string, prefix?: string): string;
}

/**
 * Function composition utilities
 */
export namespace fn {
  /**
   * Creates a left-to-right function composition pipeline
   */
  export function pipe<A extends any[], B>(
    ab: (...args: A) => B
  ): (...args: A) => B;
  export function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
  ): (...args: A) => C;
  export function pipe<A extends any[], B, C, D>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
  ): (...args: A) => D;
  export function pipe<A extends any[], B, C, D, E>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): (...args: A) => E;
  export function pipe<A extends any[], B, C, D, E, F>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): (...args: A) => F;
  
  /**
   * Creates a right-to-left function composition
   */
  export function compose<A extends any[], B>(
    ab: (...args: A) => B
  ): (...args: A) => B;
  export function compose<A extends any[], B, C>(
    bc: (b: B) => C,
    ab: (...args: A) => B
  ): (...args: A) => C;
  export function compose<A extends any[], B, C, D>(
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (...args: A) => B
  ): (...args: A) => D;
  export function compose<A extends any[], B, C, D, E>(
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (...args: A) => B
  ): (...args: A) => E;
  export function compose<A extends any[], B, C, D, E, F>(
    ef: (e: E) => F,
    de: (d: D) => E,
    cd: (c: C) => D,
    bc: (b: B) => C,
    ab: (...args: A) => B
  ): (...args: A) => F;
  
  /**
   * Pattern matching utility (alias to obj.switch)
   */
  export function switch<T>(value: any, cases: { [key: string]: T }): T | false;
}

