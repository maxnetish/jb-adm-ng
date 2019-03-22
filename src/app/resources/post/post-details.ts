import {PostStatus} from './post-status.enum';
import {PostAllowRead} from './post-allow-read.enum';
import {PostContentType} from './post-content-type.enum';

export interface PostDetails {
    _id?: string;
    status: PostStatus;
    allowRead: PostAllowRead;
    createDate: Date;
    pubDate: Date;
    updateDate: Date;
    author?: string;
    contentType: PostContentType;
    title: string;
    brief: string;
    content: string;
    tags: [string];
    titleImg: object;
    attachments: [object];
    hru: string;
}
