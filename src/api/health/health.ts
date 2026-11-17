import { apiClient } from '@Api/client';
import { type Health, healthSchema } from '@Schemas/health';

export const getHealth = async (): Promise<Health> => {
  const { data } = await apiClient.get('/health');

  // Runtime-validate every API response.
  return healthSchema.parse(data);
};
