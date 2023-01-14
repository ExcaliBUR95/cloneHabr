"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectInspector = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _objectParser = require("@devtools-ds/object-parser");
var _themes = require("@devtools-ds/themes");
var _ObjectInspectorItem = _interopRequireDefault(require("./ObjectInspectorItem"));
var _ObjectInspector = _interopRequireDefault(require("./ObjectInspector.css"));
const _excluded = ["data", "expandLevel", "sortKeys", "includePrototypes", "className", "theme", "colorScheme", "onSelect"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** An emulation of browsers JSON object inspector. */
const ObjectInspector = props => {
  const {
      data,
      expandLevel,
      sortKeys,
      includePrototypes,
      className,
      theme,
      colorScheme,
      onSelect
    } = props,
    html = (0, _objectWithoutProperties2.default)(props, _excluded);
  const [ast, setAST] = (0, _react.useState)(undefined);
  const {
    themeClass,
    currentTheme,
    currentColorScheme
  } = (0, _themes.useTheme)({
    theme,
    colorScheme
  }, _ObjectInspector.default);

  /** Handle async types */
  (0, _react.useEffect)(() => {
    /** Async function run the parser */
    const runParser = async () => {
      setAST(await (0, _objectParser.parse)(data, sortKeys, includePrototypes));
    };
    runParser();
  }, [data, sortKeys, includePrototypes]);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(_ObjectInspector.default.objectInspector, className, themeClass)
  }, html), ast && /*#__PURE__*/_react.default.createElement(_themes.ThemeProvider, {
    theme: currentTheme,
    colorScheme: currentColorScheme
  }, /*#__PURE__*/_react.default.createElement(_ObjectInspectorItem.default, {
    ast: ast,
    expandLevel: expandLevel,
    onSelect: onSelect
  })));
};
exports.ObjectInspector = ObjectInspector;
ObjectInspector.defaultProps = {
  expandLevel: 0,
  sortKeys: true,
  includePrototypes: true
};
var _default = ObjectInspector;
exports.default = _default;
//# sourceMappingURL=ObjectInspector.js.map