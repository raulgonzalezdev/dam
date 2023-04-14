export interface Pagination<T> {
    links: {
        next: string;
        previous: string;
    };
    meta: {
        pagination: {
            count: number;
            page: number;
            pages: number;
            per_page: number;
        }
    };
    results: T[];

}