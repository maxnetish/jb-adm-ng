import {JbFileInfo} from './jb-file-info';

export interface JbFileUploadResponse {
    files?: {
        [contextName: string]: JbFileInfo[];
    };
}
