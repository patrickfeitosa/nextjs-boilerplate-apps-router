'use client';

import { type PropsWithChildren, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@Libs/query-client';

import '@I18n';

const Providers = (props: PropsWithChildren) => {
  const { children } = props;
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
