import {PostAllowRead} from './post-allow-read.enum';
import {PostContentType} from './post-content-type.enum';

export interface PostUpdate {
    _id?: string;
    allowRead: PostAllowRead;
    contentType: PostContentType;
    title: string;
    brief: string;
    content: string;
    tags: string[];
    titleImg: { id: string };
    attachments: Array<{ id: string }>;
    hru: string;
}
