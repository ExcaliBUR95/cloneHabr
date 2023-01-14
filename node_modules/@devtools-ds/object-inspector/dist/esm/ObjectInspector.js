import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["data", "expandLevel", "sortKeys", "includePrototypes", "className", "theme", "colorScheme", "onSelect"];
import React, { useEffect, useState } from "react";
import makeClass from "clsx";
import { parse } from "@devtools-ds/object-parser";
import { useTheme, ThemeProvider } from "@devtools-ds/themes";
import ObjectInspectorItem from "./ObjectInspectorItem";
import styles from "./ObjectInspector.css";
/** An emulation of browsers JSON object inspector. */
export const ObjectInspector = props => {
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
    html = _objectWithoutProperties(props, _excluded);
  const [ast, setAST] = useState(undefined);
  const {
    themeClass,
    currentTheme,
    currentColorScheme
  } = useTheme({
    theme,
    colorScheme
  }, styles);

  /** Handle async types */
  useEffect(() => {
    /** Async function run the parser */
    const runParser = async () => {
      setAST(await parse(data, sortKeys, includePrototypes));
    };
    runParser();
  }, [data, sortKeys, includePrototypes]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: makeClass(styles.objectInspector, className, themeClass)
  }, html), ast && /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: currentTheme,
    colorScheme: currentColorScheme
  }, /*#__PURE__*/React.createElement(ObjectInspectorItem, {
    ast: ast,
    expandLevel: expandLevel,
    onSelect: onSelect
  })));
};
ObjectInspector.defaultProps = {
  expandLevel: 0,
  sortKeys: true,
  includePrototypes: true
};
export default ObjectInspector;
//# sourceMappingURL=ObjectInspector.js.map