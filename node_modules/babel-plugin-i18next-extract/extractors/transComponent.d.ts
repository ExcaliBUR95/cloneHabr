import * as BabelCore from '@babel/core';
import * as BabelTypes from '@babel/types';
import { CommentHint } from '../comments';
import { Config } from '../config';
import { ExtractedKey } from '../keys';
/**
 * Parse `Trans` component to extract all its translation keys and i18next
 * options.
 *
 * @param path: node path of Trans JSX element.
 * @param config: plugin configuration
 * @param commentHints: parsed comment hints
 * @param skipCheck: set to true if you know that the JSXElement
 *   already is a Trans component.
 */
export default function extractTransComponent(path: BabelCore.NodePath<BabelTypes.JSXElement>, config: Config, commentHints?: CommentHint[], skipCheck?: boolean): ExtractedKey[];
