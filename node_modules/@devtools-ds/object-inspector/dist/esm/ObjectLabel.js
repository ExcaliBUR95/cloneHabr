import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["ast", "theme", "previewMax", "open", "colorScheme", "className"];
import React from "react";
import makeClass from "clsx";
import { useTheme } from "@devtools-ds/themes";
import ObjectValue from "./ObjectValue";
import styles from "./ObjectInspector.css";
/** Build a list of previews */
const buildPreview = (children, previewMax, showKey) => {
  const previews = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child.isPrototype) {
      previews.push( /*#__PURE__*/React.createElement(ObjectValue, {
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
    return /*#__PURE__*/React.createElement("span", null, "Array(", l, ")");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, `${theme === "firefox" ? "Array" : ""}(${l}) [ `), buildPreview(ast.children, previewMax, false), /*#__PURE__*/React.createElement("span", null, "]"));
};

/** Get the label for an object */
const getObjectLabel = (ast, open, previewMax, theme) => {
  if (ast.isPrototype) {
    return /*#__PURE__*/React.createElement("span", null, `Object ${theme === "firefox" ? "{ … }" : ""}`);
  }
  if (open) {
    return /*#__PURE__*/React.createElement("span", null, "{…}");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, `${theme === "firefox" ? "Object " : ""}{ `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/React.createElement("span", null, "}"));
};

/** Get the label for a Promise */
const getPromiseLabel = (ast, open, previewMax) => {
  if (open) {
    return /*#__PURE__*/React.createElement("span", null, `Promise { "${String(ast.children[0].value)}" }`);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, `Promise { `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/React.createElement("span", null, "}"));
};

/** Get the label for a Map */
const getMapLabel = (ast, open, previewMax, theme) => {
  const {
    size
  } = ast.value;
  if (open) {
    return /*#__PURE__*/React.createElement("span", null, `Map(${size})`);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, `Map${theme === "chrome" ? `(${size})` : ""} { `), buildPreview(ast.children, previewMax, true), /*#__PURE__*/React.createElement("span", null, "}"));
};

/** Get the label for a Set */
const getSetLabel = (ast, open, previewMax) => {
  const {
    size
  } = ast.value;
  if (open) {
    return /*#__PURE__*/React.createElement("span", null, "Set(", size, ")");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, `Set(${ast.value.size}) {`), buildPreview(ast.children, previewMax, true), /*#__PURE__*/React.createElement("span", null, "}"));
};

/** Create a styled label for an object, with previews of the object contents. */
export const ObjectLabel = props => {
  const {
      ast,
      theme,
      previewMax,
      open,
      colorScheme,
      className
    } = props,
    html = _objectWithoutProperties(props, _excluded);
  const {
    themeClass,
    currentTheme
  } = useTheme({
    theme,
    colorScheme
  }, styles);
  const isPrototype = ast.isPrototype || false;
  const classes = makeClass(styles.objectLabel, themeClass, className, {
    [styles.prototype]: isPrototype
  });
  const isRoot = ast.depth <= 0;

  /** The key for the node */
  const Key = () => {
    return /*#__PURE__*/React.createElement("span", {
      className: isPrototype ? styles.prototype : styles.key
    }, isRoot ? "" : `${ast.key}: `);
  };
  if (ast.type === "array") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classes
    }, html), /*#__PURE__*/React.createElement(Key, null), getArrayLabel(ast, open, previewMax, currentTheme));
  }
  if (ast.type === "function") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classes
    }, html), /*#__PURE__*/React.createElement(Key, null), currentTheme === "chrome" && /*#__PURE__*/React.createElement("span", {
      className: styles.functionDecorator
    }, "ƒ "), /*#__PURE__*/React.createElement("span", {
      className: makeClass({
        [styles.function]: !isPrototype
      })
    }, `${ast.value.name}()`));
  }
  if (ast.type === "promise") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classes
    }, html), /*#__PURE__*/React.createElement(Key, null), getPromiseLabel(ast, open, previewMax));
  }
  if (ast.type === "map") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classes
    }, html), /*#__PURE__*/React.createElement(Key, null), getMapLabel(ast, open, previewMax, currentTheme));
  }
  if (ast.type === "set") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classes
    }, html), /*#__PURE__*/React.createElement(Key, null), getSetLabel(ast, open, previewMax));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, html), /*#__PURE__*/React.createElement(Key, null), getObjectLabel(ast, open, previewMax, currentTheme));
};
ObjectLabel.defaultProps = {
  previewMax: 8,
  open: false
};
export default ObjectLabel;
//# sourceMappingURL=ObjectLabel.js.map