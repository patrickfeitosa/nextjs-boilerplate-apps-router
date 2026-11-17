import type { z } from 'zod';
import type { healthSchema } from './health.schema';

export type Health = z.infer<typeof healthSchema>;
