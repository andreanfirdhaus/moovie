export interface Genres {
    id: number;
    name: string;
}

export interface PaginatedResponse<T = unknown> {
    results: T[];
    total_pages: number;
    total_results: number;
    page: number;
}
