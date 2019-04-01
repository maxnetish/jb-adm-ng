/**
 * Data returns from file finding
 */
export interface JbFileInfo {
    _id?: string;
    id?: string;
    contentType: string;
    filename: string;
    length: number;
    metadata: {
        [prop: string]: string
    };
    uploadDate: Date;
    url: string;
}
