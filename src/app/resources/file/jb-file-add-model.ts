export interface JbFileAddModel {
    context: string;
    originalFilename: string;
    blob: Blob;
    metadata?: {
        [prop: string]: string | number
    };
}
