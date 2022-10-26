import * as BabelCore from '@babel/core';
import * as BabelTypes from '@babel/types';
import { CommentHint } from '../comments';
import { Config } from '../config';
import { ExtractedKey } from '../keys';
/**
 * Parse `useTranslation()` hook to extract all its translation keys and
 * options.
 * @param path: useTranslation call node path.
 * @param config: plugin configuration
 * @param commentHints: parsed comment hints
 */
export default function extractUseTranslationHook(path: BabelCore.NodePath<BabelTypes.CallExpression>, config: Config, commentHints?: CommentHint[], skipCheck?: boolean): ExtractedKey[];
