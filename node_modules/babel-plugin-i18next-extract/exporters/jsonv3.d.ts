import { Exporter } from './commons';
/**
 * JSONv3 values can be any valid value for JSON file.
 *
 * See i18next's "returnObjects" option.
 */
declare type JsonV3Value = string | number | null | JsonV3Value[] | {
    [k: string]: JsonV3Value;
};
/**
 * Content of a JSON v3 file.
 */
interface JsonV3File {
    whitespacesBefore: string;
    whitespacesAfter: string;
    content: {
        [k: string]: JsonV3Value;
    };
}
declare const jsonv3Exporter: Exporter<JsonV3File, JsonV3Value>;
export default jsonv3Exporter;
