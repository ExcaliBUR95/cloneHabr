import { ExtractionError } from './commons';
import extractCustomTransComponent from './customTransComponent';
import extractCustomUseTranslationHook from './customUseTranslationHook';
import extractGetFixedTFunction from './getFixedTFunction';
import extractI18nextInstance from './i18nextInstance';
import extractTFunction from './tFunction';
import extractTransComponent from './transComponent';
import extractTranslationRenderProp from './translationRenderProp';
import extractUseTranslationHook from './useTranslationHook';
import extractWithTranslationHOC from './withTranslationHOC';
export { ExtractionError };
/**
 * All extractors sorted by priority.
 */
export declare const EXTRACTORS_PRIORITIES: string[];
declare const _default: {
    extractCustomTransComponent: typeof extractCustomTransComponent;
    extractTransComponent: typeof extractTransComponent;
    extractUseTranslationHook: typeof extractUseTranslationHook;
    extractCustomUseTranslationHook: typeof extractCustomUseTranslationHook;
    extractGetFixedTFunction: typeof extractGetFixedTFunction;
    extractTranslationRenderProp: typeof extractTranslationRenderProp;
    extractWithTranslationHOC: typeof extractWithTranslationHOC;
    extractI18nextInstance: typeof extractI18nextInstance;
    extractTFunction: typeof extractTFunction;
};
export default _default;
