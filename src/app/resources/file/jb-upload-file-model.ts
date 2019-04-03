export interface JbUploadFileModel {
    context: string;
    file: File;
    metadata?: {
        [prop: string]: string | number
    };
}
