import { Resend } from 'resend'
import { env } from './env'

// Lazy — only instantiated when sendContactEmail is called,
// so a missing RESEND_API_KEY doesn't crash the server at startup.
function getResend() {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set. Add it to your .env file.')
  }
  return new Resend(env.RESEND_API_KEY)
}

export interface ContactSubmission {
  fields: Record<string, string>
  replyTo?: string
}

/** Build a plain-text + HTML email body from arbitrary form fields. */
function buildEmail(fields: Record<string, string>): {
  subject: string
  html: string
  text: string
} {
  const rows = Object.entries(fields)
    .map(([key, value]) => `  <p><b>${key}:</b> <span>${value}</span></p>`)
    .join('\n')

  const text = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  const html = `<div>\n${rows}\n  <p>(Sent via <i>The Lounge Booth</i>)</p>\n</div>`

  return { subject: 'Form Submission \u2013 Contact', html, text }
}

export async function sendContactEmail(submission: ContactSubmission) {
  const { subject, html, text } = buildEmail(submission.fields)

  return getResend().emails.send({
    from: env.CONTACT_EMAIL_FROM ?? 'noreply@theloungebooth.com',
    to: env.CONTACT_EMAIL_TO!,
    replyTo: submission.replyTo,
    subject,
    html,
    text,
  })
}
