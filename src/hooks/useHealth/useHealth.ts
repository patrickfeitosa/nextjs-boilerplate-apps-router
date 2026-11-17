import { useQuery } from '@tanstack/react-query';
import { getHealth } from '@Api/health';

export const healthQueryKey = ['health'] as const;

export const useHealth = () => useQuery({ queryFn: getHealth, queryKey: healthQueryKey });
