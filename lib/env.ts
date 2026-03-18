import { z } from 'zod'

// Coerce empty strings to undefined so optional fields don't fail URL/email validation
const emptyToUndefined = z.preprocess((v) => (v === '' ? undefined : v), z.string().optional())

const envSchema = z.object({
  // Sanity
  VITE_SANITY_PROJECT_ID: z.string().min(1, 'VITE_SANITY_PROJECT_ID is required'),
  VITE_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().optional(),

  // Resend (email) — optional until the contact form is configured
  RESEND_API_KEY: emptyToUndefined,
  CONTACT_EMAIL_TO: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.email().optional(),
  ),
  CONTACT_EMAIL_FROM: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.email().optional(),
  ),

  // App
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

export const env = envSchema.parse(process.env)
