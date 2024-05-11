import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const ContactUsLink = ({
  children,
  subject,
  body,
}: {
  children: React.ReactNode
  subject?: string
  body?: string
}) => {
  const base = `mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`
  const subjectParam = subject ? `subject=${subject}` : ''
  const bodyParam = body ? `body=${body}` : ''
  const params = [subjectParam, bodyParam].filter(Boolean).join('&')
  return (
    <StyledLink
      href={base + (params ? `?${params}` : '')}
      style={{ textDecoration: 'underline' }}
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      {children}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: underline;
`
