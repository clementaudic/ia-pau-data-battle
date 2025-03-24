import { z } from 'zod';

const serverEnvSchema = z.object({
    API_URL: z.string().trim().url(),
});

const clientEnvSchema = z.object({
    API_EXTERNAL_URL: z.string().trim().url(),
});

export type ServerEnvironmentVariables = z.infer<typeof serverEnvSchema>;

export type ClientEnvironmentVariables = z.infer<typeof clientEnvSchema>;

const serverEnv: ServerEnvironmentVariables = serverEnvSchema.parse({
    API_URL: process.env.API_URL,
});

const clientEnv: ClientEnvironmentVariables = clientEnvSchema.parse({
    API_EXTERNAL_URL: process.env.NEXT_PUBLIC_API_EXTERNAL_URL,
});

export { serverEnv, clientEnv };
