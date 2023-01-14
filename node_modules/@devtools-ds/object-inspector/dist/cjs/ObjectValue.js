"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectValue = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _themes = require("@devtools-ds/themes");
var _objectParser = require("@devtools-ds/object-parser");
var _ObjectInspector = _interopRequireDefault(require("./ObjectInspector.css"));
const _excluded = ["ast", "theme", "showKey", "colorScheme", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  return /*#__PURE__*/_react.default.createElement("span", {
    className: _ObjectInspector.default.text
  }, !isRoot && showKey && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: _ObjectInspector.default.key
  }, computedKey), /*#__PURE__*/_react.default.createElement("span", null, ":\xA0")), /*#__PURE__*/_react.default.createElement("span", {
    className: valueClass
  }, value));
};

/** Display a leaf key-value pair with appropriate styles. */
const ObjectValue = props => {
  const {
      ast,
      theme,
      showKey,
      colorScheme,
      className
    } = props,
    html = (0, _objectWithoutProperties2.default)(props, _excluded);
  const {
    themeClass
  } = (0, _themes.useTheme)({
    theme,
    colorScheme
  }, _ObjectInspector.default);
  const [asyncValue, setAsyncValue] = (0, _react.useState)( /*#__PURE__*/_react.default.createElement("span", null));
  let value = /*#__PURE__*/_react.default.createElement("span", null);

  /** Handle async types once */
  (0, _react.useEffect)(() => {
    if (ast.value instanceof Promise) {
      /** Async function to wait for Promise.race */
      const waitForPromiseResult = async promise => {
        setAsyncValue(buildValue(ast.key, `Promise { "${await (0, _objectParser.getPromiseState)(promise)}" }`, _ObjectInspector.default.key, showKey, ast.depth));
      };
      waitForPromiseResult(ast.value);
    }
  }, [ast, showKey]);
  if (typeof ast.value === "number" || typeof ast.value === "bigint") {
    // Number
    value = buildValue(ast.key, String(ast.value), _ObjectInspector.default.number, showKey, ast.depth);
  } else if (typeof ast.value === "boolean") {
    // Boolean
    value = buildValue(ast.key, String(ast.value), _ObjectInspector.default.boolean, showKey, ast.depth);
  } else if (typeof ast.value === "string") {
    // String
    value = buildValue(ast.key, `"${ast.value}"`, _ObjectInspector.default.string, showKey, ast.depth);
  } else if (typeof ast.value === "undefined") {
    // Undefined
    value = buildValue(ast.key, "undefined", _ObjectInspector.default.undefined, showKey, ast.depth);
  } else if (typeof ast.value === "symbol") {
    // Symbol
    value = buildValue(ast.key, ast.value.toString(), _ObjectInspector.default.string, showKey, ast.depth);
  } else if (typeof ast.value === "function") {
    // Function
    value = buildValue(ast.key, `${ast.value.name}()`, _ObjectInspector.default.key, showKey, ast.depth);
  } else if (typeof ast.value === "object") {
    if (ast.value === null) {
      // Null
      value = buildValue(ast.key, "null", _ObjectInspector.default.null, showKey, ast.depth);
    } else if (Array.isArray(ast.value)) {
      // Array
      value = buildValue(ast.key, `Array(${ast.value.length})`, _ObjectInspector.default.key, showKey, ast.depth);
    } else if (ast.value instanceof Date) {
      // Date
      value = buildValue(ast.key, `Date ${ast.value.toString()}`, _ObjectInspector.default.value, showKey, ast.depth);
    } else if (ast.value instanceof RegExp) {
      // RegExp
      value = buildValue(ast.key, ast.value.toString(), _ObjectInspector.default.regex, showKey, ast.depth);
    } else if (ast.value instanceof Error) {
      // Error
      value = buildValue(ast.key, ast.value.toString(), _ObjectInspector.default.error, showKey, ast.depth);
    } else if ((0, _objectParser.isObject)(ast.value)) {
      // Object
      value = buildValue(ast.key, "{…}", _ObjectInspector.default.key, showKey, ast.depth);
    } else {
      // WeakMap, WeakSet, Custom Classes, etc
      value = buildValue(ast.key, ast.value.constructor.name, _ObjectInspector.default.key, showKey, ast.depth);
    }
  }
  return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
    className: (0, _clsx.default)(themeClass, className)
  }, html), asyncValue, value);
};
exports.ObjectValue = ObjectValue;
ObjectValue.defaultProps = {
  showKey: true
};
var _default = ObjectValue;
exports.default = _default;
//# sourceMappingURL=ObjectValue.js.map