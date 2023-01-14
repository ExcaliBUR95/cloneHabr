import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["theme", "hover", "colorScheme", "children", "label", "className", "onUpdate", "onSelect", "open"];
import React, { useState, useEffect } from "react";
import { useTheme } from "@devtools-ds/themes";
import makeClass from "clsx";
import TreeContext from "./TreeContext";
import styles from "./Tree.css";
/** A keyboard accessible expanding tree view. */
export const Tree = props => {
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
    html = _objectWithoutProperties(props, _excluded);
  const {
    themeClass,
    currentTheme
  } = useTheme({
    theme,
    colorScheme
  }, styles);
  const [isOpen, setOpen] = useState(open);
  // For some reason the useState above default doesn't work, so useEffect is needed
  useEffect(() => {
    setOpen(open);
  }, [open]);

  /** Update state and call callback */
  const updateState = value => {
    setOpen(value);
    if (onUpdate) onUpdate(value);
  };
  const hasChildren = React.Children.count(children) > 0;

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
  } = React.useContext(TreeContext);
  const showHover = hasHover ? hover : false;

  // Tree root node
  // Needs to have role tree and one top level UL
  // https://dequeuniversity.com/library/aria/tabpanels-accordions/sf-tree-view
  if (!isChild) {
    return /*#__PURE__*/React.createElement("ul", _extends({
      role: "tree",
      tabIndex: 0,
      className: makeClass(styles.tree, styles.group, themeClass, className),
      onFocus: handleFocus,
      onBlur: handleBlur
    }, html), /*#__PURE__*/React.createElement(TreeContext.Provider, {
      value: {
        isChild: true,
        depth: 0,
        hasHover: showHover
      }
    }, /*#__PURE__*/React.createElement(Tree, props)));
  }

  // Leaf nodes that don't expand, but still highlight and focus.
  if (!hasChildren) {
    return /*#__PURE__*/React.createElement("li", _extends({
      role: "treeitem",
      className: styles.item
    }, html), /*#__PURE__*/React.createElement("div", {
      role: "button",
      className: makeClass(styles.label, {
        [styles.hover]: showHover,
        [styles.focusWhite]: currentTheme === "firefox"
      }),
      tabIndex: -1,
      style: getPaddingStyles(depth),
      onKeyDown: e => {
        handleKeypress(e, isChild);
      },
      onClick: e => handleClick(e, true),
      onFocus: handleButtonFocus
    }, /*#__PURE__*/React.createElement("span", null, label)));
  }

  // Child tree node with children
  const arrowClass = makeClass(styles.arrow, {
    [styles.open]: isOpen
  });
  return /*#__PURE__*/React.createElement("li", {
    role: "treeitem",
    "aria-expanded": isOpen,
    className: styles.item
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: -1,
    className: makeClass(styles.label, {
      [styles.hover]: showHover,
      [styles.focusWhite]: currentTheme === "firefox"
    }),
    style: getPaddingStyles(depth),
    onClick: e => handleClick(e),
    onKeyDown: e => handleKeypress(e),
    onFocus: handleButtonFocus
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: arrowClass
  }), /*#__PURE__*/React.createElement("span", null, label))), /*#__PURE__*/React.createElement("ul", _extends({
    role: "group",
    className: makeClass(className, styles.group)
  }, html), isOpen && React.Children.map(children, child => {
    return /*#__PURE__*/React.createElement(TreeContext.Provider, {
      value: {
        isChild: true,
        depth: depth + 1,
        hasHover: showHover
      }
    }, child);
  })));
};
Tree.defaultProps = {
  open: false,
  hover: true
};
//# sourceMappingURL=index.js.map
import "../main.css";