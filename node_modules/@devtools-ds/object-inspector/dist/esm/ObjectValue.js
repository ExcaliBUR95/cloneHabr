import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["ast", "theme", "showKey", "colorScheme", "className"];
import React, { useState, useEffect } from "react";
import makeClass from "clsx";
import { useTheme } from "@devtools-ds/themes";
import { isObject, getPromiseState } from "@devtools-ds/object-parser";
import styles from "./ObjectInspector.css";
/**
 * Build the key and value spans
 *
 * @param key - The key string
 * @param value - The value string
 * @param valueClass - The class to apply to the value
 * @param showKey - Whether or not to show the key with the value
 * @param depth - Current depth (so we don't put a key on root)
 */
const buildValue = (key, value, valueClass, showKey, depth) => {
  const computedKey = key.includes("-") ? `"${key}"` : key;
  const isRoot = depth <= 0;
  return /*#__PURE__*/React.createElement("span", {
    className: styles.text
  }, !isRoot && showKey && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: styles.key
  }, computedKey), /*#__PURE__*/React.createElement("span", null, ":\xA0")), /*#__PURE__*/React.createElement("span", {
    className: valueClass
  }, value));
};

/** Display a leaf key-value pair with appropriate styles. */
export const ObjectValue = props => {
  const {
      ast,
      theme,
      showKey,
      colorScheme,
      className
    } = props,
    html = _objectWithoutProperties(props, _excluded);
  const {
    themeClass
  } = useTheme({
    theme,
    colorScheme
  }, styles);
  const [asyncValue, setAsyncValue] = useState( /*#__PURE__*/React.createElement("span", null));
  let value = /*#__PURE__*/React.createElement("span", null);

  /** Handle async types once */
  useEffect(() => {
    if (ast.value instanceof Promise) {
      /** Async function to wait for Promise.race */
      const waitForPromiseResult = async promise => {
        setAsyncValue(buildValue(ast.key, `Promise { "${await getPromiseState(promise)}" }`, styles.key, showKey, ast.depth));
      };
      waitForPromiseResult(ast.value);
    }
  }, [ast, showKey]);
  if (typeof ast.value === "number" || typeof ast.value === "bigint") {
    // Number
    value = buildValue(ast.key, String(ast.value), styles.number, showKey, ast.depth);
  } else if (typeof ast.value === "boolean") {
    // Boolean
    value = buildValue(ast.key, String(ast.value), styles.boolean, showKey, ast.depth);
  } else if (typeof ast.value === "string") {
    // String
    value = buildValue(ast.key, `"${ast.value}"`, styles.string, showKey, ast.depth);
  } else if (typeof ast.value === "undefined") {
    // Undefined
    value = buildValue(ast.key, "undefined", styles.undefined, showKey, ast.depth);
  } else if (typeof ast.value === "symbol") {
    // Symbol
    value = buildValue(ast.key, ast.value.toString(), styles.string, showKey, ast.depth);
  } else if (typeof ast.value === "function") {
    // Function
    value = buildValue(ast.key, `${ast.value.name}()`, styles.key, showKey, ast.depth);
  } else if (typeof ast.value === "object") {
    if (ast.value === null) {
      // Null
      value = buildValue(ast.key, "null", styles.null, showKey, ast.depth);
    } else if (Array.isArray(ast.value)) {
      // Array
      value = buildValue(ast.key, `Array(${ast.value.length})`, styles.key, showKey, ast.depth);
    } else if (ast.value instanceof Date) {
      // Date
      value = buildValue(ast.key, `Date ${ast.value.toString()}`, styles.value, showKey, ast.depth);
    } else if (ast.value instanceof RegExp) {
      // RegExp
      value = buildValue(ast.key, ast.value.toString(), styles.regex, showKey, ast.depth);
    } else if (ast.value instanceof Error) {
      // Error
      value = buildValue(ast.key, ast.value.toString(), styles.error, showKey, ast.depth);
    } else if (isObject(ast.value)) {
      // Object
      value = buildValue(ast.key, "{…}", styles.key, showKey, ast.depth);
    } else {
      // WeakMap, WeakSet, Custom Classes, etc
      value = buildValue(ast.key, ast.value.constructor.name, styles.key, showKey, ast.depth);
    }
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: makeClass(themeClass, className)
  }, html), asyncValue, value);
};
ObjectValue.defaultProps = {
  showKey: true
};
export default ObjectValue;
//# sourceMappingURL=ObjectValue.js.map