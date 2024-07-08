import { z } from 'zod';

export const CredentialsAuthSchema = z.object({
  email: z.string().min(6).email(),
  password: z.string().min(6),
});

