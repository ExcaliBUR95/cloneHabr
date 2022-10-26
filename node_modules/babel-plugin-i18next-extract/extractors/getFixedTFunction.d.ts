import * as BabelCore from '@babel/core';
import * as BabelTypes from '@babel/types';
import { CommentHint } from '../comments';
import { Config } from '../config';
import { ExtractedKey } from '../keys';
/**
 * Parse `getFixedT()` getter to extract all its translation keys and
 * options (see https://www.i18next.com/overview/api#getfixedt)
 * @param path: useTranslation call node path.
 * @param config: plugin configuration
 * @param commentHints: parsed comment hints
 */
export default function extractGetFixedTFunction(path: BabelCore.NodePath<BabelTypes.CallExpression>, config: Config, commentHints?: CommentHint[]): ExtractedKey[];
