import axios from 'axios';

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10_000,
});

// Normalize every failure into an ApiError so callers handle one shape.
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(new ApiError(error.message, error.response?.status));
    }

    return Promise.reject(error);
  },
);
