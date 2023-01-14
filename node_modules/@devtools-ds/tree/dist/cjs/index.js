"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _themes = require("@devtools-ds/themes");
var _clsx = _interopRequireDefault(require("clsx"));
var _TreeContext = _interopRequireDefault(require("./TreeContext"));
var _Tree = _interopRequireDefault(require("./Tree.css"));
const _excluded = ["theme", "hover", "colorScheme", "children", "label", "className", "onUpdate", "onSelect", "open"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** A keyboard accessible expanding tree view. */
const Tree = props => {
  const {
      theme,
      hover,
      colorScheme,
      children,
      label,
      className,
      onUpdate,
      onSelect,
      open
    } = props,
    html = (0, _objectWithoutProperties2.default)(props, _excluded);
  const {
    themeClass,
    currentTheme
  } = (0, _themes.useTheme)({
    theme,
    colorScheme
  }, _Tree.default);
  const [isOpen, setOpen] = (0, _react.useState)(open);
  // For some reason the useState above default doesn't work, so useEffect is needed
  (0, _react.useEffect)(() => {
    setOpen(open);
  }, [open]);

  /** Update state and call callback */
  const updateState = value => {
    setOpen(value);
    if (onUpdate) onUpdate(value);
  };
  const hasChildren = _react.default.Children.count(children) > 0;

  /** Set focus and aria-selected onto a new <li>, unselect old if provided */
  const updateFocus = (newNode, previousNode) => {
    if (newNode.isSameNode(previousNode || null)) return;
    const focusableNode = newNode.querySelector('[tabindex="-1"]');
    focusableNode === null || focusableNode === void 0 ? void 0 : focusableNode.focus();
    newNode.setAttribute("aria-selected", "true");
    previousNode === null || previousNode === void 0 ? void 0 : previousNode.removeAttribute("aria-selected");
  };

  /**
   * Find a parent DOM node with a given role.
   *
   * @param node - Current HTMLElement
   */
  const getParent = (node, role) => {
    let parent = node;
    while (parent && parent.parentElement) {
      // Find the top of the tree
      if (parent.getAttribute("role") === role) {
        return parent;
      }

      // Move up the tree after, in case the node provided is the tree
      parent = parent.parentElement;
    }
    return null;
  };

  /** Get all list elements for the current tree. */
  const getListElements = node => {
    const tree = getParent(node, "tree");
    if (!tree) return [];
    return Array.from(tree.querySelectorAll("li"));
  };

  /** Move focus up to the tree node above */
  const moveBack = node => {
    const group = getParent(node, "group");
    const toggle = group === null || group === void 0 ? void 0 : group.previousElementSibling;
    if (toggle && toggle.getAttribute("tabindex") === "-1") {
      const toggleParent = toggle.parentElement;
      const nodeParent = node.parentElement;
      updateFocus(toggleParent, nodeParent);
    }
  };

  /** Move the focus to the start or end of the tree */
  const moveHome = (node, direction) => {
    const elements = getListElements(node);
    elements.forEach(element => {
      element.removeAttribute("aria-selected");
    });
    if (direction === "start" && elements[0]) {
      updateFocus(elements[0]);
    }
    if (direction === "end" && elements[elements.length - 1]) {
      updateFocus(elements[elements.length - 1]);
    }
  };

  /** Move focus up or down a level from the provided Element */
  const moveFocusAdjacent = (node, direction) => {
    const elements = getListElements(node) || [];
    for (let i = 0; i < elements.length; i++) {
      // Go through each <li> and look for the currently selected node
      const currentNode = elements[i];
      if (currentNode.getAttribute("aria-selected") === "true") {
        if (direction === "up" && elements[i - 1]) {
          // Move focus to the <li> above
          updateFocus(elements[i - 1], currentNode);
        } else if (direction === "down" && elements[i + 1]) {
          // Move focus to the <li> below
          updateFocus(elements[i + 1], currentNode);
        }
        return;
      }
    }

    // Select first node if one isn't currently selected
    updateFocus(elements[0]);
  };

  /** Handle all keyboard events from tree nodes */
  const handleKeypress = (event, isChild) => {
    const node = event.target;
    // Handle open/close toggle
    if (event.key === "Enter" || event.key === " ") {
      updateState(!isOpen);
    }
    if (event.key === "ArrowRight" && isOpen && !isChild) {
      moveFocusAdjacent(node, "down");
    } else if (event.key === "ArrowRight") {
      updateState(true);
    }
    if (event.key === "ArrowLeft" && (!isOpen || isChild)) {
      moveBack(node);
    } else if (event.key === "ArrowLeft") {
      updateState(false);
    }
    if (event.key === "ArrowDown") {
      moveFocusAdjacent(node, "down");
    }
    if (event.key === "ArrowUp") {
      moveFocusAdjacent(node, "up");
    }
    if (event.key === "Home") {
      moveHome(node, "start");
    }
    if (event.key === "End") {
      moveHome(node, "end");
    }
  };

  /** Set selected and focus states on click events */
  const handleClick = (event, isChild) => {
    const node = event.target;
    const parent = getParent(node, "treeitem");

    // We need to check if another node was selected and move it
    const elements = getListElements(node) || [];
    let found = false;
    for (let i = 0; i < elements.length; i++) {
      // Go through each <li> and look for the currently selected node
      const currentNode = elements[i];
      if (currentNode.getAttribute("aria-selected") === "true") {
        // Move selected to clicked LI
        if (parent) {
          found = true;
          updateFocus(parent, currentNode);
        }
        break;
      }
    }

    // If we didn't find an existing one select the new one
    if (!found && parent) {
      updateFocus(parent);
    }

    // Toggle open state if needed
    if (!isChild) {
      updateState(!isOpen);
    }
  };

  /** When the tree is blurred make it focusable again */
  const handleBlur = event => {
    const node = event.currentTarget;
    if (!node.contains(document.activeElement) && node.getAttribute("role") === "tree") {
      node.setAttribute("tabindex", "0");
    }
  };

  /** Move focus back to the selected tree node, or focus the first one */
  const handleFocus = event => {
    const node = event.target;
    if (node.getAttribute("role") === "tree") {
      const selected = node.querySelector('[aria-selected="true"]');
      if (selected) {
        // Move to previously selected node
        updateFocus(selected);
      } else {
        // Focus the first node
        moveFocusAdjacent(node, "down");
      }

      //
      node.setAttribute("tabindex", "-1");
    }
  };

  /** Detect when a button has been focused */
  const handleButtonFocus = () => {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect();
  };

  /** Get the styles for padding based on depth */
  const getPaddingStyles = depth => {
    const space = depth * 0.9 + 0.3;
    return {
      paddingLeft: `${space}em`,
      width: `calc(100% - ${space}em)`
    };
  };

  // The first node needs role "tree", while sub-trees need role "group"
  // This is tracked through context to be flexible to elements in the subtree.
  const {
    isChild,
    depth,
    hasHover
  } = _react.default.useContext(_TreeContext.default);
  const showHover = hasHover ? hover : false;

  // Tree root node
  // Needs to have role tree and one top level UL
  // https://dequeuniversity.com/library/aria/tabpanels-accordions/sf-tree-view
  if (!isChild) {
    return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
      role: "tree",
      tabIndex: 0,
      className: (0, _clsx.default)(_Tree.default.tree, _Tree.default.group, themeClass, className),
      onFocus: handleFocus,
      onBlur: handleBlur
    }, html), /*#__PURE__*/_react.default.createElement(_TreeContext.default.Provider, {
      value: {
        isChild: true,
        depth: 0,
        hasHover: showHover
      }
    }, /*#__PURE__*/_react.default.createElement(Tree, props)));
  }

  // Leaf nodes that don't expand, but still highlight and focus.
  if (!hasChildren) {
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      role: "treeitem",
      className: _Tree.default.item
    }, html), /*#__PURE__*/_react.default.createElement("div", {
      role: "button",
      className: (0, _clsx.default)(_Tree.default.label, {
        [_Tree.default.hover]: showHover,
        [_Tree.default.focusWhite]: currentTheme === "firefox"
      }),
      tabIndex: -1,
      style: getPaddingStyles(depth),
      onKeyDown: e => {
        handleKeypress(e, isChild);
      },
      onClick: e => handleClick(e, true),
      onFocus: handleButtonFocus
    }, /*#__PURE__*/_react.default.createElement("span", null, label)));
  }

  // Child tree node with children
  const arrowClass = (0, _clsx.default)(_Tree.default.arrow, {
    [_Tree.default.open]: isOpen
  });
  return /*#__PURE__*/_react.default.createElement("li", {
    role: "treeitem",
    "aria-expanded": isOpen,
    className: _Tree.default.item
  }, /*#__PURE__*/_react.default.createElement("div", {
    role: "button",
    tabIndex: -1,
    className: (0, _clsx.default)(_Tree.default.label, {
      [_Tree.default.hover]: showHover,
      [_Tree.default.focusWhite]: currentTheme === "firefox"
    }),
    style: getPaddingStyles(depth),
    onClick: e => handleClick(e),
    onKeyDown: e => handleKeypress(e),
    onFocus: handleButtonFocus
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": true,
    className: arrowClass
  }), /*#__PURE__*/_react.default.createElement("span", null, label))), /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
    role: "group",
    className: (0, _clsx.default)(className, _Tree.default.group)
  }, html), isOpen && _react.default.Children.map(children, child => {
    return /*#__PURE__*/_react.default.createElement(_TreeContext.default.Provider, {
      value: {
        isChild: true,
        depth: depth + 1,
        hasHover: showHover
      }
    }, child);
  })));
};
exports.Tree = Tree;
Tree.defaultProps = {
  open: false,
  hover: true
};
//# sourceMappingURL=index.js.map