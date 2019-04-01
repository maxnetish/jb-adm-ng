import {JbUploadedFileInfo} from './jb-uploaded-file-info';

export interface JbFileUploadResponse {
    files?: {
        [contextName: string]: JbUploadedFileInfo[];
    };
}
