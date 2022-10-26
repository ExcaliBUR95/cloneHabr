import { Config } from '../config';
import { TranslationKey } from '../keys';
import { ConflictError, ExportError } from './commons';
export { ConflictError, ExportError };
/**
 * An instance of exporter cache.
 *
 * See createExporterCache for details.
 */
export interface ExporterCache {
    originalTranslationFiles: {
        [path: string]: any;
    };
    currentTranslationFiles: {
        [path: string]: any;
    };
}
/**
 * This creates a new empty cache for the exporter.
 *
 * The cache is required by the exporter and is used to merge the translations
 * from the original translation file. It will be  mutated by the exporter
 * and the same instance must be given untouched across export calls.
 */
export declare function createExporterCache(): ExporterCache;
/**
 * Exports all given translation keys as JSON.
 *
 * @param keys: translation keys to export
 * @param locale: the locale to export
 * @param config: plugin configuration
 * @param cache: cache instance to use (see createExporterCache)
 */
export default function exportTranslationKeys(keys: TranslationKey[], locale: string, config: Config, cache: ExporterCache): void;
