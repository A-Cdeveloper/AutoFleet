export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

export type ApiError = {
  message: string;
  status: number;
  code?: string;
};
