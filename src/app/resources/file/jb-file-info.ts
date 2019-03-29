export interface JbFileInfo {
    bucketName?: string;
    chunkSize?: number;
    contentType?: string;
    encoding?: string;
    fieldname?: string;
    filename?: string;
    id?: string;
    md5?: string;
    metadata?: {
        [key: string]: string
    };
    mimetype?: string;
    originalname?: string;
    size?: number;
    uploadDate?: Date;
    url?: string;
}
