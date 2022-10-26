import * as BabelTypes from '@babel/types';
import { Config } from './config';
interface I18NextParsedOptions {
    contexts: string[] | boolean;
    hasCount: boolean;
    ns: string | null;
    defaultValue: string | null;
}
/**
 * Key as extracted by an extractor.
 */
export interface ExtractedKey {
    key: string;
    parsedOptions: I18NextParsedOptions;
    sourceNodes: BabelTypes.Node[];
    extractorName: string;
}
/**
 * Extracted key with enriched information.
 */
export interface TranslationKey extends ExtractedKey {
    cleanKey: string;
    keyPath: string[];
    ns: string;
    isDerivedKey: boolean;
}
/**
 * Compute all derived keys for a local from a key and parsed i18next options.
 *
 * e.g.
 *   ({'foo', {contexts: false, hasCount: true}}, 'en')
 *     => ['foo', 'foo_plural']
 *   ({'bar', {contexts: ['male', 'female'], hasCount: true}}, 'en')
 *     => ['foo_male', 'foo_male_plural', 'foo_female', 'foo_female_plural']
 *
 * @param extractedKey key that was extracted with an extractor.
 * @param locale locale code
 * @returns All derived keys that could be found from TranslationKey for
 *   locale.
 */
export declare function computeDerivedKeys(extractedKey: ExtractedKey, locale: string, config: Config): TranslationKey[];
export {};
