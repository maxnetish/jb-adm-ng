import {PostStatus} from './post-status.enum';

export interface PostFindCriteria {
    from?: string;
    to?: string;
    q?: string;
    page: number;
    statuses?: Array<PostStatus>;
}
