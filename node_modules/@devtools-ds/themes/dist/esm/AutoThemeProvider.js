import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["theme", "colorScheme", "autoStyle", "children"];
import React from "react";
import { all } from "./themes";
import { ThemeContext } from "./utils";
const isWindowDefined = typeof window !== "undefined";

/** Determine if the current browser is FireFox */
export const isFirefox = () => {
  var _window, _window$navigator;
  if (isWindowDefined && (_window = window) !== null && _window !== void 0 && (_window$navigator = _window.navigator) !== null && _window$navigator !== void 0 && _window$navigator.userAgent) {
    if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
      return true;
    }
  }
  return false;
};
/**
 * Determine if the user has a "prefers-color-scheme" mode enabled in their browser.
 * This is helpful for detecting if a user prefers dark mode.
 */
const useDarkMode = () => {
  const [darkMode, setDarkMode] = React.useState(isWindowDefined && window ? window.matchMedia("(prefers-color-scheme: dark)").matches : false);
  React.useEffect(() => {
    if (!isWindowDefined) {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    /** Run when the user changes this setting. */
    const changeDarkMode = () => setDarkMode(!darkMode);
    mediaQuery.addListener(changeDarkMode);
    return () => {
      mediaQuery.removeListener(changeDarkMode);
    };
  }, [darkMode]);
  return darkMode;
};

/**
 * A theme provider that automatically detects a users browser and colorScheme.
 * Themes are set for each component using React Context.
 * It also sets the background color and text color to the correct color.
 */
export const AutoThemeProvider = _ref => {
  let {
      theme: propsTheme,
      colorScheme: propsColorScheme,
      autoStyle,
      children
    } = _ref,
    html = _objectWithoutProperties(_ref, _excluded);
  const isDark = useDarkMode();
  const colorScheme = propsColorScheme || (isDark ? "dark" : "light");
  const theme = propsTheme || (isFirefox() ? "firefox" : "chrome");
  const style = {
    backgroundColor: all[theme][colorScheme].backgroundColor,
    color: all[theme][colorScheme].textColor,
    minHeight: "100%",
    width: "100%"
  };
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: {
      theme,
      colorScheme
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    style: autoStyle ? style : undefined
  }, html), children));
};
//# sourceMappingURL=AutoThemeProvider.js.map