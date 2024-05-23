import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const ContactUsLink = ({
  children,
  subject,
  body,
  underline,
}: {
  children: React.ReactNode
  subject?: string
  body?: string
  underline?: boolean
}) => {
  const base = `mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`
  const subjectParam = subject ? `subject=${encodeURIComponent(subject)}` : ''
  const bodyParam = body ? `body=${encodeURIComponent(body)}` : ''
  const params = [subjectParam, bodyParam].filter(Boolean).join('&')
  return (
    <Link
      href={base + (params ? `?${params}` : '')}
      style={{ textDecoration: underline ? 'underline' : 'none' }}
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      {children}
    </Link>
  )
}
