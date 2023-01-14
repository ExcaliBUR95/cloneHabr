"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectLabel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _themes = require("@devtools-ds/themes");
var _ObjectValue = _interopRequireDefault(require("./ObjectValue"));
var _ObjectInspector = _interopRequireDefault(require("./ObjectInspector.css"));
const _excluded = ["ast", "theme", "previewMax", "open", "colorScheme", "className"];
/** Build a list of previews */
const buildPreview = (children, previewMax, showKey) => {
  const previews = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child.isPrototype) {
      previews.push( /*#__PURE__*/_react.default.createElement(_ObjectValue.default, {
        key: child.key,
        ast: child,
        showKey: showKey
      }));
      if (i < children.length - 1) {
        previews.push(", ");
      } else {
        previews.push(" ");
      }
    }
    if (child.isPrototype && i === children.length - 1) {
      previews.pop();
      previews.push(" ");
    }

    // Add ellipsis if needed
    if (i === previewMax - 1 && children.length > previewMax) {
      previews.push("… ");
      break;
    }
  }
  return previews;
};

/** Get the label for an array */
const getArrayLabel = (ast, open, previewMax, theme) => {
  const l = ast.value.length;
  if (open) {
    return /*#__PURE__*/_react.default.createElement("span", null, "Array(", l, ")");
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, `${theme === "firefox" ? "Array" : ""}(${l}) [ `), buildPreview(ast.children, previewMax, false), /*#__PURE__*/_react.default.createElement("span", null, "]"));
};

/** Get the label for an object */
const getObjectLabel = (ast, open, previewMax, theme) => {
  if (ast.isPrototype) {
    return /*#__PURE__*/_react.default.createElement("span", null, `Object ${theme === "firefox" ? "{ … }" : ""}`);
  }
  if (open) {
    return /*#__PURE__*/_react.default.createElement("span", null, "{…}");
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, `${theme === "firefox" ? "Object " : ""}{ `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/_react.default.createElement("span", null, "}"));
};

/** Get the label for a Promise */
const getPromiseLabel = (ast, open, previewMax) => {
  if (open) {
    return /*#__PURE__*/_react.default.createElement("span", null, `Promise { "${String(ast.children[0].value)}" }`);
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, `Promise { `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/_react.default.createElement("span", null, "}"));
};

/** Get the label for a Map */
const getMapLabel = (ast, open, previewMax, theme) => {
  const {
    size
  } = ast.value;
  if (open) {
    return /*#__PURE__*/_react.default.createElement("span", null, `Map(${size})`);
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, `Map${theme === "chrome" ? `(${size})` : ""} { `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/_react.default.createElement("span", null, "}"));
};

/** Get the label for a Set */
const getSetLabel = (ast, open, previewMax) => {
  const {
    size
  } = ast.value;
  if (open) {
    return /*#__PURE__*/_react.default.createElement("span", null, "Set(", size, ")");
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, `Set(${ast.value.size}) {`), buildPreview(ast.children, previewMax, true), /*#__PURE__*/_react.default.createElement("span", null, "}"));
};

/** Create a styled label for an object, with previews of the object contents. */
const ObjectLabel = props => {
  const {
      ast,
      theme,
      previewMax,
      open,
      colorScheme,
      className
    } = props,
    html = (0, _objectWithoutProperties2.default)(props, _excluded);
  const {
    themeClass,
    currentTheme
  } = (0, _themes.useTheme)({
    theme,
    colorScheme
  }, _ObjectInspector.default);
  const isPrototype = ast.isPrototype || false;
  const classes = (0, _clsx.default)(_ObjectInspector.default.objectLabel, themeClass, className, {
    [_ObjectInspector.default.prototype]: isPrototype
  });
  const isRoot = ast.depth <= 0;

  /** The key for the node */
  const Key = () => {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: isPrototype ? _ObjectInspector.default.prototype : _ObjectInspector.default.key
    }, isRoot ? "" : `${ast.key}: `);
  };
  if (ast.type === "array") {
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
      className: classes
    }, html), /*#__PURE__*/_react.default.createElement(Key, null), getArrayLabel(ast, open, previewMax, currentTheme));
  }
  if (ast.type === "function") {
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
      className: classes
    }, html), /*#__PURE__*/_react.default.createElement(Key, null), currentTheme === "chrome" && /*#__PURE__*/_react.default.createElement("span", {
      className: _ObjectInspector.default.functionDecorator
    }, "ƒ "), /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _clsx.default)({
        [_ObjectInspector.default.function]: !isPrototype
      })
    }, `${ast.value.name}()`));
  }
  if (ast.type === "promise") {
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
      className: classes
    }, html), /*#__PURE__*/_react.default.createElement(Key, null), getPromiseLabel(ast, open, previewMax));
  }
  if (ast.type === "map") {
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
      className: classes
    }, html), /*#__PURE__*/_react.default.createElement(Key, null), getMapLabel(ast, open, previewMax, currentTheme));
  }
  if (ast.type === "set") {
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
      className: classes
    }, html), /*#__PURE__*/_react.default.createElement(Key, null), getSetLabel(ast, open, previewMax));
  }
  return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
    className: classes
  }, html), /*#__PURE__*/_react.default.createElement(Key, null), getObjectLabel(ast, open, previewMax, currentTheme));
};
exports.ObjectLabel = ObjectLabel;
ObjectLabel.defaultProps = {
  previewMax: 8,
  open: false
};
var _default = ObjectLabel;
exports.default = _default;
//# sourceMappingURL=ObjectLabel.js.map