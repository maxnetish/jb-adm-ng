export interface PaginationResponse<T> {
    items: Array<T>;
    hasMore: boolean;
}
