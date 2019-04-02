import { PostStatus } from '../post/post-status.enum';

export interface JbTagSearchCriteria {
    statuses: PostStatus[];
}
