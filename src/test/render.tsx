import type { ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import { createQueryClient } from '@Libs/query-client';

export const renderWithProviders = (ui: ReactElement, options?: RenderOptions) => {
  const queryClient = createQueryClient();
  queryClient.setDefaultOptions({ queries: { gcTime: Number.POSITIVE_INFINITY, retry: false } });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
};
