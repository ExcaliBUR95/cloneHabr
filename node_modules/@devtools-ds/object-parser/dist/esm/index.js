/** A type to describe objects with all deferred children loaded */

// Object

// Array

// Function

// Promise

// Map

// Set

//

// Leaf Values

/**
 * Determine if the current object is an array.
 */
const isArray = val => {
  return Array.isArray(val) ||
  // Detect https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
  ArrayBuffer.isView(val) && !(val instanceof DataView);
};

/**
 * Determine if a given value is a true javascript object.
 * Ignore Objects that we know how to display as values.
 *
 * @param val - The current object
 */
export const isObject = val => {
  return val !== null && typeof val === "object" && !isArray(val) && !(val instanceof Date) && !(val instanceof RegExp) && !(val instanceof Error) && !(val instanceof WeakMap) && !(val instanceof WeakSet);
};

/** Check for objects we know how to enumerate */
export const isKnownObject = val => {
  return isObject(val) || isArray(val) || typeof val === "function" || val instanceof Promise;
};

/**
 * Get the current state of a promise, and return a result if fulfilled
 *
 * @param promise - A promise to inspect
 */
export const getPromiseState = promise => {
  // Symbols and RegExps are never content-equal
  const unique = /unique/;
  return Promise.race([promise, unique]).then(result => result === unique ? ["pending"] : ["fulfilled", result], e => ["rejected", e]);
};

/**
 * Build the AST recursively
 *
 * @param key - Current node key
 * @param value - Current node value
 * @param depth - Current tree depth
 * @param sortKeys - Whether to sort the keys
 */
const buildAST = async (key, value, depth, sortKeys, isPrototype, showPrototype) => {
  const astNode = {
    key,
    depth,
    value,
    type: "value",
    parent: undefined
  };
  if (value && isKnownObject(value) && depth < 100) {
    const children = [];
    let t = "object";

    // Build Array
    if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        children.push(async () => {
          const child = await buildAST(i.toString(), value[i], depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
      }
      t = "array";
    } else {
      // Get Object Properties
      const keys = Object.getOwnPropertyNames(value);
      if (sortKeys) keys.sort();
      for (let i = 0; i < keys.length; i++) {
        let safeValue;
        try {
          safeValue = value[keys[i]];
        } catch (e) {}
        children.push(async () => {
          const child = await buildAST(keys[i], safeValue, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
      }

      // Change Type for Function
      if (typeof value === "function") {
        t = "function";
      }

      // Handle Promises
      if (value instanceof Promise) {
        const [status, result] = await getPromiseState(value);
        children.push(async () => {
          const child = await buildAST("<state>", status, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
        if (status !== "pending") {
          children.push(async () => {
            const child = await buildAST("<value>", result, depth + 1, sortKeys);
            child.parent = astNode;
            return child;
          });
        }
        t = "promise";
      }

      // Handle Maps
      if (value instanceof Map) {
        const entries = Array.from(value.entries());
        const parsedEntries = entries.map(entry => {
          const [entryKey, entryValue] = entry;
          return {
            "<key>": entryKey,
            "<value>": entryValue
          };
        });
        children.push(async () => {
          const child = await buildAST("<entries>", parsedEntries, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
        children.push(async () => {
          const child = await buildAST("size", value.size, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
        t = "map";
      }

      // Handle Sets
      if (value instanceof Set) {
        const entries = Array.from(value.entries());
        const parsedEntries = entries.map(entry => {
          return entry[1];
        });
        children.push(async () => {
          const child = await buildAST("<entries>", parsedEntries, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
        children.push(async () => {
          const child = await buildAST("size", value.size, depth + 1, sortKeys);
          child.parent = astNode;
          return child;
        });
        t = "set";
      }
    }

    // Handle Object Prototypes
    if (value !== Object.prototype && showPrototype) {
      children.push(async () => {
        const child = await buildAST("<prototype>", Object.getPrototypeOf(value), depth + 1, sortKeys, true);
        child.parent = astNode;
        return child;
      });
    }
    astNode.type = t;
    astNode.children = children;
    astNode.isPrototype = isPrototype;
  }
  return astNode;
};

/**
 * Parse an object in to an AST.
 *
 * @param data - Object to parse.
 */
export const parse = (data, sortKeys, includePrototypes) => {
  const keys = sortKeys === false ? sortKeys : true;
  const prototypes = includePrototypes === false ? includePrototypes : true;
  return buildAST("root", data, 0, keys, undefined, prototypes);
};
export default parse;
//# sourceMappingURL=index.js.map