export interface PaginationParam {
  limit?: number;
  page?: number;
}

export type PaginationResponse<T> = {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};
