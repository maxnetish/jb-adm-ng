import {PaginationRequest} from '../pagination-request';

export interface JbFileFindRequest extends PaginationRequest {
    context?: string;
    withoutPostId?: boolean;
    postId?: string;
    contentType?: string;
    dateTo?: string | Date;
    dateFrom?: string | Date;
}
