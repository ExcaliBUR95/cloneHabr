import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["children"];
import React from "react";
import makeClass from "clsx";
export const colorSchemes = ["light", "dark"];
export const themes = ["chrome", "firefox"];
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

export const ThemeContext = /*#__PURE__*/React.createContext({
  theme: "chrome",
  colorScheme: "light"
});

/**
 * Determine if the user has a "prefers-color-scheme" mode enabled in their browser.
 * This is helpful for detecting if a user prefers dark mode.
 */
export const useDarkMode = () => {
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

/** A React Context provider for devtools-ds themes */
export const ThemeProvider = _ref => {
  let {
      children
    } = _ref,
    value = _objectWithoutProperties(_ref, _excluded);
  const wrappedTheme = React.useContext(ThemeContext);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: _objectSpread(_objectSpread({}, wrappedTheme), value)
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
export const useTheme = (props, styles = {}) => {
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = props.theme || themeContext.theme || "chrome";
  const currentColorScheme = props.colorScheme || themeContext.colorScheme || "light";
  const themeClass = makeClass(styles[currentTheme], styles[currentColorScheme]);
  return {
    currentColorScheme,
    currentTheme,
    themeClass
  };
};
//# sourceMappingURL=utils.js.map