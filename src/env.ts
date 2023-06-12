/// <reference types="astro/client" />
import { parseEnv, z } from 'znv';

export const env = parseEnv(import.meta.env, {
  ABOSS_AGENCY_ID: z.number(),
  ABOSS_ARTIST_ID: z.number(),
  ABOSS_TOKEN: z.string(),
});
