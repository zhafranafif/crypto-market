export interface ApiResponse<T> {
    status?: string;
    message?: string;
    data: T;
    success?: boolean;
    status_code?: number;
}
