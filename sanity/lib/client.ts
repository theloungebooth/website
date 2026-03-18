import { createClient } from '@sanity/client'
import { sanityConfig } from '../config'

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})

// Read-only client for public data (no token)
export const publicSanityClient = createClient({
  ...sanityConfig,
  token: undefined,
})
