import {PostStatus} from './post-status.enum';

export class PostBrief {
    _id?: string;
    status: PostStatus;
    createDate: Date;
    updateDate?: Date;
    pubDate?: Date;
    titleImg?: string;
    title: string;
    brief: string;
}
