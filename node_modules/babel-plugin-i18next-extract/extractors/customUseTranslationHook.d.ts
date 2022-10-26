import * as BabelCore from '@babel/core';
import * as BabelTypes from '@babel/types';
import { CommentHint } from '../comments';
import { Config } from '../config';
import { ExtractedKey } from '../keys';
/**
 * Extract custom useTranslation hooks.
 *
 * @param path: node path of potential custom useTranslation hook calls.
 * @param config: plugin configuration
 * @param commentHints: parsed comment hints
 */
export default function extractCustomUseTranslationHook(path: BabelCore.NodePath<BabelTypes.CallExpression>, config: Config, commentHints?: CommentHint[]): ExtractedKey[];
