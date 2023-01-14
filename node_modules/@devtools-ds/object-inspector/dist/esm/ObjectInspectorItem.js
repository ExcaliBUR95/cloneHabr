import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import React, { useEffect, useState } from "react";
import { Tree } from "@devtools-ds/tree";
import ObjectValue from "./ObjectValue";
import ObjectLabel from "./ObjectLabel";
/** A simple component. */
export const ObjectInspectorItem = props => {
  const {
    ast,
    expandLevel,
    depth
  } = props;
  const [resolved, setResolved] = useState();
  const [open, setOpen] = useState(Boolean(depth < expandLevel));

  /** Handle async children */
  useEffect(() => {
    /** Async function to resolve children */
    const resolve = async () => {
      if (ast.type !== "value") {
        const promises = ast.children.map(f => f());
        const children = await Promise.all(promises);
        const r = _objectSpread(_objectSpread({}, ast), {}, {
          children
        });
        setResolved(r);
      }
    };
    resolve();
  }, [ast]);
  if (resolved) {
    return /*#__PURE__*/React.createElement(Tree, {
      hover: false,
      open: open,
      label: /*#__PURE__*/React.createElement(ObjectLabel, {
        open: open,
        ast: resolved
      }),
      onSelect: () => {
        var _props$onSelect;
        (_props$onSelect = props.onSelect) === null || _props$onSelect === void 0 ? void 0 : _props$onSelect.call(props, ast);
      },
      onUpdate: value => {
        setOpen(value);
      }
    }, resolved.children.map(child => {
      return /*#__PURE__*/React.createElement(ObjectInspectorItem, {
        key: child.key,
        ast: child,
        depth: depth + 1,
        expandLevel: expandLevel,
        onSelect: props.onSelect
      });
    }));
  }
  return /*#__PURE__*/React.createElement(Tree, {
    hover: false,
    label: /*#__PURE__*/React.createElement(ObjectValue, {
      ast: ast
    }),
    onSelect: () => {
      var _props$onSelect2;
      (_props$onSelect2 = props.onSelect) === null || _props$onSelect2 === void 0 ? void 0 : _props$onSelect2.call(props, ast);
    }
  });
};
ObjectInspectorItem.defaultProps = {
  expandLevel: 0,
  depth: 0
};
export default ObjectInspectorItem;
//# sourceMappingURL=ObjectInspectorItem.js.map