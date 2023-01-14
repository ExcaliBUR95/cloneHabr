"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = exports.AutoThemeProvider = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _themes = require("./themes");
var _utils = require("./utils");
const _excluded = ["theme", "colorScheme", "autoStyle", "children"];
const isWindowDefined = typeof window !== "undefined";

/** Determine if the current browser is FireFox */
const isFirefox = () => {
  var _window, _window$navigator;
  if (isWindowDefined && (_window = window) !== null && _window !== void 0 && (_window$navigator = _window.navigator) !== null && _window$navigator !== void 0 && _window$navigator.userAgent) {
    if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
      return true;
    }
  }
  return false;
};
exports.isFirefox = isFirefox;
/**
 * Determine if the user has a "prefers-color-scheme" mode enabled in their browser.
 * This is helpful for detecting if a user prefers dark mode.
 */
const useDarkMode = () => {
  const [darkMode, setDarkMode] = _react.default.useState(isWindowDefined && window ? window.matchMedia("(prefers-color-scheme: dark)").matches : false);
  _react.default.useEffect(() => {
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
const AutoThemeProvider = _ref => {
  let {
      theme: propsTheme,
      colorScheme: propsColorScheme,
      autoStyle,
      children
    } = _ref,
    html = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  const isDark = useDarkMode();
  const colorScheme = propsColorScheme || (isDark ? "dark" : "light");
  const theme = propsTheme || (isFirefox() ? "firefox" : "chrome");
  const style = {
    backgroundColor: _themes.all[theme][colorScheme].backgroundColor,
    color: _themes.all[theme][colorScheme].textColor,
    minHeight: "100%",
    width: "100%"
  };
  return /*#__PURE__*/_react.default.createElement(_utils.ThemeContext.Provider, {
    value: {
      theme,
      colorScheme
    }
  }, /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    style: autoStyle ? style : undefined
  }, html), children));
};
exports.AutoThemeProvider = AutoThemeProvider;
//# sourceMappingURL=AutoThemeProvider.js.map