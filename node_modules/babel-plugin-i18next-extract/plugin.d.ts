import * as BabelCore from '@babel/core';
import { CommentHint } from './comments';
import { Config } from './config';
import { ExporterCache } from './exporters';
import { ExtractedKey } from './keys';
export interface VisitorState {
    file: any;
    opts: Partial<Config>;
    I18NextExtract: I18NextExtractState;
}
interface I18NextExtractState {
    extractedKeys: ExtractedKey[];
    commentHints: CommentHint[];
    config: Config;
    exporterCache: ExporterCache;
}
export default function (api: BabelCore.ConfigAPI): BabelCore.PluginObj<VisitorState>;
export {};
