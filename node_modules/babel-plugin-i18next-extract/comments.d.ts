import * as BabelCore from '@babel/core';
import * as BabelTypes from '@babel/types';
declare type CommentHintType = 'DISABLE' | 'NAMESPACE' | 'CONTEXT' | 'PLURAL';
declare type CommentHintScope = 'LINE' | 'NEXT_LINE' | 'SECTION_START' | 'SECTION_STOP';
/**
 * Comment Hint without line location information.
 */
interface BaseCommentHint {
    type: CommentHintType;
    scope: CommentHintScope;
    value: string;
    comment: BabelTypes.Comment;
}
/**
 * Line intervals
 */
interface Interval {
    startLine: number;
    stopLine: number;
}
/**
 * Comment Hint with line intervals information.
 */
export interface CommentHint extends BaseCommentHint, Interval {
}
export declare const COMMENT_HINT_PREFIX = "i18next-extract-";
export declare const COMMENT_HINTS_KEYWORDS: {
    [k in CommentHintType]: {
        [s in CommentHintScope]: string;
    };
};
/**
 * Given Babel comments, extract the comment hints.
 * @param comments Babel comments (ordered by line)
 */
export declare function parseCommentHints(comments: BabelTypes.Comment[]): CommentHint[];
/**
 * Find comment hint of a given type that applies to a Babel node path.
 * @param path babel node path
 * @param commentHintType Type of comment hint to look for.
 * @param commentHints All the comment hints, as returned by parseCommentHints function.
 */
export declare function getCommentHintForPath(path: BabelCore.NodePath, commentHintType: BaseCommentHint['type'], commentHints: CommentHint[]): CommentHint | null;
export {};
