"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectInspectorItem = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _react = _interopRequireWildcard(require("react"));
var _tree = require("@devtools-ds/tree");
var _ObjectValue = _interopRequireDefault(require("./ObjectValue"));
var _ObjectLabel = _interopRequireDefault(require("./ObjectLabel"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** A simple component. */
const ObjectInspectorItem = props => {
  const {
    ast,
    expandLevel,
    depth
  } = props;
  const [resolved, setResolved] = (0, _react.useState)();
  const [open, setOpen] = (0, _react.useState)(Boolean(depth < expandLevel));

  /** Handle async children */
  (0, _react.useEffect)(() => {
    /** Async function to resolve children */
    const resolve = async () => {
      if (ast.type !== "value") {
        const promises = ast.children.map(f => f());
        const children = await Promise.all(promises);
        const r = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, ast), {}, {
          children
        });
        setResolved(r);
      }
    };
    resolve();
  }, [ast]);
  if (resolved) {
    return /*#__PURE__*/_react.default.createElement(_tree.Tree, {
      hover: false,
      open: open,
      label: /*#__PURE__*/_react.default.createElement(_ObjectLabel.default, {
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
      return /*#__PURE__*/_react.default.createElement(ObjectInspectorItem, {
        key: child.key,
        ast: child,
        depth: depth + 1,
        expandLevel: expandLevel,
        onSelect: props.onSelect
      });
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_tree.Tree, {
    hover: false,
    label: /*#__PURE__*/_react.default.createElement(_ObjectValue.default, {
      ast: ast
    }),
    onSelect: () => {
      var _props$onSelect2;
      (_props$onSelect2 = props.onSelect) === null || _props$onSelect2 === void 0 ? void 0 : _props$onSelect2.call(props, ast);
    }
  });
};
exports.ObjectInspectorItem = ObjectInspectorItem;
ObjectInspectorItem.defaultProps = {
  expandLevel: 0,
  depth: 0
};
var _default = ObjectInspectorItem;
exports.default = _default;
//# sourceMappingURL=ObjectInspectorItem.js.map