"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.useDarkMode = exports.themes = exports.colorSchemes = exports.ThemeProvider = exports.ThemeContext = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
const _excluded = ["children"];
const colorSchemes = ["light", "dark"];
exports.colorSchemes = colorSchemes;
const themes = ["chrome", "firefox"];
exports.themes = themes;
const isWindowDefined = typeof window !== "undefined";

/**
 * Get all of the props for an HTML element + add the theme props.
 * Used to easily type the rest props of a component and add theming.
 *
 * @example
 * export interface ButtonProps extends ThemeableElement<'button'> {
 *   size?: Sizes;
 * }
 */

const ThemeContext = /*#__PURE__*/_react.default.createContext({
  theme: "chrome",
  colorScheme: "light"
});

/**
 * Determine if the user has a "prefers-color-scheme" mode enabled in their browser.
 * This is helpful for detecting if a user prefers dark mode.
 */
exports.ThemeContext = ThemeContext;
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

/** A React Context provider for devtools-ds themes */
exports.useDarkMode = useDarkMode;
const ThemeProvider = _ref => {
  let {
      children
    } = _ref,
    value = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  const wrappedTheme = _react.default.useContext(ThemeContext);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, wrappedTheme), value)
  }, children);
};

/**
 * A hook to use the closest theme context.
 *
 * @param props - Current component props
 * @param styles - The css modules for the component
 *
 * @example
 * const { themeClass } = useTheme({ colorScheme, theme }, styles);
 */
exports.ThemeProvider = ThemeProvider;
const useTheme = (props, styles = {}) => {
  const themeContext = _react.default.useContext(ThemeContext);
  const currentTheme = props.theme || themeContext.theme || "chrome";
  const currentColorScheme = props.colorScheme || themeContext.colorScheme || "light";
  const themeClass = (0, _clsx.default)(styles[currentTheme], styles[currentColorScheme]);
  return {
    currentColorScheme,
    currentTheme,
    themeClass
  };
};
exports.useTheme = useTheme;
//# sourceMappingURL=utils.js.map